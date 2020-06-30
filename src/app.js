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

    const repository = { 
      id: uuid(), 
      url,
      title,
      techs,
      likes: 0
     };
    repositories.push(repository);

    return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const { title, url, techs } = request.body
  
  const repo = repositories.findIndex(repository=>repository.id === id);

  if (repository<0){
    return response.status(400).json({erroe : 'not found'})
  }

  repositories[repository]={
    id, 
    url,
    title,
    techs,
    likes: repositories[repository].likes
  }


  return response.json(repositories[repository]);

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params

  const repository = repositories.findIndex(repository=>repository.id === id);

  if (repository<0){
    return response.status(400).json({erroe : 'not found'})
  }

  repositories.splice(repository, 1)

  return response.send(204)
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params

  const repository = repositories.findIndex(repository=>repository.id === id);

  if (repository<0){
    return response.status(400).json({erroe : 'not found'})
  }

  repositories[repository].likes++;

  return response.json(repositories[repository])
});

module.exports = app;
