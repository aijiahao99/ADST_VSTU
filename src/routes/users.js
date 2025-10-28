// routes/users.js
const express = require('express');
const db = require('../db/connection');
const users = db.get('users');
const { ObjectId } = require('mongodb');

const router = express.Router();

/* get all users */
router.get('/', async (req, res, next) => {
  try {
    const allUsers = await users.find({});
    res.json(allUsers);
  } catch (error) {
    next(error);
  }
});

/* get a user with appropriate username */
router.get('/username/:username', async (req, res, next) => {
  try {
    const user = await users.findOne({ username: req.params.username });
    if (!user) {
      res.status(404);
      return next(new Error('user does not exsit'));
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

/* get a user with appropriate _id */
router.get('/id/:id', async (req, res, next) => {
  try {
    const user = await users.findOne({ _id: req.params.id });
    if (!user) {
      res.status(404);
      return next(new Error('user does not exsit'));
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

/* get all jobs presented in the database */
router.get('/jobs/all', async (req, res, next) => {
  try {
    const jobs = await users.distinct('job');
    res.json(jobs);
  } catch (error) {
    next(error);
  }
});

/* get users with IDs within a given range */
router.get('/range', async (req, res, next) => {
  try {
    const { min, max } = req.query;
    if (!min || !max) {
      res.status(400);
      return next(new Error('请提供 min 和 max 查询参数'));
    }

    const usersInRange = await users.find({
      _id: {
        $gte: ObjectId(min), // ✅ 转换为 ObjectId
        $lte: ObjectId(max),
      },
    });

    res.json(usersInRange);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
