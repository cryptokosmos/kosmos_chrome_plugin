function isWildcardMatch (str, rule) { // convert wildcard to regex
    // for this solution to work on any string, no matter what characters it has
    let escapeRegex = (str) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");

    // "."  => Find a single character, except newline or line terminator
    // ".*" => Matches any string that contains zero or more characters
    rule = rule.split("*").map(escapeRegex).join(".*");

    // "^"  => Matches any string with the following at the beginning of it
    // "$"  => Matches any string with that in front at the end of it
    rule = "^" + rule + "$"

    //Create a regular expression object for matching string
    let regex = new RegExp(rule);

    //Returns true if it finds a match, otherwise it returns false
    return regex.test(str);
};

//set device id/address
chrome.storage.sync.get(['device_id', 'is_uploadable', 'is_consent_agree', 'exclustion_urls'], function (data) { //获得storage的数据，然后存储

    if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError);
        return Error(chrome.runtime.lastError.message);
    };

    // If already pass [get started] page
    if (data.device_id) {

        console.log("get device id : " + data.device_id);

        let config = {
            debug: true,
            //provide your app key
            app_key: "a58efc48ebb1e7b234d7338d3fd01ed1adc411e9",
            device_id: data.device_id,
            require_consent: true,
            //provide your server IP or name
            url: "https://data.zhenpin.info"
        };

        Countly.group_features({
            all: ["sessions", "events", "views", "scrolls", "clicks", "forms", "crashes", "attribution", "users"]
        });

        // check if exclustion urls
        const rules = data.exclustion_urls.split('\n');
        const tab_url = window.location.href.replace(/^https?:\/\//, '');

        for (let i = 0; i < rules.length; i++) {
            if (isWildcardMatch(tab_url, rules[i])) {
                // disable upload data if it is exclustion url
                config.ignore_visitor = true;
            }
        }

        // disable upload data
        if (data.is_uploadable === false) {
            config.ignore_visitor = true;
        }

        if (data.is_consent_agree === true) {
            Countly.add_consent("all");
        }

        Countly.init(config);

        //track sessions automatically
        Countly.track_sessions();
        //track pageviews automatically
        Countly.track_pageview();
        Countly.track_clicks();
        Countly.track_links();
        Countly.track_forms();

        //collect data from forms
        Countly.collect_from_forms();
    }
});
