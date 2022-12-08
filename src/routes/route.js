const express = require('express');
const router = express.Router();
const coinCapController = require('../controllers/coinCapController')

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.get('/assets', coinCapController.getCryptoCurrency)

module.exports = router;