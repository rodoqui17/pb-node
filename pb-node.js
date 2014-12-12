var http = require('http');
var fs = require('fs');
var request = require('request');
var querystring = require('querystring');

var protocol = 'https';

module.exports = {
  
  listBots: function (options, callback) {
    var path = '/bot/' + options.app_id + '?';
    var qs = querystring.stringify(options.q);
    var params = {
      url: protocol + '://' + options.host + path + qs
    };
    request.get(params, function(error, response, body) {
      if (!error)
        callback(error, response, body);
    });
  },
  
  createBot: function(options, callback) {
    var path = '/bot/' + options.app_id + '/' + options.botname + '?';
    var qs = querystring.stringify(options.q);
    var params = {
      url: protocol + '://' + options.host + path + qs
    };
    request.put(params, function(error, response, body) {
      if (!error)
        callback(error, response, body);
    });
  },

  deleteBot: function(options, callback) {
    var path = '/bot/' + options.app_id + '/' + options.botname + '?';
    var qs = querystring.stringify(options.q);
    var params = {
      url: protocol + '://' + options.host + path + qs
    };
    request.del(params, function(error, response, body) {
      if (!error)
        callback(error, response, body);
    });
  },

  listFiles: function(options, callback) {
    var path = '/bot/' + options.app_id + '/' + options.botname + '?';
    var qs = querystring.stringify(options.q);
    var params = {
      url: protocol + '://' + options.host + path + qs
    };
    if (!options.q.return) {
      request.get(params, function(error, response, body) {
        if (!error)
          callback(error, response, body);
      });
    } else {
      
      fs.truncateSync(options.filename + '.zip', 0);
      request(params.url)
        .pipe(fs.createWriteStream(options.filename + '.zip'))
        .on('close', function () {
          callback('File has been written');
        });
    }
  },

  getFile: function(options, callback) {
    if (options.filename) {
      var path = '/bot/' + options.app_id + '/' + options.botname + '/' + options.filetype + '/' + options.filename + '?';
    } else {
      var path = '/bot/' + options.app_id + '/' + options.botname + '/' + options.filetype + '?';
    }
    var qs = querystring.stringify(options.q);
    var params = {
      url: protocol + '://' + options.host + path + qs
    };
    request.get(params, function(error, response, body) {
      if (!error)
        callback(error, response, body);
    });
  },

  uploadFile: function(options, callback) {
    if (options.filename) {
      var path = '/bot/' + options.app_id + '/' + options.botname + '/' + options.filetype + '/' + options.filename + '?';
    } else {
      var path = '/bot/' + options.app_id + '/' + options.botname + '/' + options.filetype + '?';
    }
    var qs = querystring.stringify(options.q);
    var params = {
      url: protocol + '://' + options.host + path + qs
    };
    fs.stat(options.filepath, function(error, stat) {
      if (error) { throw error; }
      params.headers = { "Content-Length": stat.size };
      fs.createReadStream(options.filepath)
        .pipe(request.put(params, function(error, response, body) {
          if (!error)
            callback(error, response, body);
        }));
    });
  },

  deleteFile: function(options, callback) {
    if (options.filename) {
      var path = '/bot/' + options.app_id + '/' + options.botname + '/' + options.filetype + '/' + options.filename + '?';
    } else {
      var path = '/bot/' + options.app_id + '/' + options.botname + '/' + options.filetype + '?';
    }
    var qs = querystring.stringify(options.q);
    var params = {
      url: protocol + '://' + options.host + path + qs
    };
    request.del(params, function(error, response, body) {
      if (!error)
        callback(error, response, body);
    });
  },

  compileBot: function(options, callback) {
    var path = '/bot/' + options.app_id + '/' + options.botname + '/verify?';
    var qs = querystring.stringify(options.q);
    var params = {
      url: protocol + '://' + options.host + path + qs
    };
    request.get(params, function(error, response, body) {
      if (!error)
        callback(error, response, body);
    });
  },

  talk: function(options, callback) {
    var path = '/talk/' + options.app_id + '/' + options.botname + '?';
    var qs = querystring.stringify(options.q);
    var params = {
      url: protocol + '://' + options.host + path + qs
    };
    request.post(params, function(error, response, body) {
      if (!error)
        callback(error, response, body);
    });
  }

};

