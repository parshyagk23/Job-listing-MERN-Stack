const express = require('express')
const router = express.Router()
const JobController = require('../Controller/Job')
const verifyToken = require('../Middlewares/VerifyToken')

router.post('/create',verifyToken, JobController.createJob )
router.get('/job-details/:jobId', JobController.getJobDetails )
router.put('/update/:jobId',verifyToken, JobController.updateJob )
router.get('/all', JobController.getAllJobs )

module.exports = router