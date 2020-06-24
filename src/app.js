const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
    
    const { title, url, techs } = request.body

    const repo = { 
      id: uuid(), 
      url,
      title,
      techs,
      likes: 0
     };
    repositories.push(repo);

    return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const { title, url, techs } = request.body
  
  const repo = repositories.findIndex(repo=>repo.id === id);

  if (repo<0){
    return response.status(400).json({erroe : 'not found'})
  }

  repositories[repo]={
    id, 
    url,
    title,
    techs,
    likes: repositories[repo].likes
  }


  return response.json(repositories[repo]);

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params

  const repo = repositories.findIndex(repo=>repo.id === id);

  if (repo<0){
    return response.status(400).json({erroe : 'not found'})
  }

  repositories.splice(repo, 1)

  return response.send(204)
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params

  const repo = repositories.findIndex(repo=>repo.id === id);

  if (repo<0){
    return response.status(400).json({erroe : 'not found'})
  }

  repositories[repo].likes++;

  return response.json(repositories[repo])
});

module.exports = app;
