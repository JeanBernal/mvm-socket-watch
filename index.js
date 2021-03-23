const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')
const fs = require('fs');
const { watch } = require('fs') ;
const cors = require('cors')



// webpack
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config')

const app = express()
const server = http.createServer(app)
app.set('port', process.env.POR || 3001)
const io = socketIo(server);
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3003"); 
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


app.use(morgan('dev'))
app.use(express.static(__dirname + '/public'))

app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.use(bodyParser.urlencoded({ extended: false }));


server.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
io.on('connection', (socket) =>{
  console.log('client connected', socket.id);
  watch('src/valores.txt', (eventType, filename) => {
      console.log(`event type is: ${eventType}`);
      
      if (filename) {
        console.log(`filename provided: ${filename}`);
        fs.readFile('src/valores.txt', 'utf-8', (error, datos)=>{
            if(error){
                console.log(error)
            }else{
                console.log(datos)
                io.sockets.emit('readingArchive', datos);
            }
        })
        
      } else {
        console.log('filename not provided');
      }
    });
})

