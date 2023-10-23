const express = require('express')
const router = express()
const methodOverride = require('method-override')
const linkController = require('../controllers/linkController')

router.use(methodOverride('_method'))

router.get('/', linkController.allLinks)
router.get('/:title', linkController.redirect);
router.get('/add', (req, res) => res.render('index', {error: false, body: {}}));
router.get('/edit/:id', linkController.loadLink);


router.post('/', express.urlencoded({ extended: true }), linkController.addLink)
router.post('/edit/:id', express.urlencoded({ extended: true }), linkController.editLink);

router.delete('/:id', linkController.deleteLink)
router.delete('/', express.json(), linkController.deleteLink)

module.exports = router