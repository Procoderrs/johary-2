import mongoose from 'mongoose';
const orderSchema=new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"joharyUser",
    default:null,
  },

  items:[{
    product:{type:mongoose.Schema.Types.ObjectId,ref:"JoharyProduct"},
    name:String,
    image:String,
    price:Number,
    quantity:Number,
    selectedVariant:Object
  }],

  shippingAddress:{
    fullName:String,
    email:String,
    phone:String,
    address:String,
    city:String,
    country:String,
    zipcode:String,
  },

  discountAmount: { type: Number, default: 0 },
couponCode: { type: String, default: null },

  paymentMethod:{
    type:String,
    enum:["stripe","cod"],
    default:"stripe",
  },

  paymentStatus:{
    type:String,
    enum:["pending","paid","failed"],
    default:'pending',
  },

  orderStatus:{
    type:String,
    enum:["pending","processing","shipped","delievered",'cancelled'],
    default:"pending",
  },
  stripeSessionId:String,
  subtotal:Number,
  shippingCost:{type:Number,default:0},
  total:Number,

},{timestamps:true});

export default mongoose.model('JoharyOrder',orderSchema)