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


const createUser = async (reg, res) => {
    // Does not have a user ID yet
    const user = {
        firstname: reg.body.firstname,
        lastName: reg.body.lastName,
        email: reg.body.email,
        favoriteColor: reg.body.favoriteColor,
        birthday:reg.body.birthday
    };
    // pass in the new user id 
    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(user);
    // check to see if there was a record created "acknowledged" and send a success else error message 
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while adding the user');
    };
};


const updateUser = async (reg, res) => {
    // as we update a user we need to get the ID
    const userId = new ObjectId(reg.params.id);
    const user = {
        firstname: reg.body.firstname,
        lastName: reg.body.lastName,
        email: reg.body.email,
        favoriteColor: reg.body.favoriteColor,
        birthday:reg.body.birthday
    };
    // so get the id {_id: userId} and pass it to the "user" one
    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({_id: userId}, user);
    // check to see if there was at least 1 modified record and send a success else error message 
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the user');
    };
};

const deleteUser = async (reg, res) => {
    // as we update a user we need to get the ID
    const userId = new ObjectId(reg.params.id);
    // This uses the user ID to remove this record
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({_id: userId});
    // check to see if there was at least 1 record deleted and send a success else error message 
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting the user');
    };
};


module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};