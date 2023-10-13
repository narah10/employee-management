const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//get all employees info
const getAll = async (req, res) => {
    const result = await mongodb.getDb().db('employees').collection('employees').find();
    result.toArray().then((lists) => {
      console.log(lists)
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists); 
    });
  };

//updating employee with id
const updateEmployee = async (req, res) => {
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
    if (result.acknowledged){
      res.status(204).json(result);
    } else {
      res.status(500).json(result.error);
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

module.exports= {getAll, createEmployee, updateEmployee}