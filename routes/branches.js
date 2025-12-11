const express = require('express');
const router = express.Router();
const branches = require('../data/branches');

// GET all branches
router.get('/', (req, res) => {
  res.json(branches.getAll());
});

// GET a single branch by id
router.get('/:id', (req, res) => {
  const branch = branches.getById(req.params.id);
  if (!branch) {
    return res.status(404).json({ error: 'Branch not found' });
  }
  res.json(branch);
});

// POST create a new branch
router.post('/', (req, res) => {
  const { name, location, manager } = req.body;
  
  if (!name || !location) {
    return res.status(400).json({ error: 'Name and location are required' });
  }

  const newBranch = branches.create({ name, location, manager });
  res.status(201).json(newBranch);
});

// PUT update a branch
router.put('/:id', (req, res) => {
  const { name, location, manager } = req.body;
  const updatedBranch = branches.update(req.params.id, { name, location, manager });
  
  if (!updatedBranch) {
    return res.status(404).json({ error: 'Branch not found' });
  }
  
  res.json(updatedBranch);
});

// DELETE a branch
router.delete('/:id', (req, res) => {
  const deleted = branches.remove(req.params.id);
  
  if (!deleted) {
    return res.status(404).json({ error: 'Branch not found' });
  }
  
  res.status(204).send();
});

module.exports = router;
