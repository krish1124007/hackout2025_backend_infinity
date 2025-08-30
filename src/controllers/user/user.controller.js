import { User } from "../../models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { returnRespones } from "../../utils/apiresponse.js"
import { isAccountExists } from "../../utils/isexists.js";
import { inngest } from "../../inngest/client.js";
import { OTP } from "../../models/otp.model.js"
import { Help } from "../../models/help.model.js";
import {OptimizationAgent} from "../../ai/findlandengine.js"
import { SUBCD } from "../../ai/subsb.js"

const getProfile = asyncHandler(async(req,res)=>{
    

    const user = await User.findById(req.user._id).select("password");

    if(!user)
    {
        return returnRespones(res , 400 , "user is not exist" , {success:false , data:"user is not exist"})
    }

    return returnRespones(res , 200 , "user found successfully" , {successs:true , data:user})
})

const updateProfile = asyncHandler(async(req,res)=>{
    const updateobject = req.body;

    if(Object.keys(updateobject).length == 0){
        return returnRespones( res, 400, "please send update object", {success:false , data:"please send update object"})
    }

    const user = await User.findByIdAndUpdate(req.user._id , updateobject,{new:true});

    if(!user)
    {
        return returnRespones(res , 400 , "user is not found" , {success:false , data:"user is not found"})
    }

    return returnRespones(res , 200 ,"user update successfully" , {success:true , data:user})
})

const createHelp = asyncHandler(async(req,res)=>{
    const {helpline} = req.body;
    
    if(!helpline)
    {
        return returnRespones(res,400,"please enter helpline" , {success:false , data:"please enter helpline"})
    }

    const help = await Help.create({userId:req.user._id , userdoubt:helpline})

    if(!help)
    {
        return returnRespones(res , 500,"something error to save this query please try again" , {success:false  , data:"something error to save this object please try again"})

    }

    return returnRespones(res,200,"your query is save we are update your question answer on the your register email",{success:true , data:help})
})

const findLand = asyncHandler(async(req,res)=>{
    const {data} = req.body;

    if(!data)
    {
        return returnRespones(res,400,"please Enter data",{success:false, data:"please enter data"})
    }

    const message = `hey i have this requirement ${data}. only return json data`;

    const response = await OptimizationAgent(message);
    const policy = await SUBCD(JSON.parse(response));

    if(!response)
    {
        return returnRespones(res,500,"something problem with the Ai Agent",{success:false , data:"something problem with the ai agent"})
    }

    return returnRespones(res,200,"data fetch successfully",{success:true, data:{
        landoptimizer:JSON.parse(response),
        policy:policy
    }})


})





export {
    createHelp,
    updateProfile,
    getProfile,
    findLand
}