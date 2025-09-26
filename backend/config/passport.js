import passport from 'passport';
import db from './db.js';

// Serialize user for session storage
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
	try {
		const result = await db.query('SELECT * FROM goths_details WHERE id = $1', [id]);
		done(null, result.rows[0]);
	} catch (err) {
		done(err, null);
	}
});

export default passport;



