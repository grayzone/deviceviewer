<!DOCTYPE html>
<html>
  <head>
    <title>Device Viewer</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <script type="text/javascript" src="../static/js/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="../static/js/func.js"></script>
  </head>
  <body>
    <div>
      <a>Message</a><br>
      <a>Device ID:</a><input type="text" name="deviceid" id="deviceid" value="01">
      <a>Protocol ID:</a><input type="text" name="deviceid" id="deviceid" value="01">
      
      <a>Session Key:</a><input type="text" name="sessionkey" id="sessionkey" value="FF">
      <a>Sequence Number:</a><input type="text" name="sequence" id="sequence" value="0"><br>
      
      
      <select name="messagetype" id="messagetype">
        <option value="11">RequestSession</option>
      </select>
      <a>Message ID:</a><input type="text" name="messageid" id="messageid" value="11">
      <button id="btngenerate">Generate</button><br>
      <textarea rows = "8" cols="100" id="tainput"></textarea><button id="btnSend">Send</button><br>
      <textarea rows = "8" cols="100" id="taoutput"></textarea>
    </div>
  </body>
</html>