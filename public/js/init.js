//set device id/address
chrome.storage.sync.get('address', function (data) { //获得storage的数据，然后存储
    console.log("get address" + data.address);

    Countly.init({
        debug: false,
        //provide your app key that you retrieved from Countly dashboard
        app_key: "a58efc48ebb1e7b234d7338d3fd01ed1adc411e9",
        //provide your server IP or name. Use try.count.ly for EE trial server.
        //if you use your own server, make sure you have https enabled if you use
        //https below.
        url: "https://data.zhenpin.info"
    });

    console.log(Countly.device_id);


    //track sessions automatically
    Countly.track_sessions();
    //track pageviews automatically
    Countly.track_pageview();

    if (data.address == null) { // 等同于 a === undefined || a === null,不设置device id
        console.log("为null");
    }
    else {
        //Countly.device_id = data.address;
    }

    console.log(Countly.device_id);


});