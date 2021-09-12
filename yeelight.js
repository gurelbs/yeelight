const { Client } = require('yeelight-node')

const client = new Client()
let yeelightControl;

function setPower(mode) {
	try {
        if (yeelightControl){
            yeelightControl.set_power(mode)
        } else {
            client.bind(yeelight => {
                yeelightControl = yeelight
                yeelightControl.set_power(mode)
                return yeelight.closeConnection()
            })
        }
	} catch (error) {
		console.log(error)
	}
}
function setBright(brightness) {
	try {
        if (yeelightControl){
            yeelightControl.set_bright(brightness)
        } else {
            client.bind(yeelight => {
                yeelightControl = yeelight
                yeelightControl.set_bright(brightness)
                return yeelight.closeConnection()
            })
        }
	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	setPower,
	setBright,
}
