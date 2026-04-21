import express from "express";
import axios from "axios";
import multer from "multer";
import FormData from "form-data";
import fs from "fs";

const router = express.Router();

/* ---------- FILE UPLOAD SETUP ---------- */

const upload = multer({ dest: "uploads/" });


/* ---------- BODY SHAPE AI ---------- */

router.post("/body-shape", async (req, res) => {

  try {

    const response = await axios.post(
      "http://localhost:5000/predict-body",
      req.body
    );

    res.json(response.data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Body Shape AI error"
    });

  }

});


/* ---------- MAKEUP AI ---------- */

router.post("/makeup", upload.single("image"), async (req, res) => {

  try {

    const formData = new FormData();

    formData.append("image", fs.createReadStream(req.file.path));

    const response = await axios.post(
      "http://localhost:5000/makeup-ai",
      formData,
      {
        headers: formData.getHeaders()
      }
    );

    res.json(response.data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Makeup AI error"
    });

  }

});


/* ---------- WARDROBE AI ---------- */

router.post("/wardrobe", upload.single("image"), async (req, res) => {

  try {

    const formData = new FormData();

    formData.append("image", fs.createReadStream(req.file.path));
    formData.append("occasion", req.body.occasion);

    const response = await axios.post(
      "http://localhost:5000/wardrobe-ai",
      formData,
      {
        headers: formData.getHeaders()
      }
    );

    res.json(response.data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Wardrobe AI error"
    });

  }

});


/* ---------- VIRTUAL TRY-ON ---------- */

router.post(
  "/virtual-tryon",
  upload.fields([
    { name: "user" },
    { name: "cloth" }
  ]),
  async (req, res) => {

    try {

      const formData = new FormData();

      formData.append("user", fs.createReadStream(req.files.user[0].path));
      formData.append("cloth", fs.createReadStream(req.files.cloth[0].path));

      const response = await axios.post(
        "http://localhost:5000/virtual-tryon",
        formData,
        {
          headers: formData.getHeaders(),
          responseType: "arraybuffer"
        }
      );

      res.set("Content-Type", "image/jpeg");

      res.send(response.data);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message: "Virtual Try-On error"
      });

    }

  }
);

export default router;
