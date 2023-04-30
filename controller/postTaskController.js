const mongoose = require('mongoose')
const { appError, handleErrorAsync } = require('../utils/errorHandler')
const User = require('../models/userModel')
const Task = require('../models/taskModel')
const Validator = require('../service/validator')

const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const geoApiKey = process.env.GEOCODING_KEY

const tasks = {
  checkGeocoding: handleErrorAsync(async (req, res, next) => {
    const { address } = req.query
    const theGeocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${geoApiKey}`
    const geocodingResult = await axios.get(theGeocodingUrl)
    const { status, results } = geocodingResult.data
    if (status === 'OK') {
      const { formatted_address, geometry } = results[0]
      const { location } = geometry
      res.status(200).json({
        formatted_address,
        location
      })
    } else {
      return res.status(404).json({
        message: '查無地址'
      })
    }
  })
}

module.exports = tasks
