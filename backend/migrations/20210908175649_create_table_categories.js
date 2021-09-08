exports.up = function(knex, Promise) {

    return knex.schema.createTable('categories' , table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.integer('parantId').references('id')
        .intTable('categories')
});
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('categories')
};
