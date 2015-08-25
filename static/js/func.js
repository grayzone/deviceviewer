$(document).ready(function() {
    $("#btnSend").click(function(){
        input = $("#tainput").val();
        $.ajax({
            url: '/send',
            type: 'POST',
            async : false,
//            dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
            data: {"input": input},
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

    $("#btngenerate").click(function(){
  //      input = $("#tainput").val();
        $.ajax({
            url: '/generate',
            type: 'POST',
            async : false,
            data: {"messageid": $("#messageid").val(),
                    "sessionkey": $("#sessionkey").val(),
                    "sequence": $("#sequence").val()},
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


});