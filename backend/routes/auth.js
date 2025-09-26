import express from 'express';
import passport from '../config/passport.js';
import bcrypt from 'bcrypt';
import db from '../config/db.js';

const router = express.Router();

export default router;

// College student registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, rollNumber, branch } = req.body;
    if (!email || !password || !rollNumber || !branch) {
      return res.status(400).json({ error: 'Name, college email, password, roll number, and branch are required' });
    }

    const existing = await db.query('SELECT id FROM goths_details WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const insert = await db.query(
      'INSERT INTO goths_details (email, password_hash, name, roll_number, branch) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [email, passwordHash, name, rollNumber, branch]
    );
    const user = insert.rows[0];
    redirect('/')

    // establish session via passport
    req.login(user, (err) => {
      if (err) return res.status(500).json({ error: 'Session creation failed' });
      const { password_hash, ...safe } = user;
      return res.status(201).json({ user: safe });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Registration failed' });
  }
});

// College student login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'College email and password are required' });
    }

    const result = await db.query('SELECT * FROM freshers_details WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user || !user.password_hash) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.login(user, (err) => {
      if (err) return res.status(500).json({ error: 'Session creation failed' });
      const { password_hash, ...safe } = user;
      return res.json({ user: safe });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Login failed' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.logout?.((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    req.session?.destroy(() => {
      res.clearCookie('connect.sid');
      return res.json({ ok: true });
    });
  });
});
