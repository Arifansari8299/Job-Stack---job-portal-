import { Job } from "../models/job.model.js";

// admin will post the job
export const postJob = async ( req, res) => {
try{
    const { title, description, requirement, salary, location, jobType, experience, position, companyId }  = req.body; 
    console.log(req.body);
    const userId = req.id;

    if(!title || !description || !requirement || !salary || !location || !jobType || !experience || !position || !companyId){
        return res.status(400).json({
            message:"Something is missing",
            success:false
        })
    };
    const job = await Job.create({
        title,
        description,
        requirements:requirement.split("."),
        salary:Number(salary),
        location,
        jobType,
        experienceLevel:experience,
        position,
        company:companyId,
        created_by:userId
        
    });
    return res.status(201).json({
        message: "New job created successfully.",
        job,
        success:true
    })
}
catch(error){
    console.log(error)
}
}