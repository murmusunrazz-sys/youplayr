const express = require("express");
const multer = require("multer");
const fs = require("fs");
const app = express();

const upload = multer({ dest: "temp/" });

app.post("/upload-chunk", upload.single("chunk"), (req, res) => {
  const tempPath = req.file.path;
  const targetPath = "uploads/" + req.body.filename;

  fs.appendFileSync(targetPath, fs.readFileSync(tempPath));
  fs.unlinkSync(tempPath);

  res.send("Chunk received");
});

