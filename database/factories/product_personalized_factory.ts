import factory from '@adonisjs/lucid/factories'
import ProductPersonalized from '#models/product_personalized'

export const ProductPersonalizedFactory = factory
  .define(ProductPersonalized, async ({ faker }) => {
    return {
      productBaseId: faker.helpers.rangeToNumber({ min: 1, max: 2 }),
      price: 20,
    }
  })
  .build()
