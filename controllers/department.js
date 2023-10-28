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



module.exports={getAll}
