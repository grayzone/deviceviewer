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

function key1() {

    casper.wait(4000, function() {
        if (casper.exists('#btnpwdkey1')) {
            casper.echo('find the key 1.');
            casper.click('#btnpwdkey1');
            casper.echo('click the key 1');
        }

    });
}


function key2() {

    casper.wait(4000, function() {
        if (casper.exists('#btnpwdkey2')) {
            casper.echo('find the key 2.');
            casper.click('#btnpwdkey2');
            casper.echo('click the key 2');
        }

    });
}

function key3() {

    casper.wait(4000, function() {
        if (casper.exists('#btnpwdkey3')) {
            casper.echo('find the key 3.');
            casper.click('#btnpwdkey3');
            casper.echo('click the key 3');
        }

    });
}

function key4() {

    casper.wait(4000, function() {
        if (casper.exists('#btnpwdkey4')) {
            casper.echo('find the key 4.');
            casper.click('#btnpwdkey4');
            casper.echo('click the key 4');
        }

    });
}


function keyenter() {
    casper.wait(4000, function() {
        if (casper.exists('#btnpwdenter')) {
            casper.echo('find the key enter.');
            casper.click('#btnpwdenter');
            casper.echo('click the key enter');
        }

    });

}

casper.start(url, function() {

    key1();
    key1();
    key1();
    keyenter();

});

casper.then(function() {

    key1();
    key2();
    key1();
    keyenter();
});

casper.then(function() {

    key1();
    key3();
    key1();
    keyenter();
});

casper.then(function() {

    key1();
    key4();
    key1();
    keyenter();
});

casper.then(function() {

    key1();
    key1();
    key2();
    keyenter();
});

casper.then(function() {

    key1();
    key2();
    key2();
    keyenter();
});

casper.then(function() {

    key1();
    key3();
    key2();
    keyenter();
});

casper.then(function() {

    key1();
    key4();
    key2();
    keyenter();
});

casper.then(function() {

    key1();
    key1();
    key3();
    keyenter();
});

casper.then(function() {

    key1();
    key2();
    key3();
    keyenter();
});

casper.then(function() {

    key1();
    key3();
    key3();
    keyenter();
});

casper.then(function() {

    key1();
    key4();
    key3();
    keyenter();
});

casper.then(function() {

    key1();
    key1();
    key4();
    keyenter();
});

casper.then(function() {

    key1();
    key2();
    key4();
    keyenter();
});

casper.then(function() {

    key1();
    key3();
    key4();
    keyenter();
});

casper.then(function() {

    key1();
    key4();
    key4();
    keyenter();
});

casper.then(function() {

    key2();
    key1();
    key1();
    keyenter();
});

casper.then(function() {

    key2();
    key1();
    key2();

    keyenter();
});

casper.then(function() {

    key2();
    key1();
    key3();
    keyenter();
});

casper.then(function() {

    key2();
    key1();
    key4();
    keyenter();
});

casper.then(function() {

    key2();
    key2();
    key1();
    keyenter();
});

casper.then(function() {

    key2();
    key2();
    key2();

    keyenter();
});

casper.then(function() {

    key2();
    key2();
    key3();
    keyenter();
});

casper.then(function() {

    key2();
    key2();
    key4();
    keyenter();
});

casper.then(function() {

    key2();
    key3();
    key1();
    keyenter();
});

casper.then(function() {

    key2();
    key3();
    key2();

    keyenter();
});

casper.then(function() {

    key2();
    key3();
    key3();
    keyenter();
});

casper.then(function() {

    key2();
    key3();
    key4();
    keyenter();
});

casper.then(function() {

    key2();
    key4();
    key1();
    keyenter();
});

casper.then(function() {

    key2();
    key4();
    key2();

    keyenter();
});

casper.then(function() {

    key2();
    key4();
    key3();
    keyenter();
});

casper.then(function() {

    key2();
    key4();
    key4();
    keyenter();
});

casper.then(function() {

    key3();
    key1();
    key1();
    keyenter();
});

casper.then(function() {

    key3();
    key1();
    key2();
    keyenter();
});

casper.then(function() {

    key3();
    key1();
    key3();
    keyenter();
});

casper.then(function() {

    key3();
    key1();
    key4();
    keyenter();
});

casper.then(function() {

    key3();
    key2();
    key1();
    keyenter();
});

casper.then(function() {

    key3();
    key2();
    key2();
    keyenter();
});

casper.then(function() {

    key3();
    key2();
    key3();
    keyenter();
});

casper.then(function() {

    key3();
    key2();
    key4();
    keyenter();
});

casper.then(function() {

    key3();
    key3();
    key1();
    keyenter();
});

casper.then(function() {

    key3();
    key3();
    key2();
    keyenter();
});

casper.then(function() {

    key3();
    key3();
    key3();
    keyenter();
});

casper.then(function() {

    key3();
    key3();
    key4();
    keyenter();
});

casper.then(function() {

    key3();
    key4();
    key1();
    keyenter();
});

casper.then(function() {

    key3();
    key4();
    key2();
    keyenter();
});

casper.then(function() {

    key3();
    key4();
    key3();
    keyenter();
});

casper.then(function() {

    key3();
    key4();
    key4();
    keyenter();
});

casper.then(function() {

    key4();
    key1();
    key1();
    keyenter();
});

casper.then(function() {

    key4();
    key1();
    key2();
    keyenter();
});

casper.then(function() {

    key4();
    key1();
    key3();
    keyenter();
});

casper.then(function() {

    key4();
    key1();
    key4();
    keyenter();
});

casper.then(function() {

    key4();
    key2();
    key1();
    keyenter();
});

casper.then(function() {

    key4();
    key2();
    key2();
    keyenter();
});

casper.then(function() {

    key4();
    key2();
    key3();
    keyenter();
});

casper.then(function() {

    key4();
    key2();
    key4();
    keyenter();
});

casper.then(function() {

    key4();
    key3();
    key1();
    keyenter();
});

casper.then(function() {

    key4();
    key3();
    key2();
    keyenter();
});

casper.then(function() {

    key4();
    key3();
    key3();
    keyenter();
});

casper.then(function() {

    key4();
    key3();
    key4();
    keyenter();
});

casper.then(function() {

    key4();
    key4();
    key1();
    keyenter();
});

casper.then(function() {

    key4();
    key4();
    key2();
    keyenter();
});

casper.then(function() {

    key4();
    key4();
    key3();
    keyenter();
});

casper.then(function() {

    key4();
    key4();
    key4();
    keyenter();
});


casper.run();