const mongodb = require('../db/connect.js');
const ObjectId = require('mongodb').ObjectId;


const getDB  = async (req, res) => {
    const allDB = await mongodb.getDatabase().db('project2').collection('actionees').find();
    allDB.toArray().then((dbs) => {
      res.status(200).json(dbs);
    });

  };

const getActionee = async (req, res) => {
    const id = new ObjectId(req.params.id);
    const oneDB = await mongodb.getDatabase().db('project2').collection('actionees').find({ _id: id});
    oneDB.toArray().then((dbs) => {
      res.status(200).json(dbs[0]);
    });
  };

const createActionee = async (req, res) => {
    //create object to send to the collection
    const newActionee = {
      actionee : req.body.actionee,
      activeTasks : req.body.activeTasks,
      completedTasks : req.body.completedTasks
    };
    
      
      const resp = await mongodb.getDatabase().db('project2').collection('actionees').insertOne(newActionee);
      if (resp.acknowledged) {
        res.status(201).json(resp);
      } else {
        res.status(500).json(resp.error || 'Task could not be performed');
      }
    };

const updateActionee = async (req, res) => {
    //set object id to be updated
    const id = new ObjectId(req.params.id);
      //create new object to be sent for update
    const newActionee = {
      actionee : req.body.actionee,
      activeTasks : req.body.activeTasks,
      completedTasks : req.body.completedTasks
    };
    
    const resp = await mongodb.getDatabase().db('project2').collection('actionees').replaceOne({_id: id}, newActionee);
    
    if (resp.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(resp.error || 'Task could not be performed');
  }
}
    
const deleteActionee = async (req, res) => {
    const id = new ObjectId(req.params.id);
    
    const resp = await mongodb.getDatabase().db('project2').collection('actionees').deleteOne({_id: id});
    if (resp.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(resp.error || 'Task could not be performed');
  }
}

  module.exports = {getDB, createActionee, getActionee, updateActionee, deleteActionee};