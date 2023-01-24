const mongodb = require('../db/connect.js');
const ObjectId = require('mongodb').ObjectId;


const getDB  = async (req, res) => {
  try {
    const allDB = await mongodb.getDatabase().db('project2').collection('actionees').find();
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

const getActionee = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Invalid actionee ID.');
    }
    const id = new ObjectId(req.params.id);
    const oneDB = await mongodb.getDatabase().db('project2').collection('actionees').find({ _id: id});
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

const createActionee = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json(err);
  }
    };

const updateActionee = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Invalid actionee ID.');
    }
    const id = new ObjectId(req.params.id);

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
  } catch (err) {
    res.status(500).json(err);
  }
};
    
const deleteActionee = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Invalid actionee ID.');
    }
    const id = new ObjectId(req.params.id);
    
    const resp = await mongodb.getDatabase().db('project2').collection('actionees').deleteOne({_id: id});
    if (resp.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(resp.error || 'Task could not be performed');
  }
} catch (err) {
  res.status(500).json(err);
}
}

  module.exports = {getDB, createActionee, getActionee, updateActionee, deleteActionee};