var application_root = __dirname,
    path = require('path'),
    fs = require('fs'),
    express = require('express'),
    app = express(),
    _ = require('underscore'),
    lists = {},
    routes = require('./routes/rest')(app, lists, _)
    port = process.env.PORT || 8080;


// populate lists with any json files in ./lists
fs.readdirSync("./lists").forEach(function(listName) {
  var isJson = listName.indexOf('.json', listName.length - 5) !== -1;
  if(!isJson) return;
  var list = require("./lists/" + listName);

  // support naked arrays or actual sp2010 rest scrapes
  if(list.d && list.d.results) list = list.d.results;

  lists[listName.replace('.json', '')] = list;
});

app.configure(function () {

  // remove trailing slashes
  app.use(function(req, res, next) {
    if(req.url.substr(-1) == '/' && req.url.length > 1) 
      req.url.slice(0, -1);
    next();
  });

  // separate list name and id for easier routing
  // :listName(:id) -> :listName/:id
  app.use(function(req, res, next) {
    var re = /_vti_bin\/listData.svc\/([^\(\/]+)\((\d+)\)/i;
    var match = req.url.match(re);
      if(match) req.url = '/_vti_bin/listData.svc/' + match[1] + '/' + match[2];
    next();
  });

  // for development we make sure nothing is cached
  app.use(function(req, res, next) {
    res.header('Cache-Control', 'no-cache');
    next();
  });
  app.use(express.bodyParser());
  // support _method (PUT in forms etc)
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, 'public')));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.listen(port);