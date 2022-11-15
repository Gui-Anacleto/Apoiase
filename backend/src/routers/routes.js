const express = require('express')
const campanhaController = require('../controllers/campanhaController')
const routes = express.Router()

routes.post('/campanhas', campanhaController.create)

routes.delete('/campanhas/:id', campanhaController.delete)

routes.get('/campanhas', campanhaController.read)

routes.put('/campanhas/:id', campanhaController.update)
/*router.get('/universities/init/', controller.findUniversities)

router.get('/universities/' , controller.getAllUniversities)

router.get('/universities/:id' , controller.findById)

router.post('/universities/' , controller.addUniversitie)

router.put('/universities/:id' , controller.alterUniversitie)

router.delete('/universities/:id', controller.deleteUniversitie)
*/

module.exports = routes