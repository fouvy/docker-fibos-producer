var fibos = require('fibos');
var fs = require("fs");
var conf = require("./config_producer.js")

var config = {
        "producer-name":conf["producer-name"],
        "public-key": conf["producer-pubKey"],
        "private-key": conf["producer-priKey"]
};

var chain = {
    'chain-state-db-size-mb': 8192,
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

if(!isExist) {
    chain["genesis-json"] = "/fibos/genesis.json";
}

fibos.load("http", {
     "http-server-address": "0.0.0.0:8870",
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "Content-Type",
    "http-validate-host": false,
    "verbose-http-errors": true,
});

fibos.load("net", {
        "max-clients":0,
        "p2p-listen-endpoint": "0.0.0.0:9870",
        "p2p-peer-address": [
            "p2p.mainnet.fibos.me:80",
            "fibos-node.slowmist.io:9870",
            "p2p-mainnet.fibos123.com:9977"
        ]
});

fibos.load("producer");
/* 超级节点的话，使用下面这部分代码，注释掉上面一行代码
fibos.load("producer", {
        'producer-name': config["producer-name"],
        'enable-stale-production': true,
        'private-key': JSON.stringify([config["public-key"], config["private-key"]])
});*/


fibos.load("chain", chain);
fibos.load("chain_api");

// history section
fibos.load("history");
fibos.load("history_api")

fibos.start();
