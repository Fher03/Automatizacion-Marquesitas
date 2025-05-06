import { orderValidator } from '#validators/order'
import vine from '@vinejs/vine'

export class OrderService {
  public static async validateOrder(orderArray: Array<string>, request: any) {
    const order = request.only(orderArray)
    const orderCompiledValidator = vine.compile(orderValidator)
    const validatedOrder = await orderCompiledValidator.validate(order)
    return validatedOrder
  }
}
