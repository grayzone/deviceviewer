package controllers

import (
	"encoding/hex"
	"encoding/json"
	"github.com/astaxie/beego"
	"github.com/grayzone/devicemonitor/connection"
	"github.com/grayzone/devicemonitor/ftprotocol"
	"strconv"
	"strings"
	"time"
)

type MainController struct {
	beego.Controller
}

func (c *MainController) Get() {
	c.TplNames = "index.tpl"
}

type SerialController struct {
	beego.Controller
}

func (c *SerialController) OpenSerial() {
	err := connection.OpenSerial()
	var result string
	if err != nil {
		result = err.Error()
	} else {
		result = "ok"
	}
	c.Ctx.WriteString(result)
}

func (c *SerialController) CloseSerial() {
	err := connection.CloseSerial()
	var result string
	if err != nil {
		result = err.Error()
	} else {
		result = "ok"
	}
	c.Ctx.WriteString(result)
}

func (c *SerialController) SendMessage() {
	input := c.GetString("input")

	in, _ := hex.DecodeString(input)

	out := connection.Sender(in)

	output := hex.EncodeToString(out)

	beego.Debug(output)

	c.Ctx.WriteString(output)
}

type MesssageController struct {
	beego.Controller
}

func (c *MesssageController) Parse() {
	b, _ := hex.DecodeString(c.GetString("response"))
	if b[0] == 0x06 {
		b = b[2:]
	}
	msgid, err := ftprotocol.GetMessageID(b)
	result := make(map[string]string)
	if err != nil {
		result["reason"] = "invalid message format"
	} else {
		switch msgid {
		case ftprotocol.REQUESTSESSION:
		case ftprotocol.KEEPALIVE:
		case ftprotocol.REQUESTSESSIONRESPONSE:
			var response ftprotocol.RequestSessionResponse
			response.Parse(b)
			beego.Debug(response)

			beego.Debug(response.DeviceID)
			beego.Debug(response.ProtocolVersion)
			beego.Debug(response.SessionStatus)
			result["reason"] = "ok"
			result["sessionkey"] = string(response.SessionKey)
			result["sequence"] = string(response.Sequence)
			result["messageid"] = string(response.MessageID)
			result["deviceid"] = strconv.Itoa(int(response.DeviceID))
			result["protocolver"] = strconv.Itoa(int(response.ProtocolVersion))
			result["sessionstatus"] = strconv.Itoa(int(response.SessionStatus))
			result["sessiontimeout"] = strconv.Itoa(int(response.SessionTimeout))
			result["messagetimeout"] = strconv.Itoa(int(response.MessageTimeout))
			result["maxretrycount"] = strconv.Itoa(int(response.MaxRetryCount))
		default:
			result["reason"] = "invalid message id"
		}
	}
	js, _ := json.Marshal(result)

	c.Ctx.WriteString(string(js))
}

func (c *MesssageController) Generate() {
	messageid, _ := strconv.ParseInt(c.GetString("messageid"), 16, 64)
	switch messageid {
	case ftprotocol.REQUESTSESSION:
		var rs ftprotocol.RequestSession
		//	rs.SessionKey, _ = hex.DecodeString(c.GetString("sessionkey"))

		rs.SessionKey = []byte(strings.ToUpper(c.GetString("sessionkey")))
		//	beego.Debug("SessionKey", rs.SessionKey)
		//	rs.MessageID, _ = hex.DecodeString(c.GetString("messageid"))
		rs.MessageID = []byte(strings.ToUpper(c.GetString("messageid")))
		//		beego.Debug("MessageID", rs.MessageID)
		rs.Sequence = byte(c.GetString("sequence")[0])
		//		beego.Debug("Sequence", c.GetString("sequence"), []byte(c.GetString("sequence")))
		deviceid, _ := c.GetInt32("deviceid")
		rs.DeviceID = uint32(deviceid)
		beego.Debug("DeviceID", rs.DeviceID)
		protocalver, _ := c.GetInt32("protocolver")
		rs.ProtocolVersion = uint32(protocalver)
		beego.Debug("ProtocolVersion", rs.ProtocolVersion)

		out := rs.Message()
		//		beego.Debug(out)
		c.Ctx.WriteString(hex.EncodeToString(out))

	case ftprotocol.KEEPALIVE:
		var ka ftprotocol.KeepAlive

		ka.SessionKey = []byte(strings.ToUpper(c.GetString("sessionkey")))
		ka.Sequence = byte(c.GetString("sequence")[0])
		ka.MessageID = []byte(strings.ToUpper(c.GetString("messageid")))

		out := ka.Message()
		//      beego.Debug(out)
		c.Ctx.WriteString(hex.EncodeToString(out))

	case ftprotocol.GETRUNTIME:
		var g ftprotocol.GetRunTime
		g.SessionKey = []byte(strings.ToUpper(c.GetString("sessionkey")))
		g.Sequence = byte(c.GetString("sequence")[0])
		g.MessageID = []byte(strings.ToUpper(c.GetString("messageid")))

		out := g.Message()
		//      beego.Debug(out)
		c.Ctx.WriteString(hex.EncodeToString(out))
	case ftprotocol.DEVICENAMEREQUEST:
		var g ftprotocol.DeviceNameRequest
		g.SessionKey = []byte(strings.ToUpper(c.GetString("sessionkey")))
		g.Sequence = byte(c.GetString("sequence")[0])
		g.MessageID = []byte(strings.ToUpper(c.GetString("messageid")))

		out := g.Message()
		//      beego.Debug(out)
		c.Ctx.WriteString(hex.EncodeToString(out))
	case ftprotocol.GETVERSIONSREQUEST:
		var g ftprotocol.GetVersionsRequest
		g.SessionKey = []byte(strings.ToUpper(c.GetString("sessionkey")))
		g.Sequence = byte(c.GetString("sequence")[0])
		g.MessageID = []byte(strings.ToUpper(c.GetString("messageid")))

		out := g.Message()
		//      beego.Debug(out)
		c.Ctx.WriteString(hex.EncodeToString(out))

	default:
		c.Ctx.WriteString("Invalid Message")

	}

	/*

		switch messageid {
		case ftprotocol.REQUESTSESSION:
			var rs ftprotocol.RequestSession
			rs.SessionKey, _ = hex.DecodeString(c.GetString("sessionkey"))
			rs.MessageID, _ = hex.DecodeString(c.GetString("messageid"))

			out := rs.Message()
			c.Ctx.WriteString(hex.EncodeToString(out))
		default:

		}
	*/
}

func IncreaseSeq(seq byte) byte {
	if seq == 0x39 {
		return 0x30
	}
	return seq + 1
}

func (c *MesssageController) KeepAlive() {
	count := 0
	var sequence byte = 0x30
	//	var ack []byte
	// open session
	for count < 100 {
		if count == 0 {
			var rs ftprotocol.RequestSession
			rs.SessionKey = []byte{0x46, 0x46}
			rs.MessageID = []byte{0x31, 0x31}
			rs.Sequence = sequence
			rs.DeviceID = 1
			rs.ProtocolVersion = 0x2728
			if count == 0 {
				rs.NoAck = true
			}

			input := rs.Message()

			output := connection.Sender(input)
			beego.Debug(output)
			//		sequence = IncreaseSeq(sequence)

			if len(output) > 50 {
				var res ftprotocol.RequestSessionResponse
				res.Parse(output)
				//		sequence = res.Sequence
				beego.Debug(res)

			}

			beego.Debug("sequence : ", sequence)

			if len(output) < 10 {
				if output[0] == 0x15 {
					//			sequence = 0x30
				}

			}

			//			ack = []byte{0x06, sequence}
			//			connection.Sender(ack)
			//			beego.Debug(output)

		}

		var k ftprotocol.KeepAlive
		k.Sequence = sequence
		k.SessionKey = []byte{0x46, 0x46}
		k.MessageID = []byte{0x30, 0x30}
		kinput := k.Message()
		koutput := connection.Sender(kinput)
		beego.Debug(koutput)
		sequence = IncreaseSeq(sequence)

		//		ack = []byte{0x06, sequence}
		//		connection.Sender(ack)
		/*
			var nr ftprotocol.DeviceNameRequest
			nr.Sequence = sequence
			nr.SessionKey = []byte{0x46, 0x46}
			nr.MessageID = []byte{0x31, 0x44}
			ninput := nr.Message()
			noutput := connection.Sender(ninput)
			beego.Debug(noutput)
			sequence = IncreaseSeq(sequence)
		*/
		var gs ftprotocol.GetSensor
		gs.Sequence = sequence
		gs.SessionKey = []byte{0x46, 0x46}
		gs.MessageID = []byte{0x33, 0x42}
		gs.IsBroadcast = true
		gs.Broadcastperiod = 100
		gs.IsAllSensorData = true
		ginput := gs.Message()
		goutput := connection.Sender(ginput)
		beego.Debug(goutput)
		sequence = IncreaseSeq(sequence)

		var gcd ftprotocol.GetActivationHistogram
		gcd.Sequence = sequence
		gcd.SessionKey = []byte{0x46, 0x46}
		gcd.MessageID = []byte{0x32, 0x42}
		gcdinput := gcd.Message()
		gcdoutput := connection.Sender(gcdinput)
		beego.Debug(gcdoutput)
		sequence = IncreaseSeq(sequence)

		/*
			var gcd ftprotocol.GetCriticalData
			gcd.Sequence = sequence
			gcd.SessionKey = []byte{0x46, 0x46}
			gcd.MessageID = []byte{0x33, 0x37}
			gcd.DataStoreNameSize = true

			ginput := gcd.Message()
			goutput := connection.Sender(ginput)
			beego.Debug(goutput)
			sequence = IncreaseSeq(sequence)
		*/
		//		ack = []byte{0x06, sequence}
		//		connection.Sender(ack)

		count = count + 1

		time.Sleep(time.Microsecond * 100)
	}

	c.Ctx.WriteString("done.")

}
