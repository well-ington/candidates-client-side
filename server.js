const path = require('path');
const express = require('express');
 
const app = express();
 
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);
 
app.listen(app.get('port'));