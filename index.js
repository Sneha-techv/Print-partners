const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express()
const port = 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.filename + "-" + Date.now() + path.extname(file.originalname)
    );
    },
});
const upload = multer({ storage });

app.use(express.static(__dirname));

// routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send(`file uploaded:  ${req.file.filename}`);
})

app.listen(port, () => {
    console.log(`server is running at port ${port}`);
})