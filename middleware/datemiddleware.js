const Datemidlleware = (req,res,next)=>{
    try{
        let date = new Date().toISOString();
        req.body.date=date;
        next();
    }catch(error){
        res.status(400).json({"msg":"An Error Occured"})
    }
}

module.exports={Datemidlleware}