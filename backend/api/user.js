const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken');

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = { ...req.body }
        if (req.params.id) user.id = req.params.id

        // if(!req.originalUrl.startsWith('/users')) user.admin = false
        // if(!req.user || !req.user.admin) user.admin = false

        try {
            existsOrError(user.nome, 'Nome não informado')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.password, 'Senha não informada')

            const userFromDB = await app.db('users')
                .where({ email: user.email }).first()
            if (!user.id) {
                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if (user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))

        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const login = async (req, res) => {

        try {

            var results = await app.db('users').select("*").where({ email: req.body.email })
           
            if (results.length < 1) {
                return res.status(401).send({ message: 'Falha na autenticação' })
            }

            if (await bcrypt.compareSync(req.body.password, results[0].password)) {

                const token = jwt.sign({
                    id: results[0].id,
                    email: results[0].email
                },

                    segredo = 'segredo',
                {
                    expiresIn: "1h"
                }
                );
                return res.status(200).send({
                    message: 'Autenticado com sucesso',
                    token: token,
                    id: results[0].id,
                    nome: results[0].nome,
                    admin: results[0].admin
                });
            }
            return res.status(401).send({ message: 'Falha na autenticação' })

        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Falha na autenticação' });
        }
    }

    const get = (req, res) => {
        app.db('users')
            .select('id', 'nome', 'email', 'admin')
            // .whereNull('deletedAt')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('users')
            .select('id', 'nome', 'email', 'admin')
            .where({ id: req.params.id })
            // .whereNull('deletedAt')
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('users')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted, 'Usuário não foi encontrado.')
            } catch (msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }


    return { save, get, getById, remove, login }
}