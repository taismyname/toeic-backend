const { db, admin } = require('../config/firebase');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await admin.auth().createUser({ email, password });
    await db.collection('users').doc(userRecord.uid).set({
      email,
      scores: []
    });
    const token = jwt.sign({ id: userRecord.uid }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    const token = jwt.sign({ id: userRecord.uid }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};
