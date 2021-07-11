const http = require('http');
const path = require('path');
const fs = require('fs');

var port = 8080;

// Create a http server ================================================================
const server = http.createServer(function(req, res) {

    // Create variable for requested file ----------------------------------------------
    var fileRequest = '.' + req.url;
    if (fileRequest == './') {
        fileRequest = './index.html';
    };
    console.log(`File requested: ${fileRequest}`)

    // Create variable for the requested file extension---------------------------------
    var fileExtension = String(path.extname(fileRequest)).toLowerCase();
    console.log(`File extension: ${fileExtension}`)

    // Create object containing reference for MIME types -------------------------------
    var mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javscript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.ico': 'image/vnd.microsoft.icon'
    };

    // Create variable for the content-type based on MIME reference types ---------------
    if (!fileExtension.slice(1, fileExtension.length)) {
        var fileExtension = '.html';
        var fileRequest = fileRequest + '.html';
        var contentType = 'application/octet-stream';
    } else {
        var contentType = mimeTypes[fileExtension] || 'application/octet-stream';
        console.log(`Appended file ext: ${fileExtension}`)
    };
    console.log(`Content type: ${contentType}`)

    // Create variable for the file path to follow --------------------------------------
    if (fileExtension == '.html') {
        var filePath = '../html' + fileRequest.slice(1, fileRequest.length);
    } else if (fileExtension == '.css') {
        var filePath = '../css' + fileRequest.slice(1, fileRequest.length);
    } else if (fileExtension == '.js') {
        var filePath = '../scripts' + fileRequest.slice(1, fileRequest.length);
    } else if (fileExtension == '.png' || '.jpg' || '.gif') {
        var filePath = '../assets' + fileRequest.slice(1, fileRequest.length);
    } else if (fileExtension == '.ico') {
        var filePath = '../assets/favicon' + fileRequest.slice(1, fileRequest.length);
    } else {
        var filepath = fileRequest;
    };
    console.log(`Appended file path: ${filePath}`)

    // Attempt to read file at location specified ---------------------------------------
    fs.readFile(filePath, function (err, data){
        if (err) { // Reading the file failed............................................
            if (err.code == 'ENOENT') { //The file does not exist........................
                console.log(`Error code: ${err.code}`);
                fs.readFile('../html/404.html', function (err, data) {
                    if (err) { // Couldn't even find the 404 file........................
                        console.log(`404 error: ${err.code}`);
                        res.writeHead(501, {'content-type':'text/plain'});
                        res.end(`Sorry, I haven't found time to even make 404 page...`, 'utf-8');
                    } else { // Deliver the 404 page.....................................
                        res.writeHead(404, {'content-type':'text/html'});
                        res.end(data, 'utf-8');
                    };
                });
            } else { // All other errors.................................................
                res.writeHead(500, {'content-type':'text/plain'});
                res.end(`The server doesn't understand what you are asking for.\nHave to Google error code: ${err.code}`);
            };
        } else { // Found the files, deliver accordingly.................................
            res.writeHead(200, {'content-type': contentType});
            res.end(data, 'utf-8');
        };
    });

});

server.listen(port, function() {
    console.log(`Server started and listening on port: ${port}`)
});