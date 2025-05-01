import { OrderFactory } from '#database/factories/order_factory'
import { ProductPersonalizedFactory } from '#database/factories/product_personalized_factory'
import { ProductsOrderFactory } from '#database/factories/products_order_factory'
import { UserFactory } from '#database/factories/user_factory'
import ProductTopping from '#models/product_topping'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await UserFactory.createMany(3)
    await OrderFactory.createMany(10)
    await ProductPersonalizedFactory.createMany(5)
    await ProductsOrderFactory.createMany(4)
    await ProductTopping.createMany([
      {
        productPersonalizedId: 1,
        toppingId: 2,
      },
      {
        productPersonalizedId: 2,
        toppingId: 1,
      },
      {
        productPersonalizedId: 3,
        toppingId: 4,
      },
      {
        productPersonalizedId: 5,
        toppingId: 3,
      },
      {
        productPersonalizedId: 1,
        toppingId: 4,
      },
      {
        productPersonalizedId: 1,
        toppingId: 3,
      },
      {
        productPersonalizedId: 2,
        toppingId: 2,
      },
    ])
  }
}
