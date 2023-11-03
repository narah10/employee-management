const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//get all departments info
const getAll = async (req, res) => {
    try {
      const result = await mongodb.getDb().db('employees').collection('departments').find();
      const lists = await result.toArray();
      console.log(lists);
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    } catch (error) {
      console.error("Error while fetching employees:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

//get single department with id
const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid department id to find a department.');
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('employees')
      .collection('departments')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      console.log(lists)
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };

  const createDepartment = async (req, res) => {
    try {
      console.log('Request Body:', req.body);
      const newDepartment = {
        departmentName: req.body.departmentName,
        departmentHead: req.body.departmentHead,
        departmentBudget: req.body.departmentBudget,
      };
  
      const result = await mongodb.getDb().db('employees').collection('departments').insertOne(newDepartment);
      console.log(result);
  
      if (result.acknowledged) {
        res.status(201).json(result);
      } else {
        res.status(500).json(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  //updating department with id
const updateDepartment = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a department.');
  }
    const departmentId = new ObjectId(req.params.id);
    const newDepartment = {
      departmentName: req.body.departmentName,
      departmentHead: req.body.departmentHead,
      departmentBudget: req.body.departmentBudget,
    };
    const result = await mongodb.getDb().db('employees').collection('departments').replaceOne({ _id: departmentId }, newDepartment);
    if (result.modifiedCount > 0){
      res.status(204).send();
    } else {
      res.status(500).json(result.error || 'Some error occurred while updating the department information');
    }
  
  }

  //deleting department
const deleteDepartment = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid department id to delete a department info.');
  }
  const departmentId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('employees').collection('departments').deleteOne({ _id: departmentId }, true);
  if (result.deletedCount > 0){
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the department');
  }
}


  
module.exports={getAll, getSingle, createDepartment, updateDepartment, deleteDepartment}
