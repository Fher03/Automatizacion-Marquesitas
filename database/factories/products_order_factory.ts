import factory from '@adonisjs/lucid/factories'
import ProductOrder from '#models/product_order'

export const ProductsOrderFactory = factory
  .define(ProductOrder, async ({ faker }) => {
    return {
      orderId: faker.helpers.rangeToNumber({ min: 1, max: 10 }),
      productPersonalizedId: faker.helpers.rangeToNumber({ min: 1, max: 2 }),
      quantity: faker.helpers.rangeToNumber({ min: 1, max: 3 }),
    }
  })
  .build()
