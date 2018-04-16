
var express = require('express');
var router = express.Router();
var payloadChecker = require('payload-validator');
var Trade = require('../models/Trademodel');

router.post('/tradebyexchange', function (req, res) {
  if(req.body) {
        var expectedPayload = {
            "period" : ""
        };
        var result = payloadChecker.validator(req.body,expectedPayload,["period"],false);
        if(result.success) {
            Trade.getTradeByExchange(req.body,function (err, rows) {
                if (err) {
                  res.json(err);
                }
                else {
                  res.json(rows);
                }

            });
        } else {
            res.json({"message" : result.response.errorMessage});
        }
  } else {
      res.json({"message" : "request not correct"});
  }

});

router.post('/markethistory', function (req, res) {
  if(req.body) {
        var expectedPayload = {
            "market_name" : "",
            "ex_id" : "",
            "limit" : "",
            "start" : ""
        };
        var result = payloadChecker.validator(req.body,expectedPayload,["market_name","ex_id","limit","start"],false);
        if(result.success) {
            Trade.getMarketHistory(req.body,function (err, rows) {
                if (err) {
                  res.json(err);
                }
                else {
                  res.json(rows);
                }

            });
        } else {
            res.json({"message" : result.response.errorMessage});
        }
  } else {
      res.json({"message" : "request not correct"});
  }

});

router.post('/bitstampalltrade', function (req, res) {
  if(req.body) {
        var expectedPayload = {
            "period" : ""
        };
        var result = payloadChecker.validator(req.body,expectedPayload,["period"],false);
        if(result.success) {
            Trade.getBitstampAlltrade(req.body,function (err, rows) {
                if (err) {
                  res.json(err);
                }
                else {
                  res.json(rows);
                }

            });
        } else {
            res.json({"message" : result.response.errorMessage});
        }
  } else {
      res.json({"message" : "request not correct"});
  }

});

router.get('/getExchangeTradeBittrex', function (req, res, next) {

    Trade.getExchangeTradeBittrex(req,function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }

    });
});

router.get('/getExchangeTradeCEX', function (req, res, next) {

    Trade.getExchangeTradeCEX(req,function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }

    });
});

router.get('/getExchangeTradePoloniex', function (req, res, next) {

    Trade.getExchangeTradePoloniex(req,function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }

    });
});

router.get('/createjson1h', function (req, res, next) {

    Trade.createjson1h(req,function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }

    });
});

router.get('/createjson12h', function (req, res, next) {

    Trade.createjson12h(req,function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }

    });
});

router.get('/createjson24h', function (req, res, next) {

    Trade.createjson24h(req,function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }

    });
});

module.exports = router;