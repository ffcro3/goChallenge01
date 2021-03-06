const express = require("express");
const routes = express.Router();

const projects = [];
let requests = null;

function numberRequests(req, res, next) {
  requests++;
  console.log("Requests: " + requests);

  next();
}

function checkProcjectExists(req, res, next) {
  const { id } = req.params;

  //FIND THE ID AND THEN COMPARE STRINGS.
  const project = projects.find(p => p.id == id);

  if (!project)
    return res.status(400).json({
      error: "Project does not exist."
    });

  return next();
}

routes.use(numberRequests);

//LIST PROJECTS
routes.get("/projects", (req, res) => {
  return res.json(projects);
});

//LIST ONE PROJECT
routes.get("/projects/:id", checkProcjectExists, (req, res) => {
  const { id } = req.params;

  return res.json(projects[id]);
});

//ADD NEW PROJECT
routes.post("/projects", (req, res) => {
  const { id, title } = req.body;
  const last = projects.length;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(projects[last]);
});

//EDIT PROJECT
routes.put("/projects/:id", checkProcjectExists, (req, res) => {
  const { id } = req.params;

  //FIND THE ID AND THEN COMPARE STRINGS.
  const project = projects.find(p => p.id == id);

  project.title = req.body.title;

  return res.json(project);
});

//DELETE PROJECT
routes.delete("/projects/:id", checkProcjectExists, (req, res) => {
  const { id } = req.params;

  project = projects.findIndex(p => p.id == id);

  projects.splice(project, 1);

  return res.json({
    message: true
  });
});

//ADD NEW TASK TO PROJECT
routes.post("/projects/:id/tasks", checkProcjectExists, (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  const last = projects.length;

  project = projects.find(p => p.id == id);

  project.tasks.push(task);

  return res.json(project);
});

module.exports = routes;
