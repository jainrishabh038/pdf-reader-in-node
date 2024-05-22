const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const app = express();
const port = 5000;

app.use(express.static('public'));
app.set('view engine', 'ejs');

const upload = multer({ dest: 'uploads/' });

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/upload', upload.single('pdf'), async (req, res) => {
  const filePath = req.file.path;
  try {
    const dataBuffer = await fs.promises.readFile(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const jsonResponse = {
      content: pdfData.text,
    };

    console.log(jsonResponse);
    res.json(jsonResponse);
  } catch (error) {
    console.error('Error parsing PDF:', error);
    res.status(500).send('Error parsing PDF');
  } finally {
    fs.unlink(filePath, (err) => {
      if (err) console.error('Error deleting uploaded file:', err);
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
