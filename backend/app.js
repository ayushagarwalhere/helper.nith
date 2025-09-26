import express from 'express';
import env from 'dotenv';
import session from 'express-session';
import passport from './config/passport.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';
import db, { connectDB } from './config/db.js';

const app = express();

env.config();

// db and connectDB are provided by config/db.js

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

const startServer = async () => {
    await connectDB();
    app.listen(1234, () => {
        console.log('Server is running on http://localhost:1234');
    });
};

startServer();