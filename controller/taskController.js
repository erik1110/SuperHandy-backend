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
  }),
  saveDraft: handleErrorAsync(async (req, res, next) => {
    const { title, status, category, description, salary, exposurePlan, imagesUrl, contactInfo, location } = req.body
    const { _id } = req.user || '55665566'
    try {
      newTask = await Task.create({
        userId: _id,
        title,
        status,
        category,
        description,
        salary,
        exposurePlan,
        imagesUrl,
        contactInfo,
        location
      })
    } catch (err) {
      return res.status(404).json({
        message: '40404儲存失敗',
        error: err.errors
      })
    }
    if (!newTask) {
      return res.status(404).json({
        message: '儲存失敗',
        newTask
      })
    }
    res.status(200).json({
      message: '儲存成功',
      newTask
    })
  }),
  publishTask: handleErrorAsync(async (req, res, next) => {
    const { title, status, category, description, salary, exposurePlan, imagesUrl, contactInfo, location } = req.body
    const { _id } = req.user || '55665566'
    try {
      newTask = await Task.create({
        userId: _id,
        title,
        status,
        category,
        description,
        salary,
        exposurePlan,
        imagesUrl,
        contactInfo,
        location
      })
    } catch (err) {
      return res.status(404).json({
        message: '40404儲存失敗',
        error: err.errors
      })
    }
    if (!newTask) {
      return res.status(404).json({
        message: '儲存失敗',
        newTask
      })
    }
    res.status(200).json({
      message: '儲存成功',
      newTask
    })
  })
}

module.exports = tasks
