const AppiedJob = require('../Models/AppliedJob')
const {decodeToken} = require('../Middlewares/VerifyToken')

const PostAppliedJob =async (req,res,next) =>{
    try {
        
        const { jobId,jobDetails} =req.body
        const userId = decodeToken(req.headers["authorization"]);
        if(!jobId|| !jobDetails|| !userId ){
            return res.status(400).json({
                errormessage: 'Bad request'
            })
        }
        const isJobApplied  = await AppiedJob.find({userId:userId})
       
        if(isJobApplied){
            isJobApplied.map((job)=>{

                if(job?.jobId===jobId && job?.userId === userId ){
                    return res
                    .status(409)
                    .json({ errormessage: 'Job already Applied' })
                }
            })
        }
            const PostAppiedJob= new AppiedJob({
                jobId,
                jobDetails,
                userId
            })
            await PostAppiedJob.save()
            res.json(
                { message: "Job Applied successfully"}
                 )

    } catch (error) {
        next(error)
    }
}
const getAppliedJobsByUserid= async (req,res)=>{
        try {
            const {userId} = req.params
            if(!userId){
                return res.status(400).json({
                    errormessage: 'Bad request'
                })
            }
            const getAppliedjobs = await AppiedJob.find(
                {userId},
                {jobDetails:1}
                )

            res.json({ data: getAppliedjobs})    
        } catch (error) {
            console.log(error)
        }
}


module.exports ={PostAppliedJob,getAppliedJobsByUserid}