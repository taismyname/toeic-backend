const { db, admin } = require('../config/firebase');
const jwt = require('jsonwebtoken');

exports.submitScore = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { score } = req.body;
    const scoreRef = await db.collection('scores').add({
      userId: decoded.id,
      score,
      date: new Date()
    });
    await db.collection('users').doc(decoded.id).update({
      scores: admin.firestore.FieldValue.arrayUnion(scoreRef.id)
    });
    res.json({ message: 'Score saved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getScores = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const snapshot = await db.collection('scores')
      .where('userId', '==', decoded.id)
      .orderBy('date', 'desc')
      .get();
    const scores = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
