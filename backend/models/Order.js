const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId, ref : 'User', required: true},
    orderItems : [{
        name: {type: String, required: true},
        qty: {type: Number, required: true},
        price: {type: Number, required: true},
        product : {type: mongoose.Schema.Types.ObjectId, ref : 'Product', required: true}
    }],
    shippingAddress : {
        address : {type: String, required: true},   
        city : {type: string, required: true},
    },
    totalPrice: {type: Number, required: true, default: 0.0},
    isPaid: {type: boolean, default: false},
    paidAt: {type: Date},
    isDelivered: {type: boolean, default: false},
    deliveredAt: {type: Date},
}, {timestamps: true});

module.exports = mongoose.model('Order', orderSchema);