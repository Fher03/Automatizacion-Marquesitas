import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import Topping from './topping.js'
import Order from './order.js'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare topppingId: number

  @column()
  declare name: string

  @column()
  declare price: number

  @column()
  declare stock: number

  @belongsTo(() => Topping)
  declare topping: BelongsTo<typeof Topping>

  @manyToMany(() => Order)
  declare orders: ManyToMany<typeof Order>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
