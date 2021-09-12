const express = require('express')
const cors = require('cors')
const path = require('path')
const PORT = process.env.PORT || 4000
const prod = process.env.NODE_ENV === 'production'
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
if (prod) {
	app.use(express.static('client/build'))
	app.get('/*', (req, res) => {
		let file = path.join('/app/client/build', 'index.html')
		res.sendFile(file)
	})
}
app.use('/api', require('./api'))
app.listen(PORT, () => console.log(`server run at http://localhost:${PORT}`))
