import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import ProductBase from './product_base.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class ProductPersonalized extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare productBaseId: number

  @column()
  declare toppingId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => ProductBase)
  declare productsBase: BelongsTo<typeof ProductBase>
}
