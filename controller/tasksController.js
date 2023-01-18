const mongodb = require('../db/connect.js');
const ObjectId = require('mongodb').ObjectId;


const getDB  = async (req, res) => {
    const allDB = await mongodb.getDatabase().db('project2').collection('tasks').find();
    allDB.toArray().then((dbs) => {
      res.status(200).json(dbs);
    });

  };

const getTask = async (req, res) => {
    const id = new ObjectId(req.params.id);
    const oneDB = await mongodb.getDatabase().db('project2').collection('tasks').find({ _id: id});
    oneDB.toArray().then((dbs) => {
      res.status(200).json(dbs[0]);
    });
  };

const createTask = async (req, res) => {
  //create object to send to the collection
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
  };

const updateTask = async (req, res) => {
    //set object id to be updated
    const id = new ObjectId(req.params.id);
      //create new object to be sent for update
    const newATask = {
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
}
    
const deleteTask = async (req, res) => {
    const id = new ObjectId(req.params.id);
    
    const resp = await mongodb.getDatabase().db('project2').collection('tasks').deleteOne({_id: id});
    if (resp.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(resp.error || 'Task could not be performed');
  }
}

module.exports = {getDB, createTask, getTask, updateTask, deleteTask};