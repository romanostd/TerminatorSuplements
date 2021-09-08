exports.up = function(knex, Promise) {
  return knex.schema.createTable('products' , table => {
      table.increments('id').primary()
      table.string('name').notNull()
      table.string('descreption', 1000).notNull()
      table.string('imageUrl', 1000).notNull()
      table.float('price').notNull()
      table.integer('categoryID').references('id')
        .intTable('categories').notNull()
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('products')
};
