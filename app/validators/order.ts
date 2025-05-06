import vine from '@vinejs/vine'
import PaymentMethod from '../enums/payment_method.js'
import Toppings from '../enums/toppings.js'

export const orderValidator = vine.object({
  userId: vine.number(),
  customerName: vine.string(),
  paymentMethod: vine.enum([PaymentMethod.CARD, PaymentMethod.CASH]),
  total: vine.number(),
})

export const productsPersonalizedValidator = vine.object({
  name: vine.array(vine.string()),
  quantity: vine.array(vine.number()),
  price: vine.array(vine.number()),
  toppings: vine.array(vine.string()).optional(),
})
