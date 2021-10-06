"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getUserById = exports.getUsers = void 0;
const getUsers = (req, res) => {
    try {
        return res.status(200).json({
            msg: 'get all users'
        });
    }
    catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            msg: 'Error: Get all users'
        });
    }
};
exports.getUsers = getUsers;
const getUserById = (req, res) => {
    try {
        return res.status(200).json({
            msg: 'get a user'
        });
    }
    catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            msg: 'Error: Get a user'
        });
    }
};
exports.getUserById = getUserById;
const postUser = (req, res) => {
    try {
        return res.status(200).json({
            msg: 'create a user'
        });
    }
    catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            msg: 'Error: create a user'
        });
    }
};
exports.postUser = postUser;
const putUser = (req, res) => {
    try {
        return res.status(200).json({
            msg: 'update a user'
        });
    }
    catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            msg: 'Error: update a user'
        });
    }
};
exports.putUser = putUser;
const deleteUser = (req, res) => {
    try {
        return res.status(200).json({
            msg: 'delete a user'
        });
    }
    catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            msg: 'Error: delete a user'
        });
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map