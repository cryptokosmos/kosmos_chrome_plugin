chrome.storage.sync.get(['is_uploadable'], function (data) {
  if (chrome.runtime.lastError) {
    console.log(chrome.runtime.lastError);
    return Error(chrome.runtime.lastError.message);
  };

  if (data.is_uploadable === false) {
    //to stop tracking user data call
    console.log("stop tracking user data call");
    Countly.opt_out();
  } else {
    //to resume tracking user data call
    console.log("resume tracking user data call");
    Countly.opt_in();
  }

});