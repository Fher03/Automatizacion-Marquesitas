import ProductBase from '#models/product_base'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsBaseController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const productsBase = await ProductBase.all()
    const products = productsBase.map((product) => product.serialize())
    return view.render('pages/inventory/index', { products })
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params, response, request }: HttpContext) {
    try {
      const data = request.only(['stock'])
      const product = await ProductBase.findOrFail(params.id)
      product.merge({ stock: data.stock }).save()
    } catch (error) {
      console.log(error)
    }
    return response.redirect().back()
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
