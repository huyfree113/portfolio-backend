const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const FILE = "data.json";

// GET
app.get("/api/contacts", (req, res) => {

    if (!fs.existsSync(FILE)) return res.json([]);

    const data = fs.readFileSync(FILE);

    res.json(JSON.parse(data));
});

// POST
app.post("/api/contacts", (req, res) => {

    const item = req.body;

    let data = [];

    if (fs.existsSync(FILE)) {
        data = JSON.parse(fs.readFileSync(FILE));
    }

    data.push(item);

    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

    res.json({ success: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on", PORT);
});
