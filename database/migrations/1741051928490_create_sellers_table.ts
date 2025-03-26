import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sellers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name').notNullable()
      table.string('password').notNullable()
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').nullable().defaultTo(this.now())
    })

    this.defer(async () => {
      await this.db.table('sellers').insert({
        name: 'Admin',
        password: '1234',
      })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
