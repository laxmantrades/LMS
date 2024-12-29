const express=require("express")
const upload=require("../utils/multer")
const {uploadMedia} =require("../utils/cloudinary")

const router=express.Router()
router.route("/upload-video").post(upload.single("file"),async(req,res)=>{
try {
    const result=await uploadMedia(req.file.path)
    res.status(200).json({
        success:true,
        message:"File uploaded Succefully",
        data:result
    })
} catch (error) {
    res.status(500).json({
        success:false,
        message:"Error uploading file"
    })
}
})
module.exports=router