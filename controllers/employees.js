const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//get all employees info
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('employees').collection('employees').find();
    const lists = await result.toArray();
    console.log(lists);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (error) {
    console.error("Error while fetching employees:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get single employee with id
const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('employees')
    .collection('employees')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    console.log(lists)
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

//updating employee with id
const updateEmployee = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }
    const userId = new ObjectId(req.params.id);
    const employee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        position: req.body.position,
        department: req.body.department,
        gender: req.body.gender,
        dob: req.body.dob
      }
    const result = await mongodb.getDb().db('employees').collection('employees').replaceOne({ _id: userId }, employee);
    if (result.modifiedCount > 0){
      res.status(204).send();
    } else {
      res.status(500).json(result.error || 'Some error occurred while updating the employee information');
    }
  
  }
  

//creating new employee
const createEmployee = async (req, res) => {
    const employee = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      position: req.body.position,
      department: req.body.department,
      gender: req.body.gender,
      dob: req.body.dob
    }
    const result = await mongodb.getDb().db('employees').collection('employees').insertOne(employee);
    console.log(result)
    if (result.acknowledged){
      res.status(201).json(result);
    } else {
      res.status(500).json(result.error);
    }
  }

//deleting employee
const deleteEmployee = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to delete an employee info.');
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('employees').collection('employees').deleteOne({ _id: userId }, true);
  if (result.deletedCount > 0){
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the employee');
  }
}

module.exports= {getAll, createEmployee, updateEmployee, getSingle, deleteEmployee}