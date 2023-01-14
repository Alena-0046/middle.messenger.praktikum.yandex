const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname+'/static'));
app.use(express.static(__dirname+'/dist'));

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
  console.log(`Directory __dirname = ${__dirname}`);
}); 
