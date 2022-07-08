const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
    cb(null,'uploads')
   },
   filename: (req, file, cb)=>{
    cb(null,Date.now()+'_'+file.originalname)
   }
})

app.post('/single_img_upload', async(req,res) =>{
    const upload = await multer({storage:storage}).single('file')
    // console.log("received file",req.file.filename)
    console.log("Received data",req.toString());
    let data = req.toString()
    console.log(JSON.stringify(data))
    upload(req,res, function (err){
      if (!req.file){
           res.send('Please select an image to upload');
      }else if (err instanceof multer.MulterError){
         res.send("multer Error",err.message);
      }else if (err) {
         res.send(err.message);
      }else{
          console.log(req.file.filename)
        //    return res.send({status:true,message:"file uploaded succesfully!!!" ,filepath:`http://localhost:5001/uploads/${req.file.filename}`,data});
        return res.send({status:true,message:"file uploaded succesfully!!!" ,filepath:`http://localhost:5001/uploads/${req.file.filename}`});

      } 
    })
})

app.post('/multiple_img_upload', async(req,res) =>{
    const upload = await multer({storage:storage}).array('files')

    upload(req,res, function (err){
        console.log(req.files);
      if (!req.files){
          return res.send('Please select an image to upload');
      }else if (err instanceof multer.MulterError){
        return res.send("multer Error",err.message);
      }else if (err) {
        return res.send(err.message);
      }else{
          console.log(req.files)
          var l = "file uploaded succesfully!!! \n";
          
          for (const file of req.files) {  
              l = l+ `http://localhost:5001/uploads/${file.filename} \n`;
            console.log(`http://localhost:5001/uploads/${file.filename}`)
          }

          return res.send(l);
          
      } 
    })
})


app.listen(5001, ()=>{
    console.log("Server started at port 5001");
})