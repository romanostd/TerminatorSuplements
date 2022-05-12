// const queries = require('./queries')

module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const products = { ...req.body }
        if(req.params.id) products.id = req.params.id

        try {
            existsOrError(products.name, 'Nome não informado')
            existsOrError(products.descreption, 'Descrição não informada')
            existsOrError(products.categoryId, 'Categoria não informada')
            existsOrError(products.price, 'Preço não informado')
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(products.id) {
            app.db('products')
                .update(products)
                .where({ id: products.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('products')
                .insert(products)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('products')
                .where({ id: req.params.id }).del()
            
            try {
                existsOrError(rowsDeleted, 'Artigo não foi encontrado.')
            } catch(msg) {
                return res.status(400).send(msg)    
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    const limit = 10 // usado para paginação
    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('products').count('id').first()
        const count = parseInt(result.count)

        app.db('products')
            .select('id', 'name', 'descreption' , 'price')
            .limit(limit).offset(page * limit - limit)
            // .then(products => res.json({ data: products, count, limit }))
            .then(products => res.json(products))
            .catch(err => res.status(500).send(err))
    }


    const getById = (req, res) => {
        app.db('products')
            .where({ id: req.params.id })
            .first()
            .then(products => res.json(products))
            .catch(err => res.status(500).send(err))
    }

    

    const getByCategory = async (req, res) => {
        const categoryId = req.params.id
        const page = req.query.page || 1
        const categories = await app.db.raw(queries.categoryWithChildren, categoryId)
        const ids = categories.rows.map(c => c.id)

        app.db({a: 'products', u: 'users'})
            .select('a.id', 'a.name', 'a.description', 'a.imageUrl', { author: 'u.name' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId'])
            .whereIn('categoryId', ids)
            .orderBy('a.id', 'desc')
            .then(products => res.json(products))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById, getByCategory }
}