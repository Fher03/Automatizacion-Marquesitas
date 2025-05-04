import ProductPersonalized from '#models/product_personalized'
import { productsPersonalizedValidator } from '#validators/order'
import vine from '@vinejs/vine'

interface Product {
  name: string[]
  quantity: number[]
  price: number[]
  toppings: string[]
}

export class ProductsPersonalizedService {
  public static async validateProduct(productsArray: Array<string>, request: any) {
    const products = request.only(productsArray)
    const productsCompiledValidator = vine.compile(productsPersonalizedValidator)
    const validatedProducts: Product = await productsCompiledValidator.validate(products)
    return validatedProducts
  }

  public static manageProducts(products: Product) {
    const { name, price, quantity, toppings } = products
    let productsArray = []
    for (const [i, element] of name.entries()) {
      productsArray.push({
        name: element,
        price: price[i],
        quantity: quantity[i],
        toppings: toppings[i],
      })
    }
    return productsArray
  }

  public static async store(request: any) {
    const validatedProducts = await this.validateProduct(
      ['name', 'quantity', 'price', 'toppings'],
      request
    )
    const products = this.manageProducts(validatedProducts)
    console.log(products)
    // ProductPersonalized.create({})
  }
}
