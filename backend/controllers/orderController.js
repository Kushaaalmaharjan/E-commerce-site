const Order = require('../models/Order');

//Post /api/orders
const createOrder = async(req,res,next) => {
    console.log('1. createOrder hit');
    console.log('2. user:', req.user);
    console.log('3. body:', req.body);
    try{
        const {orderItems, shippingAddress, totalPrice} = req.body;
        console.log('4. orderItems:', orderItems);
        if(!orderItems || orderItems.length === 0){
            res.status(400);
            throw new Error('No Order Items');
        }

        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            totalPrice,
        });
        console.log('5. order:', order);
        const createOrder = await order.save();
        console.log('6. createOrder:', createOrder);
        res.status(201).json(createOrder);
    } catch(err){   
        console.log('7. error:', err.message);
        next(err);
    }
};

//GET - get order by id /api/orders/:id
const getOrderById = async (req, res, next) => {
    try{
        const order = await Order.findById(req.params.id).populate('user', 'name email');
        if(order){
            res.json(order);
        } else{
            res.status(404);
            throw new Error('Order Not Found');
        }
    } catch(err){
        next(err);
    }
};
 
//GET - get logges users orders /api/orders/myorders
const getMyOrders = async (req, res, next) => {
    try{    
        const orders = await Order.find({user: req.user._id});
        res.json(orders);
    } catch(err){
        next(err);
    }
}

//UPDATE - update order to paid /api/orders/:id/pay
const updateOrderToPaid = async (req, res, next) => {
    try{
        const order = await Order.findById(req.params.id);
        if(order){
            order.isPaid = true;
            order.paidAt = Date.now();
            const updateOrder = await order.save();
            res.json(updateOrder);
        }
        else{
            res.status(404);
            throw new Error('order Not Found');
        }
    } catch(err){
        next(err);
    }
}

//GET - admin: get all orders /api/orders
const getAllOrders = async(req, res, next) =>{
    try{
        const orders = await Order.find({}).populate('user', 'id name');
        res.json(orders);
    } catch(err){
        next(err);
    }
}

module.exports = {createOrder, getOrderById, getMyOrders, updateOrderToPaid, getAllOrders};
