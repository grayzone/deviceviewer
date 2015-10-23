var chart;

function requestSensorData() {
    $.ajax({
        url: '/getsensordata',
        type: 'POST',
        success: function(point) {

            var data = jQuery.parseJSON(point);

            var vavg = parseFloat(data.vavg);
            var iavg = parseFloat(data.iavg);
            var zload = parseFloat(data.zload);
            //        var icf = parseFloat(data.icf);
            var t2 = parseFloat(data.t2);
            //            var time = new Date(eval(data.time)*1000);
            var time = eval(data.time) / 1000000;

            //       var t = new Date(popint)


            var series = chart.series[0];
            shift = series.data.length > 360;

            chart.series[0].addPoint([time, vavg], true, shift);
            chart.series[1].addPoint([time, iavg], true, shift);
            chart.series[2].addPoint([time, zload], true, shift);
            //      chart.series[3].addPoint([time, icf], true, shift);
            chart.series[3].addPoint([time, t2], true, shift);

            setTimeout(requestSensorData, 1);
        },
        cache: false

    });
}


$(document).ready(function() {

    $("#btnstart").click(function() {
        $.ajax({
            url: '/issend',
            type: 'POST',
            async: false,
            //            dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
            data: {
                "issend": true
            },
        }).done(function(output) {
            //           alert(output);
        }).fail(function() {
            console.log("error");
        }).always(function() {
            console.log("complete");
        });

    });

    $("#btnstop").click(function() {
        $.ajax({
            url: '/issend',
            type: 'POST',
            async: false,
            //            dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
            data: {
                "issend": false

            },
        }).done(function(output) {
            //           alert(output);
        }).fail(function() {
            console.log("error");
        }).always(function() {
            console.log("complete");
        });

    });

    $("#btnopenserial").click(function() {
        input = $("#tainput").val();
        $.ajax({
            url: '/openserial',
            type: 'POST',
            async: false,
            //            dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
            data: {

            },
        }).done(function(output) {
            //           alert(output);
        }).fail(function() {
            console.log("error");
        }).always(function() {
            console.log("complete");
        });

    });
    $("#btncloseserial").click(function() {
        input = $("#tainput").val();
        $.ajax({
            url: '/closeserial',
            type: 'POST',
            async: false,
            //            dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
            data: {

            },
        }).done(function(output) {
            //         alert(output);
        }).fail(function() {
            console.log("error");
        }).always(function() {
            console.log("complete");
        });

    });

    $("#btnSend").click(function() {
        input = $("#tainput").val();
        input = input.replace(/\s+/g, '');
        $.ajax({
            url: '/send',
            type: 'POST',
            async: false,
            //            dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
            data: {
                "input": input
            },
        }).done(function(output) {
            $("#taoutput").val(output);
        }).fail(function() {
            console.log("error");
        }).always(function() {
            console.log("complete");
        });

    });



    $("#btngenerate").click(function() {
        //      input = $("#tainput").val();
        $.ajax({
            url: '/generate',
            type: 'POST',
            async: false,
            data: {
                "messageid": $("#messageid").val(),
                "sessionkey": $("#sessionkey").val(),
                "sequence": $("#sequence").val(),
                "deviceid": $("#deviceid").val(),
                "protocolver": $("#protocolver").val(),
                "bbroadcastperiod": $('#cbbroadcastperiod').is(":checked"),
                "broadcastperiodvalue": $("#tbroadcastperiod").val(),
                "isallsensordata": $('#cballsensordata').is(":checked"),
            },
        }).done(function(output) {
            $("#tainput").val(output);
        }).fail(function() {
            console.log("error");
        }).always(function() {
            console.log("complete");
        });

    });


    $("#btnParse").click(function() {
        input = $("#taoutput").val();
        input = input.replace(/\s+/g, '');
        $.ajax({
            url: '/parse',
            type: 'POST',
            async: false,
            data: {
                "response": input
            },
        }).done(function(output) {
            result = jQuery.parseJSON(output);
            //              alert(output);
            //                alert(result);

            $("#response_reason").val(result["reason"]);

            $("#response_messageid").val(result["messageid"]);
            $("#response_deviceid").val(result["deviceid"]);
            $("#response_protocolver").val(result["protocolver"]);
            $("#response_sessionstatus").val(result["sessionstatus"]);
            $("#response_sessiontimeout").val(result["sessiontimeout"]);
            $("#response_messagetimeout").val(result["messagetimeout"]);
            $("#response_maxretrycount").val(result["maxretrycount"]);

            $("#sessionkey").val(result["sessionkey"]);
            $("#sequence").val(result["sequence"]);



            //        $("#tainput").val(output);
        }).fail(function() {
            console.log("error");
        }).always(function() {
            console.log("complete");
        });

    });

    $("#btnupdatesetting").click(function() {
        $.ajax({
            url: '/updatesetting',
            type: 'POST',
            async: false,
            data: {

            },
        }).done(function(output) {
            result = jQuery.parseJSON(output);
            $("#sessionkey").val(result["sessionkey"]);
            $("#sequence").val(result["sequence"]);

            $("#tbroadcastperiod").val(result["sensorbroadcastperiod"]);


            $("#response_messageid").val(result["messageid"]);
            $("#response_deviceid").val(result["deviceid"]);
            $("#response_protocolver").val(result["protocolver"]);
            $("#response_sessionstatus").val(result["sessionstatus"]);
            $("#response_sessiontimeout").val(result["sessiontimeout"]);
            $("#response_messagetimeout").val(result["messagetimeout"]);
            $("#response_maxretrycount").val(result["maxretrycount"]);
            $("#response_devicename").val(result["devicename"]);

        }).fail(function() {
            console.log("error");
        }).always(function() {
            console.log("complete");
        });

    });

    var options = {
        chart: {
            renderTo: 'container',
            type: 'spline',
            events: {
                load: requestSensorData
            }

        },
        title: {
            text: 'Sensor Data'
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        xAxis: {
            type: 'datetime',
            //         tickPixelInterval:1,
            //        maxZoom:360,
            title: {
                text: 'time'
            },
            visible: false,
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L'
            }
        },
        yAxis: [{
            title: {
                text: 'Vavg'
            },
            height: '20%',
            offset: 0,
            lineWidth: 1
        }, {
            title: {
                text: 'Iavg'
            },
            top: '25%',
            height: '20%',
            offset: 0,
            lineWidth: 1
        }, {
            title: {
                text: 'Zload'
            },
            top: '50%',
            height: '20%',
            offset: 0,
            lineWidth: 1
        }, {
            title: {
                text: 'T2'
            },
            top: '75%',
            height: '20%',
            offset: 0,
            lineWidth: 1
        }],
        series: [{
            name: 'Vavg',
            data: [],
            marker: {
                enabled: false
            }
        }, {
            name: 'Iavg',
            data: [],
            yAxis: 1,
            marker: {
                enabled: false
            }
        }, {
            name: 'Zload',
            data: [],
            yAxis: 2,
            marker: {
                enabled: false
            }
        }, {
            name: 'T2',
            data: [],
            yAxis: 3,
            marker: {
                enabled: false
            }
        }]

    };

    chart = new Highcharts.Chart(options);
});