import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Order from './order.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import ProductPersonalized from './product_personalized.js'

export default class ProductOrder extends BaseModel {
  public static table = 'products_orders'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare productPersonalizedId: number

  @column()
  declare orderId: number

  @column()
  declare quantity: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Order)
  declare order: BelongsTo<typeof Order>

  @belongsTo(() => ProductPersonalized)
  declare productPersonalized: BelongsTo<typeof ProductPersonalized>
}
