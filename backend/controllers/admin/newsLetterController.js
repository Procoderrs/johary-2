import Newsletter from '../../models/NewsLetter.js';
import { sendEmail } from '../../utils/sendEmail.js';

// SUBSCRIBE
export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email required' });

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await Newsletter.findOne({ email: normalizedEmail });
    if (existing) return res.status(409).json({ message: 'Already subscribed' });

    await Newsletter.create({ email: normalizedEmail });

    // welcome email
    await sendEmail({
      to: normalizedEmail,
      subject: 'Welcome to Johary Newsletter!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #c19417;">Welcome to Johary Jewellery!</h2>
          <p>Thank you for subscribing. You'll receive our latest offers and discounts.</p>
        </div>
      `,
    });

    res.status(201).json({ success: true, message: 'Subscribed successfully!' });
  } catch (err) {
    console.log('subscribe error:', err);
    res.status(500).json({ message: err.message });
  }
};

// GET ALL SUBSCRIBERS
export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    res.json({ success: true, data: subscribers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// SEND EMAIL TO ALL
export const sendNewsletterEmail = async (req, res) => {
  try {
    const { subject, message } = req.body;
    if (!subject || !message) {
      return res.status(400).json({ message: 'Subject & message required' });
    }

    const subscribers = await Newsletter.find();
    if (!subscribers.length) {
      return res.status(404).json({ message: 'No subscribers found' });
    }

    const emails = subscribers.map(s => s.email);

    await sendEmail({
      to: process.env.EMAIL_USER,
      bcc: emails,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #c19417;">Johary Jewellery</h2>
          <div>${message}</div>
          <hr/>
          <p style="font-size: 12px; color: #999;">Unsubscribe by replying to this email.</p>
        </div>
      `,
    });

    res.json({ success: true, message: `Email sent to ${emails.length} subscribers!` });
  } catch (err) {
    console.log('send error:', err);
    res.status(500).json({ message: err.message });
  }
};