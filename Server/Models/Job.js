const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema(

    {
        CompanyName:{
            type:String,
            required:true
        },
        logoUrl:{
            type:String,
            required:true,
        },
        JobPosition:{
            type:String,
            required:true,
        },
        MonthlySalary:{
            type:String,
            required:true,
        },
        JobType:{
            type:String,
            required:true,
        },
        LocationType:{
            type:String,
            required:true,
        },
        Location:{
            type:String,
            required:true,
        },
        JobDescription:{
            type:String,
            required:true
        },
        AboutCompany:{
            type:String,
            required:true
        },
        Skills:{
            type:Array,
            require:true
        },
        information:{
            type:String,
            require:true
        },
        refUserId:{
            type:String,
            require:true
        },
        
    },
    {timestamps:{createdAt:'createdAt' , updatedAt:'UpdatedAt'}}
);

module.exports = mongoose.model('Job', JobSchema)