const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;
app.use(cors());

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Generate unique filename
  },
});

const upload = multer({ storage: storage });

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static('uploads'));

// Define the API endpoint for file upload
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    // Handle the uploaded file
    const uploadedFilePath = req.file.path;
    console.log('File uploaded:', uploadedFilePath);

    // You can send a response back to the client if needed
    res.json({ message: 'File uploaded successfully', path: uploadedFilePath });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to fetch all files in the 'uploads' folder
app.get('/api/files', (req, res) => {
    try {
        const uploadFolder = path.join(__dirname, 'uploads');
        const files = fs.readdirSync(uploadFolder);
        res.json({ files });
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
