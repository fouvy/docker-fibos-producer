var fibos = require('fibos');
var fs = require("fs");
var conf = require("./config_producer.js")

var config = {
        "producer-name":conf["producer-name"],
        "public-key": conf["producer-pubKey"],
        "private-key": conf["producer-priKey"]
};

console.notice("正在启动FIBOS name:", config["producer-name"]);

fibos.config_dir = "/data";
fibos.data_dir = fibos.config_dir

console.notice("config_dir:", fibos.config_dir);
console.notice("data_dir:", fibos.data_dir);

var isExist = false

if (fs.exists(fibos.data_dir) && fs.exists(fibos.data_dir+"/blocks")) {
        isExist = true
        console.warn("data_dir or config_dir is exists");
}

fibos.load("http", {
        "http-server-address": "0.0.0.0:8870"
});

fibos.load("net", {
        "max-clients":0,
        "p2p-listen-endpoint": "0.0.0.0:9870",
        "p2p-peer-address": [
            "p2p.foshenzhenbp.com:9877",
            "p2p.mainnet.fibos.me:80",
            "fibos-node.slowmist.io:9870",
            "p2p-mainnet.fibos123.com:9977"
        ]
});

//fibos.load("producer");
/* 超级节点的话，使用这部分代码，注释掉上面一行代码*/
fibos.load("producer", {
        'producer-name': config["producer-name"],
        'enable-stale-production': true,
        'private-key': JSON.stringify([config["public-key"], config["private-key"]])
});

if (!isExist) {
        fibos.load("chain",{"genesis-json":"/fibos/genesis.json"});
}
else {
        fibos.load("chain")
}

fibos.load("chain_api");
fibos.load("wallet");
fibos.load("wallet_api");

fibos.start();
