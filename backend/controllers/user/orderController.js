// controllers/user/orderController.js
import Order from "../../models/Order.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// CREATE ORDER + STRIPE SESSION
export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal; // shipping baad mein add kar sakte ho

    // Order DB mein save karo
    const order = await Order.create({
      user: req.user?._id || null,
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      total,
      paymentStatus: "pending",
    });

    // Agar Stripe
    if (paymentMethod === "stripe") {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: items.map((item) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              images: item.image ? [item.image] : [],
            },
            unit_amount: Math.round(item.price * 100), // cents mein
          },
          quantity: item.quantity,
        })),
        success_url: `${process.env.FRONTEND_URL}/order-success?orderId=${order._id}`,
        cancel_url: `${process.env.FRONTEND_URL}/checkout`,
        metadata: {
          orderId: String(order._id),
        },
      });

      // Session ID save karo
      order.stripeSessionId = session.id;
      await order.save();

      return res.json({
        success: true,
        sessionUrl: session.url, // frontend isko open karega
        orderId: order._id,
      });
    }

    // COD
    order.paymentStatus = "pending";
    order.orderStatus = "processing";
    await order.save();

    res.json({ success: true, orderId: order._id });

  } catch (err) {
    console.log("ORDER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// STRIPE WEBHOOK — payment confirm hone pe
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

// GET USER ORDERS
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};