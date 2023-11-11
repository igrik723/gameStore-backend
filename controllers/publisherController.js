const { Publisher } = require('../models/models')
const ApiError = require('../error/ApiError')

class PublisherController {
    async create(req, res) {    
        const { name } = req.body
        const publisher = await Publisher.create({ name })
        return res.json(publisher)
    }

    async getAll(req, res) {
        const publishers = await Publisher.findAll()
        return res.json(publishers)
    }
}

module.exports = new PublisherController()