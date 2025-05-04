import type { HttpContext } from '@adonisjs/core/http'
import { OrderService } from '#services/order_service'
import Order from '#models/order'
import States from '../enums/states.js'
import ProductsPersonalizedController from './products_base_controller.js'
import { ProductsPersonalizedService } from '#services/products_personalized_service'

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
  async store({ request, response, view, session }: HttpContext) {
    try {
      // const validatedOrder = await OrderService.validateOrder(
      //   ['userId', 'customerName', 'paymentMethod', 'total'],
      //   request
      // )
      // await Order.create({ ...validatedOrder, state: States.PENDING })
      ProductsPersonalizedService.store(request)
      session.flash('success', 'La orden se ha generado exitosamente')
      return response.redirect().toRoute('dashboard')
    } catch (error) {
      session.flash('error', error.message)
      console.log(error)
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
