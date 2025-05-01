import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import ProductPersonalized from './product_personalized.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Topping from './topping.js'

export default class ProductTopping extends BaseModel {
  public static table = 'products_toppings'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare productPersonalizedId: number

  @column()
  declare toppingId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => ProductPersonalized)
  declare productPersonalized: BelongsTo<typeof ProductPersonalized>

  @belongsTo(() => Topping)
  declare topping: BelongsTo<typeof Topping>
}
