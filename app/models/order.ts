import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Seller from './seller.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare sellerId: number

  @column.dateTime()
  declare date: DateTime

  @column()
  declare total: number

  @column()
  declare paymentMethod: string

  @column()
  declare customerName: string

  @belongsTo(() => Seller)
  declare seller: BelongsTo<typeof Seller>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
