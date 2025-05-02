import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import { orderValidator, productsPersonalizedValidator } from '#validators/order'

export default class OrdersController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    return view.render('pages/orders/index')
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('pages/orders/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, view }: HttpContext) {
    try {
      const order = request.only(['userId', 'customer', 'paymentMethod'])
      const orderCompiledValidator = vine.compile(orderValidator)
      const validatedOrder = await orderCompiledValidator.validate(order)
      const products = request.only(['name', 'quantity', 'price'])
      const productsCompiledValidator = vine.compile(productsPersonalizedValidator)
      const validatedProducts = await productsCompiledValidator.validate(products)
      console.log([validatedOrder, validatedProducts])
    } catch (error) {
      console.log(error)
    }
    return view.render('pages/dashboard')
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
