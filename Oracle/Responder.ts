const request = require('request');


function requestPromise(url:string, method:any = "GET", headers:any = -1, data:any = -1) {
    var trans:any = {
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
        request(trans, (err:any, response:any, data:any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}

export async function getResponse(query:string,params:string[]|[]){
  var symbol = params[0] ? params[0] : "BTC";
	var currency = params[1] ? params[1] : "USD";
  var extraCurrencies = "";
  var counter = 2;
  while (params[counter]) {
    extraCurrencies += "," + params[counter];
    counter++;
  }


  const apiKey:string ='e3b3e62b-5f51-49b8-921e-f1135c8f5dec';
	var url:string = "https://min-api.cryptocompare.com/data/price?fsym=" + symbol + "&tsyms=" + currency + extraCurrencies;
	var body:any = await requestPromise(url, "GET", {"Apikey" : apiKey});
	const json:any = JSON.parse(body);
  var num = new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, minimumSignificantDigits: 2 }).format(json[currency]);
  console.log("JSON", json[currency]);

  return ["The current price of " + symbol + " is: " + num + " " + currency];

}
