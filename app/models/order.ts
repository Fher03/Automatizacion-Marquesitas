import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import ProductPersonalized from './product_personalized.js'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare total: number

  @column()
  declare paymentMethod: string

  @column()
  declare customerName: string

  @column()
  declare state: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @manyToMany(() => ProductPersonalized, {
    pivotTable: 'products_orders',
    pivotColumns: ['quantity'],
    localKey: 'id',
    pivotForeignKey: 'order_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'product_personalized_id',
  })
  declare productPersonalized: ManyToMany<typeof ProductPersonalized>
}
