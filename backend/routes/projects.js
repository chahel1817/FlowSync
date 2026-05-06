const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/auth');
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');

router.get('/', auth, getProjects);
router.post('/', auth, createProject);
router.put('/:id', auth, updateProject);
router.delete('/:id', [auth, admin], deleteProject);

module.exports = router;
