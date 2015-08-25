package routers

import (
	"github.com/astaxie/beego"
	"github.com/grayzone/deviceviewer/controllers"
)

func init() {
	beego.Router("/", &controllers.MainController{})
	beego.Router("/send", &controllers.SerialController{}, "POST:SendMessage")
	beego.Router("/generate", &controllers.MesssageController{}, "POST:Generate")
}
