import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import Order from './order.js'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import ProductBase from './product_base.js'
import Topping from './topping.js'

export default class ProductPersonalized extends BaseModel {
  public static table = 'products_personalized'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare productBaseId: number

  @column()
  declare price: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => ProductBase)
  declare productBase: BelongsTo<typeof ProductBase>

  @manyToMany(() => Order, {
    pivotTable: 'products_orders',
    pivotColumns: ['quantity'],
    localKey: 'id',
    pivotForeignKey: 'product_personalized_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'order_id',
  })
  declare orders: ManyToMany<typeof Order>

  @manyToMany(() => Topping, {
    pivotTable: 'products_toppings',
    localKey: 'id',
    pivotForeignKey: 'product_personalized_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'topping_id',
  })
  declare topping: ManyToMany<typeof Topping>
}
