import type { HttpContext } from '@adonisjs/core/http'
import { OrderService } from '#services/order_service'
import Order from '#models/order'
import States from '../enums/states.js'
import { ProductsPersonalizedService } from '#services/products_personalized_service'
import { ToppingService } from '#services/topping_service'
import { ProductsBaseService } from '#services/products_base_service'
import db from '@adonisjs/lucid/services/db'
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
    const toppingsList = await ToppingService.getAllString()
    const productsList = await ProductsBaseService.getAll()
    return view.render('pages/orders/create', { toppingsList, productsList })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, view, session }: HttpContext) {
    const trx = await db.transaction()
    try {
      const validatedOrder = await OrderService.validateOrder(
        ['userId', 'customerName', 'paymentMethod', 'total'],
        request
      )
      const order = await Order.create({ ...validatedOrder, state: States.PENDING })
      await ProductsPersonalizedService.store(request, order.serialize())
      trx.commit()
      session.flash('success', 'La orden se ha generado exitosamente')
      return response.redirect().toRoute('dashboard')
    } catch (error) {
      trx.rollback()
      session.flash('error', error.message)
      return view.render('pages/orders/create')
    }
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
