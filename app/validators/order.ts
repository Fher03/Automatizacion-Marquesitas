import vine from '@vinejs/vine'
import PaymentMethod from '../enums/payment_method.js'

export const orderValidator = vine.object({
  userId: vine.string().optional(),
  customer: vine.string(),
  paymentMethod: vine.enum([PaymentMethod.CARD, PaymentMethod.CASH]).optional(),
})

export const productsPersonalizedValidator = vine.object({
  name: vine.array(vine.string()),
  quantity: vine.array(vine.number()),
  price: vine.array(vine.number()),
})
