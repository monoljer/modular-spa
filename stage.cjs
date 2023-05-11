const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
    origin: '*'
}));


app.use(express.static(__dirname + '/.stage', {
    index: false
  }));
app.get('*', function (_, response) {
    response.sendFile(path.resolve(__dirname, '.stage', 'index.html'));
  });

app.listen(port);
console.log('Server started at http://localhost:' + port);
