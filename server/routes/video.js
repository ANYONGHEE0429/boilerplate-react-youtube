const express = require("express");
const router = express.Router();
const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(res.status(400).end("only jpg, mp4 is allowed"), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single("file");

//=================================
//             Video
//=================================

router.post("/uploadVideo", (req, res) => {
  // save data into mongodb

    const video = new Video(req.body) //body안에 variable 저장 
    
    video.save((err, doc) => {
        if(err) return res.json({ success: false, err})
        res.status(200).json({success: true})
    })

});

router.post("/", (req, res) => {
    // save video on server
    upload(req, res, (err) => {
      if (err) {
        return res.json({ success: false, err });
      }
      return res.json({
        success: true,
        url: res.req.file.path,
        fileName: res.req.file.filename,
      });
    });
  });

router.post("/thumbnail", (req, res) => {
  // generate thumbnail & bring running time on thumbnail

  let filePath = "";
  let fileDuration = "";

  // bring video information
  ffmpeg.ffprobe(req.body.url, function (err, metadata) {
    ffmpeg.setFfmpegPath("C:\\Program Files\\ffmpg\\bin\\ffmpg.exe")
    console.log(metadata);
    console.log(metadata.format.duration);
    fileDuration = metadata.format.duration;
  });
  // generate thumbnail
  ffmpeg(req.body.url) //클라이언트에서 본 경로
    .on("filenames", function (filenames) {
      console.log("Will generate" + filenames.join(","));
      console.log(filenames);

      filepath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      console.log("Screensshots taken"); //썸네일을 생성을 하고 무엇을 할건지
      return res
        .json({
          success: true,
          url: filePath,
          fileDuration: fileDuration,
        })
        .on("error", function (err) {
          console.log(err);
          return res.json(
            { success: false, err }.screenshots({
              //스크린샷 옵션
              //Will take screenshots at 20%, 40%, 60%, and 80% of the video
              count: 3,
              folder: "uploads/thumbnails",
              size: "320x240",
              //'%b' : input basename ( filename w/o extenstion )
              filename: "thmubnail-%b.png",
            })
          );
        });
    });
});

module.exports = router;
