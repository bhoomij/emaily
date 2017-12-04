const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./config/keys');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useMongoClient: true });

require('./services/passport');
const authRoutes = require('./routes/auth');

const PORT = process.env.PORT || 5000;

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Emaily server started on port ${PORT}`);
});