const mongodb = require('../db/connect.js');
const ObjectId = require('mongodb').ObjectId;


const getDB  = async (req, res) => {
  try {
    const allDB = await mongodb.getDatabase().db('project2').collection('tasks').find();
    allDB.toArray((err, dbs) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(dbs);
    });
  } catch (err) {
    res.status(500).json(err);
  }
  };

const getTask = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Invalid task ID.');
    }
    const id = new ObjectId(req.params.id);
    const oneDB = await mongodb.getDatabase().db('project2').collection('tasks').find({ _id: id});
    oneDB.toArray((err, dbs) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(dbs[0]);
    });
  } catch (err) {
    res.status(500).json(err);
  }
  };

const createTask = async (req, res) => {
  try {
  const newTask = {
      taskName : req.body.taskName,
      status : req.body.status,
      startDate : req.body.startDate,
      dueDate : req.body.dueDate,
      importance : req.body.importance,
      actionee: req.body.actionee,
      backupActionee : req.body.backupActionee
    };
    const resp = await mongodb.getDatabase().db('project2').collection('tasks').insertOne(newTask);
    if (resp.acknowledged) {
      res.status(201).json(resp);
    } else {
      res.status(500).json(resp.error || 'Task could not be performed');
    }
  } catch (err) {
    res.status(500).json(err);
  }
  };

const updateTask = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Invalid task ID.');
    }
    const id = new ObjectId(req.params.id);
      //create new object to be sent for update
    const newTask = {
      taskName : req.body.taskName,
      status : req.body.status,
      startDate : req.body.startDate,
      dueDate : req.body.dueDate,
      importance : req.body.importance,
      actionee: req.body.actionee,
      backupActionee : req.body.backupActionee
    };
    
    const resp = await mongodb.getDatabase().db('project2').collection('tasks').replaceOne({_id: id}, newTask);
    
    if (resp.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(resp.error || 'Task could not be performed');
  }
} catch (err) {
  res.status(500).json(err);
}
}
    
const deleteTask = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
     res.status(400).json('Invalid task ID.');
    }
    const id = new ObjectId(req.params.id);
    
    const resp = await mongodb.getDatabase().db('project2').collection('tasks').deleteOne({_id: id});
    if (resp.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(resp.error || 'Task could not be performed');
  }
} catch (err) {
  res.status(500).json(err);
}
}

module.exports = {getDB, createTask, getTask, updateTask, deleteTask};