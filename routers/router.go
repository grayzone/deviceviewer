package routers

import (
	"github.com/astaxie/beego"
	"github.com/grayzone/deviceviewer/controllers"
)

func init() {
	beego.Router("/", &controllers.MainController{})

	beego.Router("/openserial", &controllers.SerialController{}, "POST:OpenSerial")
	beego.Router("/closeserial", &controllers.SerialController{}, "POST:CloseSerial")
	beego.Router("/send", &controllers.SerialController{}, "POST:SendMessage")
	beego.Router("/generate", &controllers.MesssageController{}, "POST:Generate")
	beego.Router("/parse", &controllers.MesssageController{}, "POST:Parse")

	beego.Router("/keepalive", &controllers.MesssageController{}, "POST:KeepAlive")
}
