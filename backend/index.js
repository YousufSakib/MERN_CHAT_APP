const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/signup", async (req, res) => {
    const { username, secret, email, first_name, last_name } = req.body;
  
    // Store a user-copy on Chat Engine!
    try {
      const r = await axios.post(
        "https://api.chatengine.io/users/",
        { username, secret, email, first_name, last_name },
        { headers: { "Private-Key": "d0c8a472-b68f-4f9f-8e06-f1c3c824e2b8" } }
      );
      return res.status(r.status).json(r.data);
    } catch (e) {
      return res.status(e.response.status).json(e.response.data);
    }
  });
  app.post("/login", async (req, res) => {
    const { username, secret } = req.body;
  
    // Fetch this user from Chat Engine in this project!
    try {
      const r = await axios.get("https://api.chatengine.io/users/me/", {
        headers: {
          "Project-ID": "ef7a7202-df68-4db4-94a6-400f04193abd",
          "User-Name": username,
          "User-Secret": secret,
        },
      });
      return res.status(r.status).json(r.data);
    } catch (e) {
      return res.status(e.response.status).json(e.response.data);
    }
  });
app.listen(3001);