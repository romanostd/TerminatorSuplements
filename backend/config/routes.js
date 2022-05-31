module.exports = app => {

    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/users/:id')
        .get(app.api.user.getById)
        .put(app.api.user.save)
        .delete(app.api.user.remove)

    app.route('/categories')
        .get(app.api.category.get)
        .post(app.api.category.save)


    app.route('/categories/tree')
        .get(app.api.category.getTree)

    app.route('/categories/:id')
        .get(app.api.category.getById)
        .put(app.api.category.save)
        .delete(app.api.category.remove)

    app.route('/products/')
        .get(app.api.products.get)
        .post(app.api.products.save)

    app.route('/products/:id')
        .get(app.api.products.getById)
        .put(app.api.products.save)
        .delete(app.api.products.remove)

}