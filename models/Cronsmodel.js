var db=require('../dbconnection'); //reference of dbconnection.js
var ccxt = require ('ccxt');

var Crons={
    getExchangeBittrex:function(params, callback) {
        var exchange = new ccxt.bittrex();
            // var orders = exchange.fetchTicker('ETH/BTC', 10);
            var orders = exchange.fetchTickers(); 
            var rrr = orders.then(result => {
                var resArr = Object.values(result);
                var pairArr = [];
                resArr.forEach(function(val) {
                    var val = val;
                    var marArr = val.symbol.split('/');
                    var marketName = marArr[1]+"-"+marArr[0];
                    pairArr.push("'"+marketName+"'");
                    db.query("SELECT * FROM market_summary_ccxt WHERE market_name=? AND exchange_id=1",[marketName],function(err,rows){
                    if(typeof rows !== 'undefined' && rows.length > 0) {
                        var today = new Date();
                        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                        var dateTime = date+' '+time;
                        db.query("UPDATE market_summary_ccxt SET high=?,low=?,volume=?,last=?,base_volume=?,`change_24h`=?,bid=?,ask=?,open_buy_orders=?,open_sell_orders=?,prev_day=?,update_date=? WHERE id=?",[val.high,val.low,val.quoteVolume,val.last,val.baseVolume,val.change,val.bid,val.ask,val.info.OpenBuyOrders,val.info.OpenSellOrders,val.info.PrevDay,dateTime,rows[0].id],function(err, rows){
                            // console.log(rows);
                            // console.log(err);
                        });
                    } else {
                        db.query("INSERT INTO market_summary_ccxt (`exchange_id`,`market_name`,`market_currency`,`base_currency`,`high`,`low`,`volume`,`last`,`base_volume`,`change_24h`,`timestamp`,`bid`,`ask`,`open_buy_orders`,`open_sell_orders`,`prev_day`,`date_listed`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [1,marketName,marArr[0],marArr[1],val.high,val.low,val.quoteVolume,val.last,val.baseVolume,val.change,val.datetime,val.bid,val.ask,val.info.OpenBuyOrders,val.info.OpenSellOrders,val.info.PrevDay,val.info.Created],function(err, rows){
                            console.log(rows);
                            console.log(err);
                        });
                    }
                    });
                }, this);

                var pairStr = pairArr.toString();
                db.query("UPDATE market_summary_ccxt SET status=0 WHERE market_name NOT IN ("+pairStr+") AND exchange_id=1",function(err, rows){
                    console.log("update status");
                });
           
                    // return callback(pairArr.toString());
            })
            .catch((err) => {
                console.log(err);
            //   res.json({"message":"No data found","status":false});
            });
    },

    getExchangeCEX:function(params, callback) {
        var exchange = new ccxt.cex();
            // var orders = exchange.fetchTicker('ETH/BTC', 10);
            var orders = exchange.fetchTickers(); 
            var rrr = orders.then(result => {
                var resArr = Object.values(result);
                var pairArr = [];
                resArr.forEach(function(val) {
                    var val = val;
                    var marArr = val.symbol.split('/');
                    var marketName = marArr[1]+"-"+marArr[0];
                    pairArr.push("'"+marketName+"'");
                    db.query("SELECT * FROM market_summary_ccxt WHERE market_name=? AND exchange_id=2",[marketName],function(err,rows){
                    if(typeof rows !== 'undefined' && rows.length > 0) {
                        var today = new Date();
                        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                        var dateTime = date+' '+time;
                        db.query("UPDATE market_summary_ccxt SET high=?,low=?,last=?,base_volume=?,bid=?,ask=?,update_date=? WHERE id=?",[val.high,val.low,val.last,val.baseVolume,val.bid,val.ask,dateTime,rows[0].id],function(err, rows){
                return callback(val);
                            console.log(rows);
                            console.log(err);
                        });
                    } else {
                        console.log(rows);
                        db.query("INSERT INTO market_summary_ccxt (`exchange_id`,`market_name`,`market_currency`,`base_currency`,`high`,`low`,`last`,`base_volume`,`timestamp`,`bid`,`ask`) VALUES(?,?,?,?,?,?,?,?,?,?,?)", [2,marketName,marArr[0],marArr[1],val.high,val.low,val.last,val.baseVolume,val.datetime,val.bid,val.ask],function(err, rows){
                            console.log(rows);
                            console.log(err);
                        });
                    }
                    });
                    // return callback(marketName);
                }, this);

                var pairStr = pairArr.toString();
                db.query("UPDATE market_summary_ccxt SET status=0 WHERE market_name NOT IN ("+pairStr+") AND exchange_id=2",function(err, rows){
                    console.log("update status");
                });
            })
            .catch((err) => {
                console.log(err);
            //   res.json({"message":"No data found","status":false});
            });
    },
    
    getExchangePoloniex:function(params, callback) {
        var exchange = new ccxt.poloniex({
                                            'verbose': true,
                                            'proxy': 'https://cors-anywhere.herokuapp.com/',
                                            'origin': 'foobar',
                                        });
            // var orders = exchange.fetchTicker('ETH/BTC', 10);
            var orders = exchange.fetchTickers(); 
            var rrr = orders.then(result => {
                var resArr = Object.values(result);
                var pairArr = [];
                resArr.forEach(function(val) {
                    var val = val;
                    var marArr = val.symbol.split('/');
                    var marketName = marArr[1]+"-"+marArr[0];
                    pairArr.push("'"+marketName+"'");
                    db.query("SELECT * FROM market_summary_ccxt WHERE market_name=? AND exchange_id=3",[marketName],function(err,rows){
                    if(typeof rows !== 'undefined' && rows.length > 0) {
                        var today = new Date();
                        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                        var dateTime = date+' '+time;
                        db.query("UPDATE market_summary_ccxt SET high=?,low=?,volume=?,last=?,base_volume=?,`change_24h`=?,bid=?,ask=?,update_date=? WHERE id=?",[val.high,val.low,val.quoteVolume,val.last,val.baseVolume,val.change,val.bid,val.ask,dateTime,rows[0].id],function(err, rows){
                            console.log(rows);
                            console.log(err);
                        });
                    } else {
                        console.log(rows);
                        db.query("INSERT INTO market_summary_ccxt (`exchange_id`,`market_name`,`market_currency`,`base_currency`,`high`,`low`,`volume`,`last`,`base_volume`,`change_24h`,`timestamp`,`bid`,`ask`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)", [3,marketName,marArr[0],marArr[1],val.high,val.low,val.quoteVolume,val.last,val.baseVolume,val.change,val.datetime,val.bid,val.ask],function(err, rows){
                            console.log(rows);
                            console.log(err);
                        });
                    }
                    });
                    // return callback(marketName);
                }, this);

                var pairStr = pairArr.toString();
                db.query("UPDATE market_summary_ccxt SET status=0 WHERE market_name NOT IN ("+pairStr+") AND exchange_id=3",function(err, rows){
                    console.log("update status");
                });
            })
            .catch((err) => {
                console.log(err);
            //   res.json({"message":"No data found","status":false});
            });
    },
    
    getExchangeBinance:function(params, callback) {
        var exchange = new ccxt.binance();
            // var orders = exchange.fetchTicker('ETH/BTC', 10);
            var orders = exchange.fetchTickers(); 
            var rrr = orders.then(result => {
                var resArr = Object.values(result);
                var pairArr = [];
                resArr.forEach(function(val) {
                    var val = val;
                    var marArr = val.symbol.split('/');
                    var marketName = marArr[1]+"-"+marArr[0];
                    pairArr.push("'"+marketName+"'");
                    db.query("SELECT * FROM market_summary_ccxt WHERE market_name=? AND exchange_id=4",[marketName],function(err,rows){
                    if(typeof rows !== 'undefined' && rows.length > 0) {
                        var today = new Date();
                        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                        var dateTime = date+' '+time;
                        db.query("UPDATE market_summary_ccxt SET high=?,low=?,volume=?,last=?,base_volume=?,`change_24h`=?,bid=?,ask=?,update_date=? WHERE id=?",[val.high,val.low,val.quoteVolume,val.last,val.baseVolume,val.change,val.bid,val.ask,dateTime,rows[0].id],function(err, rows){
                            console.log(rows);
                            console.log(err);
                        });
                    } else {
                        console.log(rows);
                        db.query("INSERT INTO market_summary_ccxt (`exchange_id`,`market_name`,`market_currency`,`base_currency`,`high`,`low`,`volume`,`last`,`base_volume`,`change_24h`,`timestamp`,`bid`,`ask`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)", [4,marketName,marArr[0],marArr[1],val.high,val.low,val.quoteVolume,val.last,val.baseVolume,val.change,val.datetime,val.bid,val.ask],function(err, rows){
                            console.log(rows);
                            console.log(err);
                        });
                    }
                    });
                    // return callback(marketName);
                }, this);

                var pairStr = pairArr.toString();
                db.query("UPDATE market_summary_ccxt SET status=0 WHERE market_name NOT IN ("+pairStr+") AND exchange_id=4",function(err, rows){
                    console.log("update status");
                });
            })
            .catch((err) => {
                console.log(err);
            //   res.json({"message":"No data found","status":false});
            });
    },
    
    getExchangeKuCoin:function(params, callback) {
        var exchange = new ccxt.kucoin();
            // var orders = exchange.fetchTicker('ETH/BTC', 10);
            var orders = exchange.fetchTickers(); 
            var rrr = orders.then(result => {
                var resArr = Object.values(result);
                var pairArr = [];
                resArr.forEach(function(val) {
                    var val = val;
                    var marArr = val.symbol.split('/');
                    var marketName = marArr[1]+"-"+marArr[0];
                    pairArr.push("'"+marketName+"'");
                    db.query("SELECT * FROM market_summary_ccxt WHERE market_name=? AND exchange_id=5",[marketName],function(err,rows){
                    if(typeof rows !== 'undefined' && rows.length > 0) {
                        var today = new Date();
                        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                        var dateTime = date+' '+time;
                        db.query("UPDATE market_summary_ccxt SET high=?,low=?,volume=?,last=?,base_volume=?,`change_24h`=?,bid=?,ask=?,update_date=? WHERE id=?",[val.high,val.low,val.quoteVolume,val.last,val.baseVolume,val.change,val.bid,val.ask,dateTime,rows[0].id],function(err, rows){
                            console.log(rows);
                            console.log(err);
                        });
                    } else {
                        console.log(rows);
                        db.query("INSERT INTO market_summary_ccxt (`exchange_id`,`market_name`,`market_currency`,`base_currency`,`high`,`low`,`volume`,`last`,`base_volume`,`change_24h`,`timestamp`,`bid`,`ask`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)", [5,marketName,marArr[0],marArr[1],val.high,val.low,val.quoteVolume,val.last,val.baseVolume,val.change,val.datetime,val.bid,val.ask],function(err, rows){
                            console.log(rows);
                            console.log(err);
                        });
                    }
                    });
                    // return callback(marketName);
                }, this);

                var pairStr = pairArr.toString();
                db.query("UPDATE market_summary_ccxt SET status=0 WHERE market_name NOT IN ("+pairStr+") AND exchange_id=5",function(err, rows){
                    console.log("update status");
                });
            })
            .catch((err) => {
                console.log(err);
            //   res.json({"message":"No data found","status":false});
            });
    },
   
    getExchangeGemini:function(params, callback) {
        var exchange = new ccxt.gemini();
            // var orders = exchange.fetchTicker();
            var orders = exchange.fetchMarkets(); 
            var rrr = orders.then(result => {
                // return callback(result);
                var pairArr = [];
                result.forEach(function(rval){

                    var ticker = exchange.fetchTicker(rval.symbol);
                    var tickerRes = ticker.then(res => {
                        console.log(res);
                        // return callback(res);

                        var val = res;
                        var marArr = val.symbol.split('/');
                        var marketName = marArr[1]+"-"+marArr[0];
                        pairArr.push("'"+marketName+"'");
                        db.query("SELECT * FROM market_summary_ccxt WHERE market_name=? AND exchange_id=6",[marketName],function(err,rows){
                        if(typeof rows !== 'undefined' && rows.length > 0) {
                            var today = new Date();
                            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                            var dateTime = date+' '+time;
                            db.query("UPDATE market_summary_ccxt SET volume=?,last=?,base_volume=?,bid=?,ask=?,update_date=? WHERE id=?",[val.quoteVolume,val.last,val.baseVolume,val.bid,val.ask,dateTime,rows[0].id],function(err, rows){
                                console.log(rows);
                                console.log(err);
                            });
                        } else {
                            console.log(rows);
                            db.query("INSERT INTO market_summary_ccxt (`exchange_id`,`market_name`,`market_currency`,`base_currency`,`volume`,`last`,`base_volume`,`timestamp`,`bid`,`ask`) VALUES(?,?,?,?,?,?,?,?,?,?)", [6,marketName,marArr[0],marArr[1],val.quoteVolume,val.last,val.baseVolume,val.datetime,val.bid,val.ask],function(err, rows){
                                console.log(rows);
                                console.log(err);
                            });
                        }
                        });

                    })
                    .catch((err) => {
                        console.log(err);
                    })

                });

                var pairStr = pairArr.toString();
                db.query("UPDATE market_summary_ccxt SET status=0 WHERE market_name NOT IN ("+pairStr+") AND exchange_id=6",function(err, rows){
                    console.log("update status");
                });
            })
            .catch((err) => {
                console.log(err);
            //   res.json({"message":"No data found","status":false});
            });
    },
    
    getExchangeGDAX:function(params, callback) {
        var exchange = new ccxt.gdax();
            // var orders = exchange.fetchTicker('ETH/BTC', 10);
            var orders = exchange.fetchMarkets(); 
            var rrr = orders.then(result => {
                var pairArr = [];
                result.forEach(function(rval){

                    var ticker = exchange.fetchTicker(rval.symbol);
                    var tickerRes = ticker.then(res => {
                        // return callback(res);

                        var val = res;
                        var marArr = val.symbol.split('/');
                        var marketName = marArr[1]+"-"+marArr[0];
                        pairArr.push("'"+marketName+"'");
                        db.query("SELECT * FROM market_summary_ccxt WHERE market_name=? AND exchange_id=7",[marketName],function(err,rows){
                        if(typeof rows !== 'undefined' && rows.length > 0) {
                            var today = new Date();
                            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                            var dateTime = date+' '+time;
                            db.query("UPDATE market_summary_ccxt SET last=?,base_volume=?,bid=?,ask=?,update_date=? WHERE id=?",[val.last,val.baseVolume,val.bid,val.ask,dateTime,rows[0].id],function(err, rows){
                                console.log(rows);
                                console.log(err);
                            });
                        } else {
                            db.query("INSERT INTO market_summary_ccxt (`exchange_id`,`market_name`,`market_currency`,`base_currency`,`last`,`base_volume`,`timestamp`,`bid`,`ask`) VALUES(?,?,?,?,?,?,?,?,?)", [7,marketName,marArr[0],marArr[1],val.last,val.baseVolume,val.datetime,val.bid,val.ask],function(err, rows){
                                console.log(rows);
                                console.log(err);
                            });
                        }
                        });

                    })
                    .catch((err) => {
                        console.log(err);
                    })

                });

                var pairStr = pairArr.toString();
                db.query("UPDATE market_summary_ccxt SET status=0 WHERE market_name NOT IN ("+pairStr+") AND exchange_id=7",function(err, rows){
                    console.log("update status");
                });
            })
            .catch((err) => {
                console.log(err);
            //   res.json({"message":"No data found","status":false});
            });
    },
    
    getExchangeBitStamp:function(params, callback) {
        var exchange = new ccxt.bitstamp();
            // var orders = exchange.fetchTicker('ETH/BTC', 10);
            var orders = exchange.fetchMarkets(); 
            // var orders = exchange.fetchTicker('BTC/USD'); 
            var rrr = orders.then(result => {
                var pairArr = [];
                result.forEach(function(rval){

                    var ticker = exchange.fetchTicker(rval.symbol);
                    var tickerRes = ticker.then(res => {
                        console.log(res);
                        // return callback(res);

                        var val = res;
                        var marArr = val.symbol.split('/');
                        var marketName = marArr[1]+"-"+marArr[0];
                        pairArr.push("'"+marketName+"'");
                        db.query("SELECT * FROM market_summary_ccxt WHERE market_name=? AND exchange_id=8",[marketName],function(err,rows){
                        if(typeof rows !== 'undefined' && rows.length > 0) {
                            var today = new Date();
                            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                            var dateTime = date+' '+time;
                            db.query("UPDATE market_summary_ccxt SET high=?,low=?,volume=?,last=?,base_volume=?,bid=?,ask=?,update_date=? WHERE id=?",[val.high,val.low,val.quoteVolume,val.last,val.baseVolume,val.bid,val.ask,dateTime,rows[0].id],function(err, rows){
                                console.log(rows);
                                console.log(err);
                            });
                        } else {
                            console.log(rows);
                            db.query("INSERT INTO market_summary_ccxt (`exchange_id`,`market_name`,`market_currency`,`base_currency`,`high`,`low`,`volume`,`last`,`base_volume`,`timestamp`,`bid`,`ask`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)", [8,marketName,marArr[0],marArr[1],val.high,val.low,val.quoteVolume,val.last,val.baseVolume,val.datetime,val.bid,val.ask],function(err, rows){
                                console.log(rows);
                                console.log(err);
                            });
                        }
                        });

                    })
                    .catch((err) => {
                        console.log(err);
                    })

                });

                var pairStr = pairArr.toString();
                db.query("UPDATE market_summary_ccxt SET status=0 WHERE market_name NOT IN ("+pairStr+") AND exchange_id=8",function(err, rows){
                    console.log("update status");
                });
            })
            .catch((err) => {
                console.log(err);
            //   res.json({"message":"No data found","status":false});
            });
    },
    
    getExchangeKraken:function(params, callback) {
        var exchange = new ccxt.kraken();
            // var orders = exchange.fetchTicker('ETH/BTC', 10);
            var orders = exchange.fetchTickers(); 
            var rrr = orders.then(result => {
                var resArr = Object.values(result);
                // return callback(resArr);
                var pairArr = [];
                resArr.forEach(function(val) {
                    var val = val;
                    var marArr = val.symbol.split('/');
                    var marketName = marArr[1]+"-"+marArr[0];
                    pairArr.push("'"+marketName+"'");
                    db.query("SELECT * FROM market_summary_ccxt WHERE market_name=? AND exchange_id=9",[marketName],function(err,rows){
                    if(typeof rows !== 'undefined' && rows.length > 0) {
                        var today = new Date();
                        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                        var dateTime = date+' '+time;
                        db.query("UPDATE market_summary_ccxt SET high=?,low=?,volume=?,last=?,base_volume=?,bid=?,ask=?,update_date=? WHERE id=?",[val.high,val.low,val.quoteVolume,val.last,val.baseVolume,val.bid,val.ask,dateTime,rows[0].id],function(err, rows){
                            console.log(rows);
                            console.log(err);
                        });
                    } else {
                        // console.log(rows);
                        db.query("INSERT INTO market_summary_ccxt (`exchange_id`,`market_name`,`market_currency`,`base_currency`,`high`,`low`,`volume`,`last`,`base_volume`,`timestamp`,`bid`,`ask`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)", [9,marketName,marArr[0],marArr[1],val.high,val.low,val.quoteVolume,val.last,val.baseVolume,val.datetime,val.bid,val.ask],function(err, rows){
                            console.log(rows);
                            // console.log(err);
                        });
                    }
                    });
                    // return callback(marketName);
                }, this);

                var pairStr = pairArr.toString();
                db.query("UPDATE market_summary_ccxt SET status=0 WHERE market_name NOT IN ("+pairStr+") AND exchange_id=9",function(err, rows){
                    console.log("update status");
                });
            })
            .catch((err) => {
                console.log(err);
            //   res.json({"message":"No data found","status":false});
            });
    },

};

module.exports=Crons;