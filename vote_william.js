var FIBOS = require("fibos.js");
var conf = require("./fibos/config/config_producer.js")
var config = {
    chainId: conf.chainId,
    priKey:  conf["producer-priKey"],
    httpEndpoint: conf.httpEndpoint,
    verbose: false,
}
var fibos = FIBOS({
    chainId: config.chainId,
    keyProvider: config.priKey,
    httpEndpoint: config.httpEndpoint,
    verbose: true,
    logger: {
        log: null,
        error: null
    }
})
var ctx = fibos.contractSync("eosio");

var vote_list = ['williamfouvy'].sort()

var a = ctx.voteproducerSync(conf["producer-name"], "", vote_list);
