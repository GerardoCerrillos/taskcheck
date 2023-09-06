import express from "express";
import db from "./utils/database.js";
import Task from "./taskcheck/task.model.js";
import "dotenv/config"

Task;

const PORT = process.env.PORT ?? 5000;

db.authenticate()
  .then(() => {console.log('conexion correcta')})
  .catch(err => console.log(err));

db.sync()
  .then(() => console.log('base de datos sincronizada'))
  .catch(err => console.log(err))

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send('ok');
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks)
  } catch (error) {
    res.status(400).json(error)
  }
})

app.post('/tasks',async (req, res) => {
  try {
    const {body} = req;
    const task = await Task.create(body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.get('/tasks/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const task = await Task.findByPk(id);
    res.json(task);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.put('/tasks/:id', async (req, res) => {
try {
  const {id} = req.params;
  const {body} = req;
  const task = await Task.update(body,{
    where: {id: id}
  });
  res.json(task);
} catch (error) {
  res.status(400).json(error);
}
})

app.delete('/tasks/:id', async (req, res) => {
  try {
    const {id} = req.params;
    await Task.destroy({
      where: {id}
    })
    res.status(204).end()
  } catch (error) {
    res.status(400).json(error)
  }
})


app.listen(PORT, () => {
    console.log(`servidor escuchando en el ${PORT}`);
});