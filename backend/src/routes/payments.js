import express from "express";
import Stripe from "stripe";

const router = express.Router();

// Stripe secret key (use environment variable in Render dashboard)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a payment intent
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    // Amount should be in smallest unit (eg: paisa for INR, cents for USD)
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
