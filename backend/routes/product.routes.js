const router = require('express').Router();
const c = require('../controllers/product.controller');

router.post('/', c.create);
router.get('/', c.getAll);
router.put('/:id', c.update);
router.delete('/:id', c.delete);

module.exports = router;
