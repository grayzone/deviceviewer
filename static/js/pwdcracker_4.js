phantom.outputEncoding = "GBK";
var casper = require('casper').create();
var utils = require('utils');
var fs = require('fs');
var cssResources = [];
var imgResources = [];
var fontResources = [];
var resourceDirectory = "resources";
var debug = false;

var url = "http://127.0.0.1:8080";

function key(num) {
    casper.echo(num);
    var t = 4000;
    switch (num) {
        case 1:
            casper.wait(t, function() {
                if (casper.exists('#btnpwdkey1')) {
                    casper.echo('find the key 1.');
                    casper.click('#btnpwdkey1');
                    casper.echo('click the key 1');
                }

            });
            break;
        case 2:
            casper.wait(t, function() {
                if (casper.exists('#btnpwdkey2')) {
                    casper.echo('find the key 2.');
                    casper.click('#btnpwdkey2');
                    casper.echo('click the key 2');
                }

            });

            break;
        case 3:
            casper.wait(t, function() {
                if (casper.exists('#btnpwdkey3')) {
                    casper.echo('find the key 3.');
                    casper.click('#btnpwdkey3');
                    casper.echo('click the key 3');
                }

            });
            break;
        case 4:
            casper.wait(t, function() {
                if (casper.exists('#btnpwdkey4')) {
                    casper.echo('find the key 4.');
                    casper.click('#btnpwdkey4');
                    casper.echo('click the key 4');
                }

            });
            break;
        default:


    }


}

function keyenter() {
    casper.wait(3000, function() {
        if (casper.exists('#btnpwdenter')) {
            casper.echo('find the key enter.');
            casper.click('#btnpwdenter');
            casper.echo('click the key enter');
        }
    });

}

casper.start(url, function() {



});

casper.each([1, 2, 3, 4], function(self1, link1) {
    self1.then(function() {
        casper.each([1, 2, 3, 4], function(self2, link2) {

            self2.then(function() {
                casper.each([1, 2, 3, 4], function(self3, link3)) {
                    self3.then(function() {
                        key(link1);
                        key(link2);
                        key(link3);
                    });
                    casper.then(function() {
                        keyenter();
                    });

                }

            })

        });

    });

});







casper.run();