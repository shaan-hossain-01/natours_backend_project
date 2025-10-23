const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello from the serverside!', app: `Natours` });
});

app.post('/', (req, res) => {
  res.status(200).json({ message: 'You have sent a POST request' });
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
