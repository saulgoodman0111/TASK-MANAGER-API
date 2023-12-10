const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const userRoutes=require('./ROUTES/userRoutes');
const taskRoutes=require('./ROUTES/taskRoutes')

require('dotenv').config();
require('./db');
const PORT = 8000;

app.use(bodyParser.json()); 
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  req.json({
    message: "task manager working successfully !!!"
  })
});

app.listen(PORT, () => {
  console.log(`server running at: ${PORT}`);
});