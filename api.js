const {Router} = require('express');
const {setPower, setBright} = require('./yeelight')

const router = Router();


router.get('/', (req, res) => {
  const {mode,bright} = req.query;
  if (!mode && !bright) return;
  if (mode){
    if (mode !== 'on' && mode !== 'off') {
      return res.status(400).send('Mode must be on or off');
    }
    setPower(mode)
    res.send('Power ' + mode).end()
  } else if (bright){
    if (bright < 1 || bright > 100) {
      return res.status(400).send('Brightness must be between 1 and 100')
    }
    setBright(bright)
    res.send(`brightness: ${bright}%`).end()
  }
});


module.exports = router;