var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
});

app.get("/api/timestamp/:date?", function (req, res) {
  // create date variable that adds whatever date is in URL
  // if no date, add current date
  let date = req.params.date ? new Date(req.params.date) : new Date();

  if (/\d{5,}/.test(req.params.date)) {
      res.json({unix: req.params.date, utc: new Date(parseInt(req.params.date)).toUTCString() });
    }
// if invalid ISO, check unix format
else if (date.toUTCString() === "Invalid Date") {
  // date = new Date(parseInt(req.params.date_string));

  res.json({error: "Invalid Date"});
}
 else {
  res.json({unix: date.valueOf(), utc: date.toUTCString()});
}
});


// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
