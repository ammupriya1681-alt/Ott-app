import { Router } from 'express';
import Stripe from 'stripe';
import Subscription from '../models/Subscription.js';
import { auth } from '../middlewares/auth.js';

const stripe = new Stripe(process.env.STRIPE_SECRET || '', { apiVersion: '2023-10-16' });
const r = Router();

r.post('/checkout', auth, async (req,res)=>{
  const priceId = req.body.priceId || 'price_dummy';
  if(!process.env.STRIPE_SECRET) return res.json({ url: 'https://example.com/checkout-mock' });
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: (process.env.CLIENT_ORIGIN || '') + '/subscribe/success',
    cancel_url: (process.env.CLIENT_ORIGIN || '') + '/subscribe/cancel',
    customer_email: req.user.email
  });
  res.json({ url: session.url });
});

r.post('/webhook', express.raw({ type: 'application/json' }), async (req,res)=>{
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  if(event.type === 'checkout.session.completed'){
    // TODO: mark active plan
    await Subscription.create({ user: null, plan: 'BASIC', active: true });
  }
  res.json({ received: true });
});

export default r;
