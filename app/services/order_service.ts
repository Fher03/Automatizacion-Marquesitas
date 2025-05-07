import Order from '#models/order'
import { orderValidator } from '#validators/order'
import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export class OrderService {
  public static async validateOrder(orderArray: Array<string>, request: any) {
    const order = request.only(orderArray)
    const orderCompiledValidator = vine.compile(orderValidator)
    const validatedOrder = await orderCompiledValidator.validate(order)
    return validatedOrder
  }
  public static serializeOrder(orderArray: Array<Order>) {
    const orders = orderArray.map((order) => {
      return {
        ...order.serialize(),
        createdAt: order.createdAt.setLocale('es').toLocaleString(DateTime.DATE_FULL),
      }
    })
    return orders
  }
}
