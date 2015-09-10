$(document).ready(function() {

    $("#btnstart").click(function() {
        $.ajax({
                url: '/issend',
                type: 'POST',
                async: false,
                //            dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: {
                   "issend":true
                },
            })
            .done(function(output) {
     //           alert(output);
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
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
                    "issend":false
                   
                },
            })
            .done(function(output) {
     //           alert(output);
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
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
            })
            .done(function(output) {
     //           alert(output);
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
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
            })
            .done(function(output) {
       //         alert(output);
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
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
            })
            .done(function(output) {
                $("#taoutput").val(output);
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
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
                },
            })
            .done(function(output) {
                $("#tainput").val(output);
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });

    });

        $("#btnkeepalive").click(function() {
        //      input = $("#tainput").val();
        $.ajax({
                url: '/keepalive',
                type: 'POST',
                async: false,
                data: {
       //             "messageid": $("#messageid").val(),
       //             "sessionkey": $("#sessionkey").val(),
       //             "sequence": $("#sequence").val(),
       //             "deviceid": $("#deviceid").val(),
//                    "protocolver": $("#protocolver").val(),
                },
            })
            .done(function(output) {
                $("#response_reason").val(output);
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
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
            })
            .done(function(output) {
                result = jQuery.parseJSON(output);
  //              alert(output);
//                alert(result);

                $("#response_reason").val(result["reason"]);
                $("#response_sessionkey").val(result["sessionkey"]);
                $("#response_sequence").val(result["sequence"]);
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
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });

    });

    $("#btnupdatesession").click(function() {
        $.ajax({
                url: '/updatesession',
                type: 'POST',
                async: false,
                data: {
                   
                },
            })
            .done(function(output) {
                result = jQuery.parseJSON(output);
                $("#sessionkey").val(result["sessionkey"]);
                $("#sequence").val(result["sequence"]);

            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });

    });


});