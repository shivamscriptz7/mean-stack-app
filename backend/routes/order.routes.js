const router = require('express').Router();
const c = require('../controllers/order.controller');

router.post('/', c.create);
router.get('/:id', c.getById);
router.put('/:id', c.update);
router.delete('/:id', c.delete);

module.exports = router;
