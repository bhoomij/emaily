const router = require('express').Router();
const passport = require('passport');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

router.get('/current_user', (req, res) => {
    res.send(req.user);
});

router.post('/stripe', requireLogin, async (req, res) => {
    const { id, email } = req.body;
    const charge = await stripe.charges.create({
        amount: 4000,
        currency: "inr",
        source: id,
        description: `Charge 40 Rs. for 40 email credits for ${email}`
    });

    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
});

module.exports = router;