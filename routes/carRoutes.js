const express = require('express')
const router = express.Router()

//router which routes requests from the react front end to the controller, and on to the database

//import the controller
const carModelController = require("../controllers/carModel.controller")

//route to the findall function to show all cars
router.get("/", carModelController.getCars);

//route to the findall function to show newer cars
router.get("/new", carModelController.getNewCars);

//route to create a new car (using post method)
router.post("/", carModelController.createNewCar);

//route to delete a car
router.delete("/:id", carModelController.deleteCar);

//route to update a car by id
router.put("/:id", carModelController.updateCar);

//route to update the owner of all relevant cars (update many cars)
router.put("/", carModelController.updateMultipleCars);

module.exports = router