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
    executeScriptEveryTabs (script) {
      chrome.tabs.query({}, function (tabs) {
        tabs.forEach(tb => {

          //igrone list of Chrome URLs
          if (!tb.url.startsWith("chrome://")) {
            chrome.tabs.executeScript(tb.id,
              script);
          }
        });
      });
    }

  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
