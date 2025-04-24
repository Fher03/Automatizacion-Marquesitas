import { BaseSchema } from '@adonisjs/lucid/schema'
import hash from '@adonisjs/core/services/hash'

const hashedPassword = await hash.make('1234')
export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('username', 254).notNullable().unique()
      table.string('password').notNullable()
      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').nullable().defaultTo(this.now())
    })

    this.defer(async () => {
      await this.db.table('users').insert({
        username: 'admin',
        password: hashedPassword,
      })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
