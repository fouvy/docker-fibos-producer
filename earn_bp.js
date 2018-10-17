var FIBOS = require("fibos.js");
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

var result = fibos.claimrewardsSync(conf['producer-name'])
