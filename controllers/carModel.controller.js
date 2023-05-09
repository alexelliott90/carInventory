const Car = require("../models/carModel");

//function to get all cars, which are then displayed on the table
exports.getCars = (req, res) => {
  Car.find()
    .then((cars) => {
      res.json(cars);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error - cars not retrieved" });
    });
};

//function to get cars less than 5 years old and update the table
exports.getNewCars = (req, res) => {
  Car.find({ model: {$gt: 2018} })
    .then((cars) => {
      res.json(cars);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error - cars not retrieved" });
    });
};

// Function to POST a new car
exports.createNewCar = (req, res) => {
  // Create a new car
const newCar = new Car({
  model: req.body.model,
  make: req.body.make,
  owner: req.body.owner,
  registration: req.body.registration,
});
// Save new car to the database
newCar.save()
  .then((addNewCar) => {
    //200 status to show car successfully added
    res.status(200).json(addNewCar);
  })
  .catch((err) => {
    //400 status in case of error
    res.status(400).send({ message: "Error - car could not be added" });
  });
};

//Function to DELETE a car
exports.deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    const car = await Car.findByIdAndDelete(id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    //200 status in case of success
    res.status(200).json({ message: 'Successfully deleted car' });
  } catch (error) {
    console.error(error);
    //500 status in case of server error
    res.status(500).json({ message: 'Server Error' });
  }
};

//function to update a car (POST request)
exports.updateCar = (req, res) => {
  //retrieve car ID
  const id = req.params.id;
  //find by id and update using the id above
  Car.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedCar) => {
        if (!updatedCar) {
        //404 error in case of failure
        return res.status(404).json({ message: "Error - could not find that car" });
        }
        //in case of success, 200 status code and update the car
        res.status(200).json(updatedCar);
    })
    .catch((err) => {
    //404 error if car couldnt be updated
    res.status(400).json({ message: "Error - could not update the car" });
    });
};

//update many cars with a PUT request
exports.updateMultipleCars = (req, res) => {
  //retrieve variables in request body
  const {oldOwner, newOwner} = req.body;
  //filter for old value to be updated
  const filter = { owner: { $in: oldOwner } };
  //change variable to change to new owner
  const change = { owner: newOwner };
  //update the cars with the old owner to have the new owner
  Car.updateMany(filter, change)
    .then((result) => {
      res.json({ message: "Cars have been updated!" });
    })
    .catch((error) => {
      res.status(400).json({ message: "Error - cars could not be updated" });
    });
};

