const fs = require('fs');
const path = require('path');

const usersPath = path.join(__dirname, '../data/users.json');
const projectsPath = path.join(__dirname, '../data/projects.json');

const readData = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const writeData = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

module.exports = {
  usersPath,
  projectsPath,
  readData,
  writeData
};
