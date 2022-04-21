var express = require('express');
var cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use((req,res,next)=>{
  console.log(`${req.method}, ${req.path}, ${req.ip}`);
  next();
});


app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.route('/api/fileanalyse')
.post(upload.single('upfile'),(req,res) =>{
  const file = req.file;
  res.json({
    name : file.originalname,
    type : file.mimetype,
    size : file.size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
