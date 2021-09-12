const express = require('express')
const cors = require('cors')
express()
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .get('/', (req, res) => {
    res.sendFile(__dirname + 'client/build/index.html')
  })
  .use('/api', require('./api'))
  .listen(process.env.PORT||4000, () => console.log(`server run at http://localhost:4000`))

  