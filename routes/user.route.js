const router = require("express").Router();
const User = require('../models/user.model');
const mongoose = require('mongoose')

router.param('id', (req, res, next, id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: 'BAD_REQUEST',
            message: 'Invalid user id'
        })
    }
    next();
});

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        let user = await User.create(req.body);
        return res.json(user);
    } catch (err) {
        console.error(`Error in creating user:`, err.message || err);
        return res.status(500).json({
            status: 'ERROR',
            message: 'Something bad happened!',
            error: err
        })
    }
});

router.get('/', async (req, res) => {
    try {
        const sortOptions = {};
        if (req.query.sortBy && req.query.sort) {
            sortOptions[req.query.sortBy] = req.query.sort === 'asc' ? 'asc' : 'desc';
        }
        const filterOptions = {};
        if (req.query.filterBy && req.query.filter) {
            filterOptions[req.query.filterBy] = {$in: [new RegExp(req.query.filter, 'i')]};
        }
        let user = await User
            .find(filterOptions)
            .sort(sortOptions)
            .lean();
        return res.json(user);
    } catch (err) {
        console.error(`Error in getting user list:`, err.message || err);
        return res.status(500).json({
            status: 'ERROR',
            message: 'Something bad happened!',
            error: err
        })
    }
});

router.put('/:id', async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate(req.params.id, req.body).lean();
        if (!user) {
            return res.status(404).json({
                status: 'NOT_FOUND',
                message: 'User not found'
            })
        }
        return res.json(user);
    } catch (err) {
        console.error(`Error in updating user:`, err.message || err);
        return res.status(500).json({
            status: 'ERROR',
            message: 'Something bad happened!',
            error: err
        })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let user = await User.findByIdAndDelete(req.params.id).lean();
        if (!user) {
            return res.status(404).json({
                status: 'NOT_FOUND',
                message: 'User not found'
            })
        }
        return res.json(user);
    } catch (err) {
        console.error(`Error in deleting user:`, err.message || err);
        return res.status(500).json({
            status: 'ERROR',
            message: 'Something bad happened!',
            error: err
        })
    }
});


module.exports = router;