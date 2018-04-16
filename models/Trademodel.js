var influent = require('influent');
var ccxt = require ('ccxt');

var fs = require('fs')

// var client=require('../dbinfluxconn'); //reference of dbinfluxconn.js

const Influx = require('influxdb-nodejs');
const client = new Influx('http://35.174.58.234:8086/coinexchange');


var Trade={

    createjson1h:function(params, callback) {
        
        const reader = client.queryRaw('select min(rate),sum(quantity),first(rate),sum(total),max(rate) from bittrextrade,bitstamptrade,binancetrade,bitfinex2trade,cextrade,gdaxtrade,krakentrade,kucointrade,geminitrade,poloniextrade where time > now() - 1h GROUP BY market_name,exchange ');
            reader.then((data) => {
                var arrData = [];
                data.results[0].series.forEach(function(aData) {
                    var exchange = aData.tags.exchange;
                    var pair = aData.tags.market_name;
                    var exchange_id = exchange+"_"+pair;

                    arrData.push({'symbol_id':exchange_id,'pair':pair,'exchange':exchange,'volume':aData.values[0][2],'basevolume':aData.values[0][4],'first':aData.values[0][3],'high':aData.values[0][5],'low':aData.values[0][1]});

                });
                var resData = {"data":arrData,"message":"Trade listing successfully.","status":true};
                fs.writeFile('./trade1h.json', JSON.stringify(resData), 'utf-8', function(err) {
                    if (err) throw err
                    console.log('Done!')
                })
                    return callback({"data":arrData,"message":"Trade listing successfully.","status":true});
            }).catch(err => {
                console.log(err);
            return callback(err);
            });
    },

    createjson12h:function(params, callback) {
        
        const reader = client.queryRaw('select min(rate),sum(quantity),first(rate),sum(total),max(rate) from bittrextrade,bitstamptrade,binancetrade,bitfinex2trade,cextrade,gdaxtrade,krakentrade,kucointrade,geminitrade,poloniextrade where time > now() - 12h GROUP BY market_name,exchange ');
            reader.then((data) => {
                var arrData = [];
                data.results[0].series.forEach(function(aData) {
                    var exchange = aData.tags.exchange;
                    var pair = aData.tags.market_name;
                    var exchange_id = exchange+"_"+pair;

                    arrData.push({'symbol_id':exchange_id,'pair':pair,'exchange':exchange,'volume':aData.values[0][2],'basevolume':aData.values[0][4],'first':aData.values[0][3],'high':aData.values[0][5],'low':aData.values[0][1]});

                });
                var resData = {"data":arrData,"message":"Trade listing successfully.","status":true};
                fs.writeFile('./trade12h.json', JSON.stringify(resData), 'utf-8', function(err) {
                    if (err) throw err
                    console.log('Done!')
                })
                    return callback({"data":arrData,"message":"Trade listing successfully.","status":true});
            }).catch(err => {
                console.log(err);
            return callback(err);
            });
    },

    createjson24h:function(params, callback) {
        
        const reader = client.queryRaw('select min(rate),sum(quantity),first(rate),sum(total),max(rate) from bittrextrade,bitstamptrade,binancetrade,bitfinex2trade,cextrade,gdaxtrade,krakentrade,kucointrade,geminitrade,poloniextrade where time > now() - 24h GROUP BY market_name,exchange ');
            reader.then((data) => {
                var arrData = [];
                data.results[0].series.forEach(function(aData) {
                    var exchange = aData.tags.exchange;
                    var pair = aData.tags.market_name;
                    var exchange_id = exchange+"_"+pair;

                    arrData.push({'symbol_id':exchange_id,'pair':pair,'exchange':exchange,'volume':aData.values[0][2],'basevolume':aData.values[0][4],'first':aData.values[0][3],'high':aData.values[0][5],'low':aData.values[0][1]});

                });
                var resData = {"data":arrData,"message":"Trade listing successfully.","status":true};
                fs.writeFile('./trade24h.json', JSON.stringify(resData), 'utf-8', function(err) {
                    if (err) throw err
                    console.log('Done!')
                })
                    return callback({"data":arrData,"message":"Trade listing successfully.","status":true});
            }).catch(err => {
                console.log(err);
            return callback(err);
            });
    },

    getTradeByExchange:function(params, callback) {
        if(params.ex_id && params.ex_id != '') {
            var measurement = params.ex_id+'trade';
            const reader = client.query(measurement)
            .addGroup('market_name','exchange')
            .addFunction('min','rate')
            .addFunction('max','rate')
            .addFunction('first','rate')
            .addFunction('sum','quantity')
            .addFunction('sum','total');

            // const reader = client.query(measurement)
            // .addGroup('market_name','exchange')
            // .addField('rate','quantity','total')

            reader.start = '-'+params.period;
            reader.then((data) => {
                // return callback(data);
                if(data.results[0].series && data.results[0].series.length > 0) {
                    var arrData = [];
                    data.results[0].series.forEach(function(aData) {
                        var exchange = aData.tags.exchange;
                        var pair = aData.tags.market_name;
                        var exchange_id = exchange+"_"+pair;
                        
                        arrData.push({'symbol_id':exchange_id,'pair':pair,'exchange':exchange,'volume':aData.values[0][4],'basevolume':aData.values[0][5],'first':aData.values[0][1],'high':aData.values[0][2],'low':aData.values[0][3]});
                    });
                    return callback({"data":arrData,"message":"Trade listing successfully.","status":true});
                } else {
                    return callback({"message":"No data found.","status":false});
                }
            }).catch(err => {
              return callback(err);
            });
        } else {
            const reader = client.queryRaw('select min(rate),sum(quantity),first(rate),sum(total),max(rate) from bittrextrade,bitstamptrade,binancetrade,bitfinex2trade,cextrade,gdaxtrade,krakentrade,kucointrade,geminitrade,poloniextrade where time > now() - '+params.period+' GROUP BY market_name,exchange ');
            
            reader.then((data) => {

                // return callback(data);
                var arrData = [];
                data.results[0].series.forEach(function(aData) {
                    var exchange = aData.tags.exchange;
                    var pair = aData.tags.market_name;
                    var exchange_id = exchange+"_"+pair;

                    arrData.push({'symbol_id':exchange_id,'pair':pair,'exchange':exchange,'volume':aData.values[0][2],'basevolume':aData.values[0][4],'first':aData.values[0][3],'high':aData.values[0][5],'low':aData.values[0][1]});

                });
                    return callback({"data":arrData,"message":"Trade listing successfully.","status":true});
            }).catch(err => {
                console.log(err);
            return callback(err);
            });
        }

    },

    getMarketHistory:function(params, callback) {
        var measurement = params.ex_id+'trade';

        const reader = client.query(measurement)
        .addField('exchange','order_type','rate','quantity','total','timestamp')
        .where('market_name',params.market_name)
        .set({limit:params.limit, offset:params.start,order:'desc'});

        reader.then((data) => {
            // console.log(data.results[0]);
                // return callback(data.results[0]);

            const readerCount = client.query(measurement)
            .addFunction('count','quantity')
            .where('market_name',params.market_name);
            readerCount.then((cntdata) => {

                var totalCount = cntdata.results[0].series[0].values[0][1];

                if(data.results[0].series && data.results[0].series.length > 0) {
                    var arrData = [];
                    data.results[0].series[0].values.forEach(function(aData,key) {
                        var exchange = aData[1];
                        var pair = params.market_name;
                        var exchange_id = exchange+"_"+pair;
                        arrData.push({"exchange_id":exchange_id,"market_name":params.market_name,"order_type":aData[2],"quantity":aData[3],"rate":aData[4],"total":aData[6],"timestamp":aData[5]});
                        // console.log(aData);
                });
                    return callback({"data":arrData,"totalCount":totalCount,"message":"Market history listing successfully.","status":true});
                } else {
                    return callback({"message":"No data found.","status":false});
                }
            });

        }).catch(err => {
          return callback(err);
        });
        
    },

    getAlltrade:function(params, callback) {
        // var measurement = 'bittrextrade';
        // if(params.exchange && params.exchange != '') {
        //     measurement = params.exchange+'trade';
        // }

        // var table = ["bittrextrade","bitstamprade"];


       
        const reader = client.queryRaw('select min(rate),sum(quantity),first(rate),sum(total),max(rate) from bittrextrade,bitstamptrade,binancetrade,bitfinextrade,cextrade,gdaxtrade,krakentrade,kucointrade,geminitrade where time > now() - 1h GROUP BY market_name,exchange ');
        // .addGroup('market_name','exchange')
        // // .addGroup('order_type')
        // .addFunction('min','rate')
        // .addFunction('max','rate')
        // .addFunction('first','rate')
        // .addFunction('sum','buyQty')
        // .addFunction('sum','sellQty');

        // reader.start = '-'+params.period;
        reader.then((data) => {

            // return callback(data);
            var arrData = [];
            data.results[0].series.forEach(function(aData) {
                var exchange = aData.tags.exchange;
                var pair = aData.tags.market_name;
                var exchange_id = exchange+"_"+pair.replace('-','_');

                arrData.push({'symbol_id':exchange_id,'pair':pair,'exchange':exchange,'volume':aData.values[0][2],'basevolume':aData.values[0][4],'first':aData.values[0][3],'high':aData.values[0][5],'low':aData.values[0][1]});

            });
                return callback({"data":arrData,"message":"Trade listing successfully.","status":true});
        }).catch(err => {
            console.log(err);
          return callback(err);
        });
        
    },

    getExchangeTradeBittrex:function(params, callback) {
        influent.createHttpClient({
                server: [
                    {
                        protocol: "https",
                        host:     "hillvalley-1cbb155a.influxcloud.net",
                        port:     8086
                    }
                ],
                username: "logistics@motocho.io",
                password: "ExchangeAPI",        
                database: "coinexchange"
            }).then(function(client) {
            var exchange = new ccxt.bittrex();
            // var orders = exchange.fetchTicker('ETH/BTC', 10);
            var markets = exchange.fetchTickers(); 
            markets.then(result => {
                var resArr = Object.values(result);
                // var i=1;
                resArr.forEach(function(val) {
                    
                    var orders = exchange.fetchTrades(val.symbol); 
                    var rrr = orders.then(result => {
                        result.forEach(function(data) {
                        console.log(data); 
                            client.write({
                                key: "tradecron",
                                tags: {
                                    market_name: data.symbol,
                                    order_type: data.side,
                                    exchange: "Bittrex"
                                },
                                fields: {
                                    rate: data.price,
                                    quantity: data.amount,
                                    timestamp: data.timestamp,      // is equal to new influent.Bool(true)
                                },
                                time: Date.now()
                            });   
                        });  
                        // return callback(result);
                    })
                    .catch((err) => {
                        console.log(err);
                        // return callback(err);
                    //   res.json({"message":"No data found","status":false});
                    });

                });

            });
        }).catch((err)=> {
            console.log(err);
        });
    },

    getExchangeTradeCEX:function(params, callback) {
        var exchange = new ccxt.cex();
            // var orders = exchange.fetchTicker('ETH/BTC', 10);
            var orders = exchange.fetchTrades('ETH/BTC'); 
            var rrr = orders.then(result => {
                console.log(result);
                return callback(result);
            })
            .catch((err) => {
                console.log(err);
                return callback(err);
            //   res.json({"message":"No data found","status":false});
            });
    },
    
    getExchangeTradePoloniex:function(params, callback) {
        
        var exchange = new ccxt.poloniex({
                                            'verbose': true,
                                            'proxy': 'https://cors-anywhere.herokuapp.com/',
                                            'origin': 'foobar',
                                        });
            // var orders = exchange.fetchTicker('ETH/BTC', 10);
            var orders = exchange.fetchTrades('ETH/BTC'); 
            var rrr = orders.then(result => {
                console.log(result);
                return callback(result);
            })
            .catch((err) => {
                console.log(err);
                return callback({'data':err,'status':false});
            //   res.json({"message":"No data found","status":false});
            });
    },
};

module.exports=Trade;