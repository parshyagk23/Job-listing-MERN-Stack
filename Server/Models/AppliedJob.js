const mongoose = require('mongoose')

const AppiedJobSchema = new  mongoose.Schema(

    {
        jobId:{
            type:String,
            require:true
        },
        jobDetails:{
            type:Object,
            require:true
        },
        userId:{
            type:String,
            require:true
        }
    },
    {timestamps:{createdAt:'createdAt' , updatedAt:'UpdatedAt'}}
)

module.exports = mongoose.model("AppliedJob",AppiedJobSchema)