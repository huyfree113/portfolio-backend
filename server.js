const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const FILE = "data.json";

// ===== GET =====
app.get("/api/contacts", (req, res) => {
    try {

        if (!fs.existsSync(FILE)) {
            fs.writeFileSync(FILE, "[]");
            return res.json([]);
        }

        let raw = fs.readFileSync(FILE, "utf8").trim();

        if (!raw) {
            fs.writeFileSync(FILE, "[]");
            return res.json([]);
        }

        let data = JSON.parse(raw);

        res.json(data);

    } catch (err) {

        console.error("RESET JSON:", err);

        fs.writeFileSync(FILE, "[]");

        res.json([]);
    }
});


// ===== POST =====
app.post("/api/contacts", (req, res) => {
    try {

        let list = [];

        if (fs.existsSync(FILE)) {

            let raw = fs.readFileSync(FILE, "utf8").trim();

            if (raw) {
                list = JSON.parse(raw);
            }
        }

        list.push(req.body);

        fs.writeFileSync(FILE, JSON.stringify(list, null, 2));

        res.json({ success: true });

    } catch (err) {

        console.error("WRITE ERROR:", err);

        fs.writeFileSync(FILE, "[]");

        res.status(500).json({ error: "Server error" });
    }
});


// ===== PORT =====
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(PORT, () => {
    console.log("Server running on", PORT);
});
