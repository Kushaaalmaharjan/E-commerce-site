const exporess = require('express');
const router = exporess.Router();
const {
    createOrder,
    getOrderById,
    getMyOrders,
    updateOrderToPaid,
    getAllOrders,
} = require('../controllers/orderController');

const { protect, admin} = require('../middleware/authMiddleware');

router.post('/', protect, createOrder);
router.get('/myorders',protect, getMyOrders);1
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);
router.get('/',protect,admin,getAllOrders);
module.exports = router;