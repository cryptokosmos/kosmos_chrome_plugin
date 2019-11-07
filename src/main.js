import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    getStorageData (key) {
      return new Promise((resolve, reject) =>
        chrome.storage.sync.get(key, data =>
          chrome.runtime.lastError
            ? reject(Error(chrome.runtime.lastError.message))
            : resolve(data)
        ))
    },
    setStorageData (data) {
      return new Promise((resolve, reject) =>
        chrome.storage.sync.set(data, () =>
          chrome.runtime.lastError
            ? reject(Error(chrome.runtime.lastError.message))
            : resolve()
        )
      )
    },
    async executeScriptEveryTabs (script) {
      let self = this;
      let { exclustion_urls } = await self.getStorageData(['exclustion_urls']);
      let rules = exclustion_urls.split('\n');
      rules.push("chrome:*");

      let is_exclustion_url = false;
      chrome.tabs.query({}, function (tabs) {
        tabs.forEach(tb => {
          is_exclustion_url = false;
          //igrone list of Chrome URLs
          for (let i = 0; i < rules.length; i++) {
            if (self.isWildcardMatch(tb.url.replace(/^https?:\/\//, ''), rules[i])) {
              is_exclustion_url = true;
            }
          }

          if (is_exclustion_url === false) {
            chrome.tabs.executeScript(tb.id,
              script);
          }

        });
      });
    },
    // convert wildcard to regex
    isWildcardMatch (str, rule) {
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
    }


  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
