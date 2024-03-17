const Job = require('../Models/Job')

const createJob = async (req, res, next) => {
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
       next(error)
    }
}

const getJobDetails = async (req ,res, next)=>{

    try {
        const { jobId } = req.params

        const JobDetails = await Job.findById(jobId)
        if(!JobDetails){
            return res.status(400).json({
                errormessage: 'Bad request'
            })
        }
        res.json({data:JobDetails})
        
    } catch (error) {
       next(error) 
    }
}

const updateJob = async (req, res, next) => {
    try {
        const { jobId } = req.params;
        const userId = req.userId
        if(!jobId || !userId){
            return resstatus(400).json({errormessage:'bad request'})
        }
        const isJobExist= Job.findOne({_id:jobId, refUserId:userId})

        if(!isJobExist){
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }
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
        
        
        await  Job.updateOne(
            {_id:jobId, refUserId:userId},
            {$set:{
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
            }  
        })
        
        res.json({ message: "Job update successfully" })

    } catch (error) {
       next(error)
    }
}

const getAllJobs = async (req ,res, next)=>{

    try {
        const  CompanyName= req.query.title || "";
        const jobList = await Job.find(
            { CompanyName: { $regex: CompanyName, $options: "i" } },
            {  }
        );
        
        res.json({ data: jobList });
    } catch (error) {
        next(error);
    }
}

module.exports = {createJob , getJobDetails, updateJob,getAllJobs}