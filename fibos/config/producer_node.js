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
	    "p2p.otclook.com:9870",
	    "seed.bitze.site:9870",
	    "seed.fibos.icu:9870",
	    "47.74.181.212:27672",
	    "p2p.fometa.io:59877",
	    "p2p-mainnet.fibos123.com:9977",
	    "p2p-mainnet.fobp.pro:9873",
	    "va-p2p.fibos.io:9870",
	    "ca-p2p.fibos.io:9870",
	    "sl-p2p.fibos.io:9870",
	    "api.fibosgenesis.com:9870",
	    "p2p-mainnet.fibosironman.io:9999",
	    "fibosiseos.xyz:9870",
	    "47.92.122.2:9870",
	    "se-p2p.fibos.io:9870",
	    "seed.fibospubg.top:9870",
	    "seed.fibos.rocks:10100",
	    "seed-mainnet.fibscan.io:9103",
	    "p2p.mainnet.fibos.me:80",
	    "40.115.179.182:9870",
	    "p2p.foshenzhenbp.com:9877",
	    "p2p.xm.fo:10300",
	    "seed.franconofurd.top:9870",
	    "p2p-mainnet.ilovefibos.com:9876",
	    "seed.koalakoala.club:9870",
	    "p2p-mainnet.loveyy.xyz:9871",
	    "p2p.fibos.team:9876",
	    "ln-p2p.fibos.io:9870",
	    "seed.mapleroad.top:9870",
	    "seed.loveparis.icu:9870",
	    "seed.fiboso.com:9965",
	    "185.243.57.158:9870",
	    "seed.splo.top:9870",
	    "fibos.smr123.com:7890",
	    "fibos-p2p.slowmist.io:9870",
	    "http://superfibos.com:9870",
	    "to-p2p.fibos.io:9870",
	    "ppray.com:9870",
	    "p2p.fibosutility.com:9870",
	    "fibos.qubitfund.com:9870",
	    "p2p-mainnet.qingah.com:9876"
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
