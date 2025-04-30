import { BaseSchema } from '@adonisjs/lucid/schema'
import Toppings from '../../app/enums/toppings.js'

export default class extends BaseSchema {
  protected tableName = 'toppings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id').notNullable()
      table.string('name').notNullable()
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })

    this.defer(async () => {
      this.db.table('toppings').multiInsert([
        {
          id: Toppings.FRESA,
          name: 'fresa',
        },
        {
          id: Toppings.PLATANO,
          name: 'platano',
        },
        {
          id: Toppings.NUTELLA,
          name: 'nutella',
        },
        {
          id: Toppings.NUEZ,
          name: 'nuez',
        },
      ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
