package controllers

import (
	"encoding/hex"
	"github.com/astaxie/beego"
	"github.com/grayzone/devicemonitor/ftprotocol"
	"github.com/grayzone/devicemonitor/serial"
	"strconv"
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

func (c *SerialController) SendMessage() {
	input := c.GetString("input")

	in, _ := hex.DecodeString(input)

	out := serial.Sender(in)

	output := hex.EncodeToString(out)

	beego.Debug(output)

	c.Ctx.WriteString(output)
}

type MesssageController struct {
	beego.Controller
}

func (c *MesssageController) Generate() {
	messageid, _ := strconv.ParseInt(c.GetString("messageid"), 16, 64)
	switch messageid {
	case ftprotocol.REQUESTSESSION:
		var rs ftprotocol.RequestSession
		//	rs.SessionKey, _ = hex.DecodeString(c.GetString("sessionkey"))
		rs.SessionKey = []byte(c.GetString("sessionkey"))
		//	beego.Debug("SessionKey", rs.SessionKey)
		//	rs.MessageID, _ = hex.DecodeString(c.GetString("messageid"))
		rs.MessageID = []byte(c.GetString("messageid"))
		//		beego.Debug("MessageID", rs.MessageID)
		rs.Sequence = byte(c.GetString("sequence")[0])
		//		beego.Debug("Sequence", c.GetString("sequence"), []byte(c.GetString("sequence")))

		out := rs.Message()
		//		beego.Debug(out)
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
