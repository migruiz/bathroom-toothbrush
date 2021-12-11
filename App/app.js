'use strict';
var fs = require('mz/fs');
var moment = require('moment');
console.log('Hello world');
var cameraVideosFolderLocation = '/videos/';
console.log(new Date().getTime() / 1000);
var currentTimeInSecs = new Date().getTime() / 1000;
//var deleteFilesBefore=currentTimeInSecs-24*60*60;;
var deleteFilesBefore = currentTimeInSecs - 60 * 60;
fs.readdir(cameraVideosFolderLocation, (err, files) => {
    files.forEach(file => {
        var datetimestring = file.slice(0, -4);
        var epoch = moment.utc(datetimestring, "YYYY-MM-DD_HH-mm-ss").valueOf() / 1000;
        if (epoch < deleteFilesBefore) {
            fs.unlinkSync(cameraVideosFolderLocation + file);
        }
    });
});

