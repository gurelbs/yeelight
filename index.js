const express = require('express')
const cors = require('cors')
const path = require('path')
const PORT = process.env.PORT||4000
const prod = process.env.NODE_ENV === 'production'
express()
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  // .use(express.static('client/public'))
	.get('/', (req, res) => {
		let file = path.join(prod ? '/app/client/build/index.html' : '/client/build/index.html')
		res.sendFile(file)
	})  
  .use('/api', require('./api'))
  .listen(PORT, () => console.log(`server run at http://localhost:${PORT}`))