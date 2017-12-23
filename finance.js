var express = require('express');
var app = express();
app.use('/', express.static(__dirname + '/client'));
/*app.use('/', express.static(__dirname + '/dist'));*/

var port = process.env.PORT || 8081;

app.listen(port, function () {
    console.log('Finance webapp...listening on port %d!', this.address().port);
});