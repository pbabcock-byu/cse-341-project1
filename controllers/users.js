const mongodb = require('../data/database');
// this is basically getting the primary key for mongodb that it assigned to all its db entries
const ObjectId = require('mongodb').ObjectId;


// using async because we are calling a database
const getAll = async (reg, res) => {
    // i could have put db('project1'), the database, but i want but i put project1 in the connection string 
    // because nothing is in find() we will get all
    const result = await mongodb.getDatabase().db().collection('contacts').find(); 
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getSingle = async (reg, res) => {
    const userId = new ObjectId(reg.params.id);
    // i could have put db('project1'), the database, but i want but i put project1 in the connection string  
    // find({_id: userId}) http://localhost:3000/users/66ee5a600e5826bf034681b0 = will load the data for that id
    const result = await mongodb.getDatabase().db().collection('contacts').find({_id: userId}); 
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        // users[0] returns the first one incase there are mulitply with the same id
        res.status(200).json(users[0]);
    });
};

module.exports = {
    getAll,
    getSingle
};