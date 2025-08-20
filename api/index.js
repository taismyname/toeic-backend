const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(require('cors')());

// Mock data (thay bằng Firebase sau)
const questions = {
  listening: [
    { id: 1, question: "Listen and choose the correct answer.", options: ["A", "B", "C"], correctAnswer: 0 }
  ],
  reading: [
    { id: 1, question: "Read and choose the correct answer.", options: ["A", "B", "C"], correctAnswer: 1 }
  ]
};

// API get questions
app.get('/api/questions', (req, res) => {
  const type = req.query.type;
  if (questions[type]) {
    res.json(questions[type]);
  } else {
    res.status(404).json({ error: 'Type not found' });
  }
});

// API post scores (cần JWT và Firebase sau)
app.post('/api/scores', (req, res) => {
  const score = req.body;
  console.log('Score saved:', score);
  res.json({ message: 'Score saved', score });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
