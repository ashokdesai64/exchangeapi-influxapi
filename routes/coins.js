var express = require('express');
var router = express.Router();
var payloadChecker = require('payload-validator');
var Coins = require('../models/Coinsmodel');
var ccxt = require ('ccxt');
// var expressValidator = require('express-validator');
// var validate = require('express-validation')
// var Joi = require('joi');

router.get('/coinlist', function (req, res, next) {

    Coins.getAllCoin(req.query,function (err, rows) {
      if (err) {
        res.json(err);
      }
      else {
        res.json({"data":rows,"message":"Coin listing successfully","status":true});
      }

    });
});

router.get('/coinpair', function (req, res, next) {

    Coins.getAllCoinpair(req.params,function (err, rows) {
      if (err) {
        res.json(err);
      }
      else {
        res.json({"data":rows,"message":"Coin pair listing successfully","status":true});
      }

    });
});

router.post('/exchange', function (req, res, next) {
    if(req.body) {
        var expectedPayload = {
            "ex_id" : ""
        };
        var result = payloadChecker.validator(req.body,expectedPayload,["ex_id"],false);
        if(result.success) {
            Coins.getAllExchange(req.body,function (err, rows) {
                if (err) {
                    res.json(err);
                }
                else {
                    if(typeof rows !== 'undefined' && rows.length > 0) {
                        res.json({"data":rows,"message":"Coin exchange listing successfully","status":true});
                    }
                    else{
                        res.json({"message" : "No data found","status" : false});
                    }
                }

            });
            
        } else {
            res.json({"message" : result.response.errorMessage});
        }
    } else {
        res.json({"message" : "request not correct"});
    }
    
});

router.post('/exchange/:name?', function (req, res, next) {
    if(req.body) {
        var expectedPayload = {
            "ex_id" : ""
        };
        var result = payloadChecker.validator(req.body,expectedPayload,["ex_id"],false);
        if(result.success) {
            Coins.getExchangeByCoin(req.params,req.body,function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                if(typeof rows !== 'undefined' && rows.length > 0) {
                    res.json({"data":rows,"message":"Coin exchange listing successfully","status":true});
                }
                else{
                    res.json({"message" : "No data found","status" : false});
                }
            }

            });
            
        } else {
            res.json({"message" : result.response.errorMessage});
        }
    } else {
        res.json({"message" : "request not correct"});
    }
});

router.post('/allexchange', function (req, res) {
    if(req.body) {
        var expectedPayload = {
            "sorting" : ""
        };
        var result = payloadChecker.validator(req.body,expectedPayload,["sorting"],false);
        if(result.success) {
            Coins.getAllExchangeData(req.body,req.params,function (err, rows) {
                if (err) {
                    res.json(err);
                  }
                else {
                    if(typeof rows !== 'undefined' && rows.length > 0) {
                        res.json({"data":rows,"message":"Coin exchange listing successfully","status":true});
                    }
                    else{
                        res.json({"message" : "No data found","status" : false});
                    }
                }
                
            });
        } else {
            res.json({"message" : result.response.errorMessage});
        }
    } else {
        res.json({"message" : "request not correct"});
    }
});

router.post('/allexchange/:base?', function (req, res) {
    if(req.body) {
        var expectedPayload = {
            "sorting" : ""
        };
        var result = payloadChecker.validator(req.body,expectedPayload,["sorting"],false);
        if(result.success) {
            Coins.getExchangeBySorting(req.body,req.params,function (err, rows) {
                if (err) {
                    res.json(err);
                  }
                else {
                    if(typeof rows !== 'undefined' && rows.length > 0) {
                        res.json({"data":rows,"message":"Coin exchange listing successfully","status":true});
                    }
                    else{
                        res.json({"message" : "No data found","status" : false});
                    }
                }
                
            });
        } else {
            res.json({"message" : result.response.errorMessage});
        }
    } else {
        res.json({"message" : "request not correct"});
    }
});

router.post('/singlecoin', function (req, res) {
    if(req.body) {
        var expectedPayload = {
            "ms_id" : ""
        };
        var result = payloadChecker.validator(req.body,expectedPayload,["ms_id"],false);
        if(result.success) {
            Coins.getSingleCoin(req.body,function (err, rows) {
                if (err) {
                    res.json(err);
                  }
                else {
                   res.json({"data":rows[0],"message":"Coin exchange listing successfully","status":true});
                }
                
            });
        } else {
            res.json({"message" : result.response.errorMessage});
        }
    } else {
        res.json({"message" : "request not correct"});
    }
});

router.get('/getcoinlist', function (req, res, next) {

    Coins.getcoinlist(req.params,function (err, rows) {
      if (err) {
        res.json(err);
      }
      else {
        res.json({"data":rows,"message":"Coin listing successfully","status":true});
      }

    });
});

router.get('/getexchangelist', function (req, res, next) {

    Coins.getexchangelist(req.params,function (err, rows) {
      if (err) {
        res.json(err);
      }
      else {
        res.json({"data":rows,"message":"Exchange listing successfully","status":true});
      }

    });
});

router.post('/getbidask', function (req, res) {
    if(req.body) {
        var expectedPayload = {
            "coin" : "",
            "base" : "",
        };
        var result = payloadChecker.validator(req.body,expectedPayload,["coin","base"],false);
        if(result.success) {
            var ab = {
              bidask: '',
              order: ''
            };
            var exchange = new ccxt.bittrex();
            var orders = exchange.fetch_order_book(req.body.coin + '/' + req.body.base, 10);
            var rrr = orders.then(result => {
              ab.bidask = { asks: result.asks, bids: result.bids };
              var market = exchange.fetchTrades(req.body.coin + '/' + req.body.base, 10);
              var mktbook = market.then(rslt => {
                ab.order = rslt;
                res.json({"data":ab,"message":"Listing successfully","status":true});
              });
            })
            .catch((err) => {
              res.json({"message":"No data found","status":false});
            });
        } else {
            res.json({"message" : result.response.errorMessage});
        }
    } else {
        res.json({"message" : "request not correct"});
    }
});

router.post('/getbidaskandorder', function (req, res) {
    if(req.body) {
        var expectedPayload = {
            "coin" : "",
            "base" : "",
            "exchange" : "",
        };
        var result = payloadChecker.validator(req.body,expectedPayload,["coin","base","exchange"],false);
        if(result.success) {
            var ab = {
              bidask: '',
              order: ''
            };

            if(req.body.exchange != 'all') {
              var exchange = new ccxt[req.body.exchange]();
              var orders = exchange.fetchOrderBook(req.body.coin + '/' + req.body.base, 10);
              var rrr = orders.then(result => {
                ab.bidask = { asks: result.asks, bids: result.bids };
                var market = exchange.fetchTrades(req.body.coin + '/' + req.body.base, 10);
                var mktbook = market.then(rslt => {
                  ab.order = rslt;
                  res.json({"data":ab,"message":"Listing successfully","status":true});
                });
              })
              .catch((err) => {
                res.json({"message":"No data found","status":false});
              });
            } else {
              res.json({"message":"No data found","status":false});
            }
        } else {
            res.json({"message" : result.response.errorMessage});
        }
    } else {
        res.json({"message" : "request not correct"});
    }
});

module.exports = router;
