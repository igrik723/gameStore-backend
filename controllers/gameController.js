const uuid = require('uuid')
const path = require('path')
const {Game} = require('../models/models')
const ApiError = require('../error/ApiError')

class GameController {
    async create(req, res, next) {
        try {
            const { name, price, publisherId, typeId, info } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const game = await Game.create({ name, price, publisherId, typeId, img: fileName })
        
            return res.json(game)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
    }

    async getAll(req, res) {
        let { publisherId, typeId, limit, page } = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let games;
        if (!publisherId && !typeId) {
            games = await Game.findAndCountAll({limit, offset})
        }
        if (publisherId && !typeId) {
            games = await Game.findAndCountAll({where:{publisherId}, limit, offset})
        }
        if (!publisherId && typeId) {
            games = await Game.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (publisherId && typeId) {
            games = await Game.findAndCountAll({where:{publisherId, typeId}, limit, offset})
        }
        return res.json(games)
    }

    async getOne(req, res) {
        const { id } = req.params
        const game = await Game.findOne(
            {
                where: { id }
            }
        )
        return res.json(game)
    }
}

module.exports = new GameController()