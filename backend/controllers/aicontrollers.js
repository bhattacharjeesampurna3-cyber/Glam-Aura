import axios from "axios";
import FormData from "form-data";
import fs from "fs";

export const getSkinTone = async (req, res) => {

  const form = new FormData();
  form.append("image", fs.createReadStream(req.file.path));

  const response = await axios.post(
    "http://localhost:8000/skin-tone",
    form,
    { headers: form.getHeaders() }
  );

  res.json(response.data);
};

export const getBodyShape = async (req, res) => {

  const response = await axios.post(
    "http://localhost:8000/body-shape",
    req.body
  );

  res.json(response.data);
};