import Order from "../../models/Order.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// CREATE ORDER — sirf save karo, payment baad mein
export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, shippingCost, notes } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + (shippingCost || 0);

    const order = await Order.create({
      user: req.user?._id || null,
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingCost: shippingCost || 0,
      total,
      notes,
      paymentStatus: "pending",
      orderStatus: "pending",
    });

    res.json({
      success: true,
      orderId: order._id,
    });

  } catch (err) {
    console.log("ORDER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE ORDER BY ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PAY ORDER — Stripe session banao
export const payOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.paymentStatus === "paid") {
      return res.status(400).json({ message: "Order already paid" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: order.items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.FRONTEND_URL}/order-success?orderId=${order._id}`,
      cancel_url: `${process.env.FRONTEND_URL}/order/${order._id}`,
      metadata: {
        orderId: String(order._id),
      },
    });

    // Session ID save karo
    order.stripeSessionId = session.id;
    await order.save();

    res.json({
      success: true,
      sessionUrl: session.url,
    });

  } catch (err) {
    console.log("PAY ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// STRIPE WEBHOOK
export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata.orderId;

    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: "paid",
      orderStatus: "processing",
    });
  }

  res.json({ received: true });
};

// GET MY ORDERS
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};