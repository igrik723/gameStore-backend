const Router = require('express')
const router = new Router()
const publisherController = require('../controllers/publisherController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), publisherController.create)
router.get('/', publisherController.getAll)


module.exports = router