var FIBOS = require('fibos.js');
var conf = require("./fibos/config/config_producer.js")
var config = {
        "chainId": conf.chainId,
        "producer-name": conf["producer-name"],
        "public-key":  conf["producer-pubKey"],
        "private-key": conf["producer-priKey"],
        "httpEndpoint": conf.httpEndpoint,
        "url": conf.url
};

var fibos = FIBOS({
        chainId: config["chainId"],
        keyProvider: config["private-key"],
        httpEndpoint: config["httpEndpoint"],
        logger: {
                log: null,
                error: null
        }
});

var ctx = fibos.contractSync("eosio");

ctx.regproducerSync(config["producer-name"], config["public-key"], config["url"], 1);

