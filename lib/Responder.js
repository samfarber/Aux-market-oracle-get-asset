"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require('request');
function requestPromise(url, method = "GET", headers = -1, data = -1) {
    var trans = {
        method: method,
        url: url,
    };
    if (headers != -1)
        trans.headers = headers;
    if (data != -1) {
        trans.data = data;
        trans.json = true;
    }
    return new Promise((resolve, reject) => {
        request(trans, (err, response, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}
async function getResponse(query, params) {
    var symbol = params[0] ? params[0] : "BTC";
    var currency = params[1] ? params[1] : "USD";
    var extraCurrencies = "";
    var counter = 2;
    while (params[counter]) {
        extraCurrencies += "," + params[counter];
        counter++;
    }
    const apiKey = 'e3b3e62b-5f51-49b8-921e-f1135c8f5dec';
    var url = "https://min-api.cryptocompare.com/data/price?fsym=" + symbol + "&tsyms=" + currency + extraCurrencies;
    var body = await requestPromise(url, "GET", { "Apikey": apiKey });
    const json = JSON.parse(body);
    var num = new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, minimumSignificantDigits: 2 }).format(json[currency]);
    console.log("JSON", json[currency]);
    return ["The current price of " + symbol + " is: " + num + " " + currency];
    // var url:string = "https://api.coindesk.com/v1/bpi/currentprice/" + currency + ".json";
    // var body:any = await requestPromise(url);
    // const json:any = JSON.parse(body);
    // var obj:any = json["bpi"][currency];
    // if (!obj) {
    //   obj = json["bpi"]["USD"];
    //   currency = "USD";
    // }
    // console.log("JSON", json);
    // var num = new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(obj["rate_float"]);
    //
    // return ["The current price of BTC is: " + num + " " + obj["description"] + "s"];
}
exports.getResponse = getResponse;
