const Router = require('express')
const router = new Router()
const gameRouter = require('./gameRouter')
const userRouter = require('./userRouter')
const publisherRouter = require('./publisherRouter')
const typeRouter = require('./typeRouter')


router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/publisher', publisherRouter)
router.use('/game', gameRouter)




module.exports = router