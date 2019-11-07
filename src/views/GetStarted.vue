<template>
  <div class="ui container">
    <div class="ui mini breadcrumb">
      <a class="section">Home</a>
      <i class="right chevron icon divider"></i>
      <div class="active section">Getting Started</div>
    </div>
    <div class="ui divider"></div>

    <div class="ui small form warning">
      <div class="required field">
        <label>Ethereum address</label>
        <textarea
          rows="2"
          v-model.trim="device_id"
          placeholder="Please enter the address"
        ></textarea>
      </div>
      <div class="ui warning message">
        <div class="header">GDPR’s consent</div>
        <p>We’re requesting access to your website access behavior. Before
          agreeing, please know that you can
          withdraw your consent at any time.</p>
      </div>
      <div class="inline fields">
        <div class="field">
          <div class="ui radio checkbox">
            <input
              type="radio"
              :value="false"
              v-model="is_consent_agree"
            >
            <label>I DECLINE</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input
              type="radio"
              :value="true"
              v-model="is_consent_agree"
            >
            <label>I ACCEPT</label>
          </div>
        </div>
      </div>

      <button
        @click="submit"
        class="ui mini green button"
        :class="canGoNext?'':'disabled'"
        type="button"
      >Next</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      device_id: "",
      is_consent_agree: false
    }
  },
  methods: {
    async submit () {
      await this.setStorageData({ device_id: this.device_id, is_consent_agree: this.is_consent_agree, exclustion_urls: "" });
      this.executeScriptEveryTabs({ file: "js/init.js" });
      this.$router.push({ path: "/" });
    }
  },
  computed: {
    canGoNext () {
      return (this.device_id.length > 0);
    }
  }
}
</script>
