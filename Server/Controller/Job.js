const Job = require('../Models/Job')

const createJob = async (req, res) => {
    try {
        const { 
            CompanyName,
            logoUrl,
            JobPosition,
            MonthlySalary,
            JobType,
            LocationType,
            Location,
            JobDescription,
            AboutCompany,
            Skills,
            information,
            
         } = req.body

        if (!CompanyName || !logoUrl     || !JobPosition|| !MonthlySalary || 
            !JobType     || !LocationType|| !Location   || !JobDescription|| 
            !AboutCompany|| !Skills      || !information ) {
            return res.status(400).json({
                errormessage: 'Bad request'
            })
        }
        const userId = req.userId
        
        const JobDetails = new Job({
            CompanyName,
            logoUrl,
            JobPosition,
            MonthlySalary,
            JobType,
            LocationType,
            Location,
            JobDescription,
            AboutCompany,
            Skills,
            information,
            refUserId:userId
        })
        await JobDetails.save()
        res.json({ message: "Job created successfully" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ errormessage: 'Something went wrong!' })
    }
}

module.exports = {createJob}