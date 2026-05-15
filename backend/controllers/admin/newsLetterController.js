// controllers/newsletterController.js
import Newsletter from '../../models/NewsLetter.js';
import nodemailer from 'nodemailer';

// transporter — ek baar banao
// ✅ replace karo
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

// SUBSCRIBE
export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email required' });

    const exists = await Newsletter.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Already subscribed' });

    await Newsletter.create({ email });

    // welcome email
    await transporter.sendMail({
      from: `"Johary Jewellery" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to Johary Newsletter!',
      html: `
        <h2>Thank you for subscribing!</h2>
        <p>You'll receive our latest offers and discounts.</p>
      `,
    });

    res.json({ success: true, message: 'Subscribed successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL SUBSCRIBERS (admin)
export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    res.json({ success: true, data: subscribers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// SEND EMAIL TO ALL (admin)
export const sendNewsletterEmail = async (req, res) => {
  try {
    const { subject, message } = req.body;
    const subscribers = await Newsletter.find();

    if (subscribers.length === 0) {
      return res.status(400).json({ message: 'No subscribers' });
    }

    const emails = subscribers.map(s => s.email);

    await transporter.sendMail({
      from: `"Johary Jewellery" <${process.env.EMAIL_USER}>`,
      bcc: emails, // sab ko ek saath
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #c19417;">Johary Jewellery</h2>
          <div>${message}</div>
          <hr/>
          <p style="font-size: 12px; color: #999;">
            To unsubscribe, reply to this email.
          </p>
        </div>
      `,
    });

    res.json({ success: true, message: `Email sent to ${emails.length} subscribers!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};