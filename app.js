const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  };

const postNewTour = (req, res) => {
    //console.log(req.body);

    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);
    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      err => {
        res.status(201).json({
          status: 'success',
          data: {
            tour: newTour,
          },
        });
      }
    );
  };

const getTourById = (req, res) => {
    console.log(req.params);

    const id = req.params.id * 1;

    //    if (id > tours.length) {
    //    res.status(404).json({
    //    status: 'fail',
    //  message: 'Invalid ID'
    //})
    //}
    const tour = tours.find(el => el.id === id);

    if (!tour) {
      res.status(404).json({
        status: 'fail',
        message: 'Invalid ID'
      })
    }
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  };


const updateTourById = (req, res) => {
    res.status(200).json({
      status: 'success',
      data: {
        tour: '<Updated tour here...>',
      },
    });
  };

const deleteTourById =  (req, res) => {
    res.status(200).json({
      status: 'success',
      data: null,
    });
  };

app.use(express.json());
// app.get('/api/v1/tours', getAllTours);

// app.post('/api/v1/tours', postNewTour);

// app.get('/api/v1/tours/:id', getTourById);

// app.patch('/api/v1/tours/:id', updateTourById);

// app.delete('/api/v1/tours/:id', deleteTourById);

app.route('/api/v1/tours')
   .get(getAllTours)
   .post(postNewTour);

app.route('/api/v1/tours/:id')
   .get(getTourById)
   .patch(updateTourById)
   .delete(deleteTourById);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

