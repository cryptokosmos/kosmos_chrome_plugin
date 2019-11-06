//set device id/address
chrome.storage.sync.get(['device_id', 'is_uploadable'], function (data) { //获得storage的数据，然后存储

    if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError);
        return Error(chrome.runtime.lastError.message);
    };

    console.log("get device id : " + data.device_id);

    let config = {
        debug: true,
        //provide your app key
        app_key: "a58efc48ebb1e7b234d7338d3fd01ed1adc411e9",
        //provide your server IP or name
        url: "https://data.zhenpin.info"
    };

    if (data.device_id) {
        config.device_id = data.device_id;
    }

    if (data.is_uploadable === false) {
        console.log("ignore this current visitor");
        config.ignore_visitor = true;
    }

    console.log("config info : ");
    console.log(config);

    Countly.init(config);

    if (!data.device_id) {

        chrome.storage.sync.set({ device_id: Countly.device_id, is_uploadable: true }, function () {
            console.log("set device id : " + Countly.device_id);
        });
    }

    //track sessions automatically
    Countly.track_sessions();
    //track pageviews automatically
    Countly.track_pageview();
});