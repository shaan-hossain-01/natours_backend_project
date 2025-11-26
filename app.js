const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
app.get('/api/v1/tours'
  , (req, res) => {
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  });

app.get('/api/v1/tours/:id'
  , (req, res) => {
    console.log(req.params);

    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === req.params);
    res.status(200).json({
      status: 'success',
      //      results: tours.length,
      //    data: {
      //    tours: tours,
      //},
    });
  });


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

