// Import Node url module
const url = require('url')
const qs = require('querystring')

// Define a string constant concatenating strings
const content_root = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>ECE Home</title>' +
'    </head>' + 
'    <body>' +
'       <p>Hello World!</p>' +
        '<p>If you want to have a chat click here </p>' +
        '<a href="/hello?name=Nathan">CHAT</a>' +
'    </body>' +
'</html>'


module.exports = {
  serverHandle : function (req, res) {
    const route = url.parse(req.url)
    const path = route.pathname 
    const params = qs.parse(route.query)

    
  
    if (path === '/') {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(content_root)
    } else if (path === '/hello') {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write('Ibrahim : Hello you are ' + params['name'] + ' right?\n')
      res.write(params['name'] + ' : Yes, How are you doing?\n')
      res.write('Ibrahim : I am doing fine, thank you for asking\n')
    }
    else {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('Error 404: Page not found')
    }
    
    res.end();
  }
}