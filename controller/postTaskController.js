const mongoose = require('mongoose')
const { appError, handleErrorAsync } = require('../utils/errorHandler')
const User = require('../models/userModel')
const Task = require('../models/taskModel')
const Validator = require('../service/validator')
const geocoding = require('../utils/geocoding')

const tasks = {
  checkGeocoding: handleErrorAsync(async (req, res, next) => {
    const { address } = req.query
    const geocodingResult = await geocoding(address)
    if (geocodingResult.status === 'OK') {
      return res.status(200).json(geocodingResult)
    } else {
      return res.status(404).json(geocodingResult)
    }
  })
}

module.exports = tasks
