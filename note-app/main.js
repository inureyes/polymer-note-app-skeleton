var express = require('express');
var noteapp = express();
var bodyParser = require('body-parser');
var rest_api = require('./routes/rest_api')

noteapp.use(bodyParser.json()); // for parsing noteapplication/json
//noteapp.use(/^((?!.*abc).*)/, express.static(__dirname + '/'));
noteapp.use('/', express.static(__dirname + '/'));
noteapp.use('/memories', express.static(__dirname + '/'));
noteapp.use('/monthly', express.static(__dirname + '/'));
noteapp.use('/write', express.static(__dirname + '/'));

noteapp.all('/api/add', function (req, res, next) {
  console.log('Add API is called...');
  api = new rest_api();
  result = api.write(req);
  if (result) {
    res.json({success: true})
  }
});

noteapp.all('/api/list', function (req, res, next) {
  console.log('List API is called...');
  api = new rest_api();
  api.list(req, res);
});

noteapp.listen(3000, function () {
  console.log('Example noteapp listening on port 3000!');
});


const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: 'localhost:3000',
    protocol: 'http:',
    slashes: true
  }))

  // Open the DevTools.
  //win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
