var express = require('express');
var router = express.Router();
var payloadChecker = require('payload-validator');
var Crons = require('../models/Cronsmodel');


router.get('/getexchangeBittrex', function (req, res, next) {

    Crons.getExchangeBittrex(req,function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }

    });
});

router.get('/getexchangeCEX', function (req, res, next) {

    Crons.getExchangeCEX(req,function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }

    });
});

router.get('/getexchangePoloniex', function (req, res, next) {

    Crons.getExchangePoloniex(req,function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }

    });
});

router.get('/getexchangeBinance', function (req, res, next) {

    Crons.getExchangeBinance(req,function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }

    });
});

router.get('/getexchangeKuCoin', function (req, res, next) {

    Crons.getExchangeKuCoin(req,function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }

    });
});

router.get('/getexchangeGemini', function (req, res, next) {

    Crons.getExchangeGemini(req,function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }

    });
});

router.get('/getexchangeGDAX', function (req, res, next) {

    Crons.getExchangeGDAX(req,function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }

    });
});

router.get('/getexchangeBitStamp', function (req, res, next) {

    Crons.getExchangeBitStamp(req,function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }

    });
});

router.get('/getexchangeKraken', function (req, res, next) {

    Crons.getExchangeKraken(req,function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }

    });
});


module.exports = router;