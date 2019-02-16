#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const opn = require('opn');
const turbo = require('turbo-http');

const port = process.argv[2] || 5050;
const root = process.argv[3] || '.';

// Check if the port number is valid
if (port < 1024 || port > 65535) {
  console.log(chalk.red('Invalid port number! It should fit in range between 1024 and 65535.'));
  process.exit(1);
} else if (isNaN(port)) {
  console.log(chalk.red(port, 'is not a port number!\nNOTE: If you want to use a custom path, you also need to specify a custom port.'));
  process.exit(1);
}

// Detect content type using file extension
const getTypes = () => {
  return {
    '.avi': 'video/avi',
    '.bmp': 'image/bmp',
    '.css': 'text/css',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.htm': 'text/html',
    '.html': 'text/html',
    '.ico': 'image/x-icon',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.mov': 'video/quicktime',
    '.mp3': 'audio/mpeg3',
    '.mpa': 'audio/mpeg',
    '.mpeg': 'video/mpeg',
    '.mpg': 'video/mpeg',
    '.oga': 'audio/ogg',
    '.ogg': 'application/ogg',
    '.ogv': 'video/ogg',
    '.pdf': 'application/pdf',
    '.png': 'image/png',
    '.tif': 'image/tiff',
    '.tiff': 'image/tiff',
    '.txt': 'text/plain',
    '.wav': 'audio/wav',
    '.xml': 'text/xml'
  };
};

const types = getTypes();

// Set headers
const sendFile = async (res, type, content) => {
  await res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  await res.setHeader('Pragma', 'no-cache');
  await res.setHeader('Expires', '0');
  await res.setHeader('Content-Type', type);
  res.end(content);
};

// Interface for listing the directory's contents
const sendDirListing = (res, files, dirs, requestPath) => {
  requestPath = ('/' + requestPath).replace(/\/+/g, '/');
  const content = `
		<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin-left: 25px; -webkit-font-smoothing: antialiased; font-family: '-apple-system', 'system-ui', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';">
			<h1>Index of <b>${requestPath}</b></h1>
			<ul style="list-style-type: none;">
${
  dirs.map(dir => {
    return '<li>📁 <a href="' + requestPath + dir + '">' + dir + '</a></li>';
  }).join('')
}
${
  files.map(file => {
    return '<li>📄 <a href="' + requestPath + file + '">' + file + '</a></li>';
  }).join('')
}
			</ul>
			<footer style="font-size:14px"><i><a href="https://github.com/xxczaki/fastic">fastic</a> › Serving "${root}" at <a href="#">127.0.0.1:${port}</a></i></footer>
			</body></html>
	`;
  res.end(content);
};

// Directory listing
const listDirectory = async (res, dir, requestPath) => {
  await res.setHeader('Content-Type', 'text/html');
  await res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  await res.setHeader('Pragma', 'no-cache');
  await res.setHeader('Expires', '0');

  fs.readdir(dir, (err, fileNames) => {
    let numRemaining = fileNames.length;
    const files = [];
    const dirs = [];

    fileNames.forEach(name => {
      fs.stat(path.join(dir, name), (err, stat) => {
        if (stat) {
          if (stat.isDirectory()) {
            dirs.push(`${name}/`);
          } else {
            files.push(name);
          }
        }

        if (!--numRemaining) {
          sendDirListing(res, files, dirs, requestPath);
        }
      });
    });
  });
};

// Server
turbo.createServer(async (req, res) => {
  const {method, url} = req;
  let requestPath = decodeURI(url.replace(/^\/+/, '').replace(/\?.*$/, ''));
  const filePath = path.resolve(root, requestPath);
  const type = types[path.extname(filePath)] || 'application/octet-stream';
  // Logger
  fs.stat(filePath, (err, stat) => {
    if (stat && stat.isDirectory()) {
      fs.readFile(filePath + '/index.html', (err, content) => {
        if (err) {
          requestPath = (requestPath + '/').replace(/\/+$/, '/');
          listDirectory(res, filePath, requestPath);
          console.log(`${chalk.green('fastic')} ${chalk.dim('›')}`, `${chalk.cyan(method)}`, `${chalk.yellow.bold(200)}`, url);
        } else {
          sendFile(res, 'text/html', content);
          console.log(`${chalk.green('fastic')} ${chalk.dim('›')}`, `${chalk.cyan(method)}`, `${chalk.yellow.bold(200)}`, url);
        }
      });
    } else {
      fs.readFile(filePath, (err, content) => {
        if (err) {
          console.log(`${chalk.green('fastic')} ${chalk.dim('›')}`, `${chalk.cyan(method)}`, `${chalk.red.bold(404)}`, url);
        } else {
          sendFile(res, type, content);
          console.log(`${chalk.green('fastic')} ${chalk.dim('›')}`, `${chalk.cyan(method)}`, `${chalk.yellow.bold(200)}`, url);
        }
      });
    }
  });
}).listen(port, () => {
  // Notify user about server & open it in browser
  console.log(`${chalk.green('fastic')} ${chalk.dim('›')} Running at ${chalk.cyan('127.0.0.1:' + port)} ${chalk.dim('[opened in browser]')}`);
  console.log('\n=> Press Ctrl + C to stop\n');
  opn(`http://127.0.0.1:${port}`);
});

// Show message, when Ctrl + C is pressed
process.on('SIGINT', () => {
  console.log(`\n${chalk.green('fastic')} ${chalk.dim('›')} Stopped, see you next time!`);
  process.exit(0);
});
