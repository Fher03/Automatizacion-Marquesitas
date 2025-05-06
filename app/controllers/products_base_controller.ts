import ProductBase from '#models/product_base'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsBaseController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const productsBase = await ProductBase.all()
    const products = productsBase.map((product) => product.serialize())
    console.log(products)
    return view.render('pages/products/index', { products })
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
