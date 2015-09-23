<!DOCTYPE html>
<html>
  <head>
    <title>Device Viewer</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <script type="text/javascript" src="../static/js/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="../static/js/func.js"></script>
  </head>
  <body>
    <div hidden>
    <a>Serial:</a>
    <button id="btnopenserial">Open</button>
    <button id="btncloseserial">Close</button><br>
    <a>Send Message</a>
    <button id="btnstart">Start</button>
    <button id="btnstop">Stop</button><br>
    </div>

    <div>
      <a>Request</a><br>
      <a>Device ID:</a>
      <select name="deviceid" id="deviceid">
        <option value="00">ForceTriad Generator</option>
        <option value="01">Valleylab Exchange</option>
        <option value="D8" selected="true">Service Apps</option>
      </select>
      <a>Protocol Version:</a>
      <select name="protocolver" id="protocolver">
        <option value="10023">Patriot</option>
        <option value="10024">Triad</option>
        <option value="10025" selected="true">Test</option>
      </select>
      <select name="messageid" id="messageid">
        <option value="11">RequestSession</option>
        <option value="00">KeepAlive</option>
        <option value="2D">GetRunTime</option>
        <option value="1D">DeviceNameRequest</option>
        <option value="5A">GetVersionsRequest</option>
      </select>
      <button id="btngenerate">Generate</button><br>

      <a>Session Key:</a><input type="text" name="sessionkey" id="sessionkey" value="FF">
      <a>Sequence Number:</a><input type="text" name="sequence" id="sequence" value="0">
           
      <button id="btnkeepalive" hidden>KeepAlive</button>
      <button id="btnupdatesetting" >Update</button>
      <br>

      <textarea rows = "8" cols="100" id="tainput"></textarea><button id="btnSend">Send</button><br>
      <textarea rows = "8" cols="100" id="taoutput">024646313132303020202020202020202952402020202020202020235a202020202f48202020202320202020202020202020204537303703</textarea>
      <button id="btnParse">Parse</button><br>

    </div>
    <div>
      <a>Response:reason<input type="text" name="response_reason" id="response_reason" readonly="true"></a><br>

      <a>Session Key:</a><input type="text" name="response_sessionkey" id="response_sessionkey" readonly="true"><br>
      <a>Sequence Number:</a><input type="text" name="response_sequence" id="response_sequence" readonly="true"><br>
      <a>Message ID:</a><input type="text" name="response_messageid" id="response_messageid" readonly="true"><br>
      <a>Device ID:</a><input type="text" name="response_deviceid" id="response_deviceid" readonly="true"><br>
      <a>Protocal Version:</a><input type="text" name="response_protocolver" id="response_protocolver" readonly="true"><br>
      <a>Session Status:</a><input type="text" name="response_sessionstatus" id="response_sessionstatus" readonly="true"><br>
      <a>Session Timeout:</a><input type="text" name="response_sessiontimeout" id="response_sessiontimeout" readonly="true"><br>
      <a>Message Timeout:</a><input type="text" name="response_messagetimeout" id="response_messagetimeout" readonly="true"><br>
      <a>Max Retry Count:</a><input type="text" name="response_maxretrycount" id="response_maxretrycount" readonly="true"><br>
      <a>Device Name:</a><input type="text" name="response_devicename" id="response_devicename" readonly="true"><br>
      
    </div>
  </body>
</html>