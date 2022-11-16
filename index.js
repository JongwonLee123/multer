const express = require("express");
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const multer = require('multer');
const port = 3000;

const app = express();

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) =>{
  res.render('start');
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads')
  },
  filename: (req, file, cb)=> {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  }
})

var upload = multer({ storage: storage });
  
app.use(express.static(__dirname + '/views'));
app.use('/uploads', express.static('uploads'));

app.post('/profile-upload-single', upload.single('image'), function (req, res, next) {
  console.log(JSON.stringify(req.file))
  var response = '<a href="/">Home</a><br>'
  response += "Files uploaded successfully.<br>"
  response += `<img src="${req.file.path}" /><br>`
  return res.send(response)
})

app.listen(port,() => console.log(`Server running on port ${port}!`))
