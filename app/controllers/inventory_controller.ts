import type { HttpContext } from '@adonisjs/core/http'

export default class InventoryController {
  async index({ view }: HttpContext) {
    return view.render('pages/inventory/index')
  }
}
