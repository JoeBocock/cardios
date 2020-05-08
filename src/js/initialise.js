window.$ = window.jQuery = require('jquery');
const { shell, remote } = require('electron');
const Store = require('electron-store');
const store = new Store();
const fs = require('fs');
var moment = require('moment');


$(function() {
    M.AutoInit();
    $('#new-note-title').characterCounter();
    $('.tap-target').tapTarget();

    if (!dataManager.checkIfExists('cardioslog')) {
        dataManager.create('cardioslog', dataManager.read('starting_data'));
    }
    cardios.notes = dataManager.get('cardioslog');
    cardios.loadNav();
});
