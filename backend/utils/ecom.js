const sendToken = (user,statusCode,res)=>{
// get token
    const token = user.getECOMToken();
    res.status(statusCode).json({
        success:true,
        token,
        user
    })
}
module.exports=sendToken