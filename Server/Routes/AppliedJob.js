const express = require('express')
const router = express.Router()
AppliedJobController = require('../Controller/AppliedJob')
const {verifyToken}  = require('../Middlewares/VerifyToken')
router.post('/createjobapplied',verifyToken,AppliedJobController?.PostAppliedJob)
router.get('/getjobapplied/:userId',verifyToken,AppliedJobController?.getAppliedJobsByUserid)

module.exports = router
