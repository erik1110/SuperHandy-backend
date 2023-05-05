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
      draftModel = await Task.create({
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
    if (!draftModel) {
      return res.status(404).json({
        message: '儲存失敗.'
      })
    }
    res.status(200).json({
      message: '儲存成功',
      data: draftModel
    })
  }),
  getDraft: handleErrorAsync(async (req, res, next) => {
    const taskId = req.params.taskId
    const userId = req.user._id
    console.log('check point userId:', userId)
    if (!taskId) return res.status(404).json({ message: '請傳入taskId' })
    //find task by taskId
    try {
      taskModel = await Task.findOne({ _id: taskId, userId: userId })
      console.log('check point taskModel:', taskModel)
    } catch (err) {
      return res.status(404).json({
        message: '找不到任務',
        error: err.errors
      })
    }
    if (!taskModel) return res.status(404).json({ message: '找不到任務' })
    //check if the task is draft
    if (taskModel.status !== 'draft') return res.status(404).json({ message: '此任務之狀態不可編輯' })
    //return task
    res.status(200).json({
      message: '找到任務',
      data: taskModel
    })
  }),
  updateDraft: handleErrorAsync(async (req, res, next) => {
    const taskId = req.params.taskId
    if (!taskId) return res.status(404).json({ message: '請傳入taskId' })
    //find task by taskId
    try {
    } catch (err) {
      return res.status(404).json({
        message: '40404找不到任務',
        error: err.errors
      })
    }
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
