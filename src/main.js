import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    getStorageData (key) {
      return new Promise((resolve, reject) =>
        chrome.storage.sync.get(key, result =>
          chrome.runtime.lastError
            ? reject(Error(chrome.runtime.lastError.message))
            : resolve(result)
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

  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
