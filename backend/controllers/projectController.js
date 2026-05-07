const { readData, writeData, projectsPath } = require('../utils/db');

const getProjects = (req, res) => {
  const projects = readData(projectsPath);
  const { role, id } = req.user;

  if (role === 'admin') {
    return res.json(projects);
  } else {
    const userProjects = projects.filter(p => p.customerId === id);
    return res.json(userProjects);
  }
};

const getProjectById = (req, res) => {
  const { id } = req.params;
  const projects = readData(projectsPath);
  const project = projects.find(p => p.id === id);

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  // Check permissions
  if (req.user.role !== 'admin' && project.customerId !== req.user.id) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  res.json(project);
};

const createProject = (req, res) => {
  const { title, description, deadline, priority, requirements } = req.body;
  const projects = readData(projectsPath);

  const newProject = {
    id: Date.now().toString(),
    title,
    description,
    deadline,
    priority,
    requirements,
    status: 'Pending',
    progress: 0,
    customerId: req.user.id,
    customer: req.user.name,
    createdAt: new Date().toISOString()
  };

  projects.push(newProject);
  writeData(projectsPath, projects);
  res.status(201).json(newProject);
};

const updateProject = (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  let projects = readData(projectsPath);

  const index = projects.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Project not found' });
  }

  // Only admin can update certain fields like status, progress, assignedDev
  // Or customer can update their own project details (if allowed)
  projects[index] = { ...projects[index], ...updates };
  writeData(projectsPath, projects);
  res.json(projects[index]);
};

const deleteProject = (req, res) => {
  const { id } = req.params;
  let projects = readData(projectsPath);
  
  projects = projects.filter(p => p.id !== id);
  writeData(projectsPath, projects);
  res.json({ message: 'Project deleted' });
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
