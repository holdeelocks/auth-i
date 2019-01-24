const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../../database/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
	res.json({ holden: 'this is working buddy' });
});

router.post('/', async (req, res) => {
	const credentials = req.body;
	const { username } = credentials;

	try {
		const user = await db('users')
			.where({ username })
			.first();

		if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
			return res.status(401).json({ error: 'You shall not pass' });
		}

		req.session.userId = user.id;
		res.status(200).json({ message: 'Logged in', cookie: { id: req.session.userId } });
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/end', (req, res) => {
	if (req.session) {
		req.session.destroy(err => {
			if (err) {
				res.send('error logging out');
			} else {
				res.send('good bye');
			}
		});
	}
});

module.exports = router;
