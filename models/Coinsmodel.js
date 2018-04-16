var db=require('../dbconnection'); //reference of dbconnection.js
 
var Coins={
    getAllCoin:function(params, callback) {
        return db.query("SELECT ch.`id` as coin_id, ch.`exchange_id`, ch.`coin_name`, ch.`coin_symbol`, ch.`min_confirm`, ch.`transaction_fee`, ch.`coin_type`, ch.`status`, ch.`base_address` FROM coins as ch ",callback);
    },

    getAllCoinpair:function(params, callback) {
        return db.query("SELECT market_name FROM `market_summary` WHERE exchange_id = 1",callback);
    },
    getAllExchange:function(body, callback) {
        return db.query("SELECT ms.id as ms_id, CONCAT(e.name,'_',ms.market_name) as exchange_id, e.name as exchange, ms.market_name, ms.market_currency, ms.base_currency, ms.high, ms.low, ms.volume, ms.last, ms.change_24h, ms.base_volume, ms.bid, ms.ask, ms.open_buy_orders, ms.open_sell_orders, ms.prev_day, ch.min_confirm, ch.transaction_fee FROM market_summary_ccxt as ms INNER JOIN coins as ch ON ch.coin_symbol = ms.market_currency INNER JOIN exchanges as e ON e.id=ms.exchange_id WHERE ms.status=1 AND ms.exchange_id="+body.ex_id+"",callback);
    },
    getExchangeByCoin:function(params, body, callback) {
        return db.query("SELECT ms.id as ms_id, CONCAT(e.name,'_',ms.market_name) as exchange_id, e.name as exchange, ms.market_name, ms.market_currency, ms.base_currency, ms.high, ms.low, ms.volume, ms.last, ms.change_24h, ms.base_volume, ms.bid, ms.ask, ms.open_buy_orders, ms.open_sell_orders, ms.prev_day, ch.min_confirm, ch.transaction_fee FROM market_summary_ccxt as ms INNER JOIN coins as ch ON ch.coin_symbol = ms.market_currency INNER JOIN exchanges as e ON e.id=ms.exchange_id WHERE ms.status=1 AND ms.exchange_id="+body.ex_id+" AND ms.base_currency='"+params.name+"'",callback);
    },
    getSingleCoin:function(params, callback) {
        return db.query("SELECT ms.id as ms_id, ms.market_name, ms.market_currency, ms.base_currency, ms.high, ms.low, ms.volume, ms.last, ms.change_24h, ms.base_volume, ms.bid, ms.ask, ms.open_buy_orders, ms.open_sell_orders, ms.prev_day, ch.coin_name, ch.min_confirm, ch.transaction_fee FROM market_summary_ccxt as ms INNER JOIN coins as ch ON ch.coin_symbol = ms.market_currency WHERE ms.id="+params.ms_id,callback);
    },
    getAllExchangeData:function(body, params, callback) {
        var sorting = body.sorting;
        var exchangeCond = 'WHERE ms.status=1';
        if(body.ex_id != '') {
            exchangeCond = 'WHERE ms.status=1 AND ms.exchange_id='+body.ex_id;
        }
        if(sorting == 'coin') { 
            return db.query("SELECT ms.id as ms_id, CONCAT(e.name,'_',ms.market_name) as exchange_id, ms.market_currency as coin, e.name as exchange, ms.market_name, ms.base_currency, ms.high, ms.low, ms.volume, ms.last, ms.change_24h, ms.base_volume, ms.bid, ms.ask, ms.open_buy_orders, ms.open_sell_orders, ms.prev_day, ch.min_confirm, ch.transaction_fee FROM market_summary_ccxt as ms INNER JOIN coins as ch ON ch.coin_symbol = ms.market_currency INNER JOIN exchanges as e ON e.id=ms.exchange_id "+exchangeCond, callback);
        }
        else if(sorting == 'exchange') { 
            return db.query("SELECT ms.id as ms_id, CONCAT(e.name,'_',ms.market_name) as exchange_id, e.name as exchange, ms.market_currency as coin, ms.market_name, ms.base_currency, ms.high, ms.low, ms.volume, ms.last, ms.change_24h, ms.base_volume, ms.bid, ms.ask, ms.open_buy_orders, ms.open_sell_orders, ms.prev_day, ch.min_confirm, ch.transaction_fee FROM market_summary_ccxt as ms INNER JOIN coins as ch ON ch.coin_symbol = ms.market_currency INNER JOIN exchanges as e ON e.id=ms.exchange_id "+exchangeCond,callback);
        }
    },
    getExchangeBySorting:function(body, params, callback) {
        var basecoin = params.base;
        var sorting = body.sorting;
        var exchangeCond = '';
        if(body.ex_id != '') {
            exchangeCond = 'AND ms.exchange_id='+body.ex_id;
        }
        if(sorting == 'coin') { 

            return db.query("SELECT ms.id as ms_id, CONCAT(e.name,'_',ms.market_name) as exchange_id, ms.market_currency as coin, e.name as exchange, ms.market_name, ms.base_currency, ms.high, ms.low, ms.volume, ms.last, ms.change_24h, ms.base_volume, ms.bid, ms.ask, ms.open_buy_orders, ms.open_sell_orders, ms.prev_day, ch.min_confirm, ch.transaction_fee FROM market_summary_ccxt as ms INNER JOIN coins as ch ON ch.coin_symbol = ms.market_currency INNER JOIN exchanges as e ON e.id=ms.exchange_id WHERE ms.status=1 AND ms.base_currency='"+basecoin+"' "+exchangeCond, callback);
        }
        else if(sorting == 'exchange') { 
            return db.query("SELECT ms.id as ms_id, CONCAT(e.name,'_',ms.market_name) as exchange_id, e.name as exchange, ms.market_currency as coin, ms.market_name, ms.base_currency, ms.high, ms.low, ms.volume, ms.last, ms.change_24h, ms.base_volume, ms.bid, ms.ask, ms.open_buy_orders, ms.open_sell_orders, ms.prev_day, ch.min_confirm, ch.transaction_fee FROM market_summary_ccxt as ms INNER JOIN coins as ch ON ch.coin_symbol = ms.market_currency INNER JOIN exchanges as e ON e.id=ms.exchange_id WHERE ms.status=1 AND ms.base_currency='"+basecoin+"' "+exchangeCond,callback);
        }
    },

    getcoinlist:function(params, callback) {
        return db.query("SELECT ch.`coin_name`, ch.`coin_symbol` FROM coins as ch ",callback);
    },

    getexchangelist:function(params, callback) {
        return db.query("SELECT ex.`ex_id`, ex.`name` FROM exchanges as ex ",callback);
    },

};
 module.exports=Coins;