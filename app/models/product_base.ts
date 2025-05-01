import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import ProductPersonalized from './product_personalized.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class ProductBase extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare stock: number

  @hasMany(() => ProductPersonalized)
  declare productsPersonalized: HasMany<typeof ProductPersonalized>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
