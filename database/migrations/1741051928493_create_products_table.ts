import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products_base'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.integer('stock')
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })

    this.defer(async () => {
      await this.db.table('products_base').multiInsert([
        {
          name: 'Marquesita',
          stock: 10,
        },
        {
          name: 'Tostitos',
          stock: 10,
        },
      ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
