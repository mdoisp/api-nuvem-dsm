const express = require('express');
const branchesRouter = require('./routes/branches');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/branches', branchesRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'API Nuvem DSM - Branch Management API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
