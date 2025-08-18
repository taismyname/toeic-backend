const express = require('express');
const cors = require('cors');
const authRoutes = require('../routes/auth');
const questionRoutes = require('../routes/questions');
const scoreRoutes = require('../routes/scores');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' })); // Sẽ cập nhật sau
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/questions', questionRoutes);
app.use('/scores', scoreRoutes);

module.exports = app;
