const express = require('express');
var path = require("path");
const app = express();

express.static.mime.define({'application/javascript': ['js']});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/html/index.html'));
});

app.listen(8080, () => console.log('Listening on port 8080!'));