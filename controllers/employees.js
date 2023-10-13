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

module.exports= {getAll}