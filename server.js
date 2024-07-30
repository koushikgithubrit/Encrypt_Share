const express = require('express');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const cors = require('cors');
const zip = require('express-zip');
const fs = require('fs');

// Connect to MongoDB
mongoose.connect('mongodb+srv://koushikadakka2004:Emosort2004@logindatabase.f1qljez.mongodb.net/FileSeeker?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/';
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

const FileSchema = new mongoose.Schema({
    uniqueCode: { type: String, required: true },
    files: [
        {
            path: { type: String, required: true },
            originalName: { type: String, required: true },
            relativePath: { type: String, required: true },
        }
    ],
});

const FileModel = mongoose.model('File', FileSchema);

app.post('/upload', upload.array('files'), async (req, res) => {
    try {
        const files = req.files.map((file, index) => ({
            path: file.path,
            originalName: file.originalname,
            relativePath: req.body.paths[index],
        }));
        const uniqueCode = uuidv4();

        const newFileEntry = new FileModel({
            uniqueCode,
            files,
        });

        await newFileEntry.save();

        res.status(201).json({ uniqueCode });
    } catch (error) {
        res.status(500).json({ error: 'Error uploading files' });
    }
});

app.post('/download', async (req, res) => {
    try {
        const { uniqueCode } = req.body;

        const fileEntry = await FileModel.findOne({ uniqueCode });

        if (!fileEntry) {
            return res.status(404).json({ error: 'Invalid code' });
        }

        const files = fileEntry.files.map(file => ({
            path: file.path,
            name: file.relativePath,
        }));

        res.zip(files, `${uniqueCode}.zip`);
    } catch (error) {
        res.status(500).json({ error: 'Error downloading files' });
    }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'file-uploader-frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'file-uploader-frontend/build', 'index.html'));
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});