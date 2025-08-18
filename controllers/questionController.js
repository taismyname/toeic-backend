const { db } = require('../config/firebase');

exports.getQuestions = async (req, res) => {
  const { type } = req.query;
  try {
    const snapshot = await db.collection('questions')
      .where('type', '==', type)
      .limit(5)
      .get();
    const questions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
