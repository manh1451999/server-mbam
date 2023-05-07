var dotenv = require('dotenv').config()
var express = require('express')
var bodyParser = require('body-parser')
// var cookieParser = require('cookie-parser')
const cors = require('cors');


var authMiddleware = require('./middleware/auth.middleware')


// var test = require('./test.js')



var proxyFreeRouters = require('./routes/proxy.route')
var mailRouters = require('./routes/mail.route');
const { default: axios } = require('axios');
// const { proxyCron } = require('./cron/proxy.cron');




var app = express()
var port = process.env.PORT || 8080;


app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// app.use(cookieParser(process.env.SESSION_SECRET))
app.use(cors());
app.use(express.static('public'))


app.use(cors({
  // origin: 'http://127.0.0.1:5500', //Chan tat ca cac domain khac ngoai domain nay
  credentials: true //Để bật cookie HTTP qua CORS
}))


app.get('/', function (req, res) {
  res.json("server mbam")
})

app.get('/checkip', async function(req, res){
  try{
    const response = await axios.get('http://ip-api.com/json')
    return res.status(200).send(response?.data)
  }catch(err){
    return res.status(400).send(err)
  }
})

// app.use('/proxy', authMiddleware.isAuth, proxyFreeRouters);
app.use('/proxy',proxyFreeRouters);
app.use('/mail', mailRouters);

// proxyCron()


app.listen(port, () => console.log('Server is listening on port ' + port))
const env = process.env.NODE_ENV || 'development';
if (env == 'development') {

  const https = require("https");
  const fs = require("fs-extra");
  const options = {
    key: fs.readFileSync("./https/cert.key"),
    cert: fs.readFileSync("./https/cert.crt"),
  };
  https.createServer(options, app).listen(8000, () => {
    console.log(`HTTPS server started on port 8000`);
  });
} 