import factory from '@adonisjs/lucid/factories'
import Order from '#models/order'
import PaymentMethod from '../../app/enums/payment_method.js'
import States from '../../app/enums/states.js'

export const OrderFactory = factory
  .define(Order, async ({ faker }) => {
    return {
      userId: 1,
      total: 90,
      paymentMethod: faker.helpers.arrayElement([PaymentMethod.CARD, PaymentMethod.CASH]),
      customerName: faker.person.firstName(),
      state: faker.helpers.arrayElement([States.FINISHED, States.PENDING, States.PROGRESS]),
    }
  })
  .build()
