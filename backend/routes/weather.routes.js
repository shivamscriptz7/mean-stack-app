const router = require('express').Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  const r = await axios.get(
    'https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=API_KEY'
  );
  res.json(r.data);
});

module.exports = router;
