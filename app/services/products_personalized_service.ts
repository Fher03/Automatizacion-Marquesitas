import ProductBase from '#models/product_base'
import ProductOrder from '#models/product_order'
import ProductPersonalized from '#models/product_personalized'
import ProductTopping from '#models/product_topping'
import Topping from '#models/topping'
import { productsPersonalizedValidator } from '#validators/order'
import vine from '@vinejs/vine'
import { ProductsBaseService } from './products_base_service.js'

interface Product {
  name: string[]
  quantity: string[]
  price: string[]
  toppings: string[] | null
}
export class ProductsPersonalizedService {
  public static async validateProduct(productsArray: Array<string>, request: any) {
    const products = request.only(productsArray)
    const productsCompiledValidator = vine.compile(productsPersonalizedValidator)
    const validatedProducts: Product = await productsCompiledValidator.validate(products)
    return validatedProducts
  }

  public static manageProducts(products: Product) {
    const names = Array.isArray(products.name) ? products.name : [products.name]
    const quantities = Array.isArray(products.quantity) ? products.quantity : [products.quantity]
    const prices = Array.isArray(products.price) ? products.price : [products.price]
    const toppings = Array.isArray(products.toppings) ? products.toppings : []

    let toppingIndex = 0

    const items = names.map((name: any, index: any) => {
      const item: any = {
        name,
        quantity: Number.parseInt(quantities[index]),
        price: Number.parseFloat(prices[index]),
      }

      if (name.toLowerCase() === 'marquesita') {
        const toppingString = toppings[toppingIndex] || ''
        item.toppings = toppingString
          .split(',')
          .map((t: any) => t.trim())
          .filter((t: any) => t.length > 0)
        toppingIndex++
      }

      return item
    })

    return items
  }

  public static async store(request: any, order: any) {
    const validatedProducts = await this.validateProduct(
      ['name', 'quantity', 'price', 'toppings'],
      request
    )
    const products = this.manageProducts(validatedProducts)

    try {
      for (const product of products) {
        const productBase = await ProductBase.findBy('name', product.name)

        if (productBase) {
          await ProductsBaseService.substractStock(productBase, product.quantity)
        }

        const personalized = await ProductPersonalized.create({
          productBaseId: productBase?.id,
          price: product.price,
        })

        if (product.toppings) {
          for (const topping of product.toppings) {
            const instanceTopping = await Topping.findBy('name', topping)
            await ProductTopping.create({
              productPersonalizedId: personalized.id,
              toppingId: instanceTopping?.id,
            })
          }
        }

        await ProductOrder.create({
          orderId: order.id,
          productPersonalizedId: personalized.id,
          quantity: product.quantity,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}
