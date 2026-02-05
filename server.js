const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const FILE = "data.json";

// GET
app.get("/api/contacts", (req, res) => {

    try {

        if (!fs.existsSync(FILE)) {
            return res.json([]);
        }

        const data = fs.readFileSync(FILE, "utf8");

        if (!data.trim()) {
            return res.json([]);
        }

        const json = JSON.parse(data);

        res.json(json);

    } catch (err) {

        console.error("JSON ERROR:", err);

        // Reset file nếu hỏng
        fs.writeFileSync(FILE, "[]");

        res.json([]);
    }
});


// POST
app.post("/api/contacts", (req, res) => {

    try {

        const item = req.body;

        let data = [];

        if (fs.existsSync(FILE)) {

            const raw = fs.readFileSync(FILE, "utf8");

            if (raw.trim()) {
                data = JSON.parse(raw);
            }
        }

        data.push(item);

        fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

        res.json({ success: true });

    } catch (err) {

        console.error("WRITE ERROR:", err);

        res.status(500).json({ error: "Server error" });
    }
});
