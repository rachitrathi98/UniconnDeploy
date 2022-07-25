const mongoose = require("mongoose");

const upload = require("../utils/imageGrid");
const connection = mongoose.connection; //mongoose connection
const Grid = require("gridfs-stream");
const { catchAsync } = require("../utils/utils");


exports.uploadUserPhoto = upload.single("photo");

connection.once("open", () => {
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection("upload");
});

exports.getUserPhoto = catchAsync(async (req, res, next) => {
  var file_id = mongoose.Types.ObjectId(req.params.id);
  //console.log(file_id);

  gfs.files.find({ _id: file_id }).toArray(function (err, files) {
    if (err) {
      res.json(err);
    }
    if (files.length > 0) {
      var read_stream = gfs.createReadStream({ _id: file_id });
      read_stream.pipe(res);
    } else {
      res.json("File Not Found");
    }
  });
  // gfs.files.find().toArray((err, files)=>{
  //   if(!files || files.length ==0){
  //     return res.status(200).json({
  //       success:false,
  //       message:'No files available'
  //     });
  //   }
  //   files.map(file=>{
  //     if(file.contentType==='image/jpeg' ||file.contentType==='image/png'
  //     || file.contentType==='image/svg+xml' ){
  //       console.log(req.body);
  //       file.isImage=true;
  //     }
  //     else{
  //       file.isImage=false;
  //     }
  //   });
  //   res.status(200).json({
  //     success:true,
  //     files,
  //   });

  // });
});

exports.deleteUserPhoto = catchAsync(async (req, res, next) => {
  gfs.remove({ _id: req.params.id, root: "upload" }, (err, gridStore) => {
    if (err) {
      // console.log("hii");
      return res.status(404).json({ err: err });
    }
    // console.log("get user photo delete");
    return res.status(200).json({ done: delete successfuly });
  });
});
