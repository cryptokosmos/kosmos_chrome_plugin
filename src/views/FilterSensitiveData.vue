<template>
  <div class="ui container">
    <div class="ui mini breadcrumb">
      <a class="section">Home</a>
      <i class="right chevron icon divider"></i>
      <div class="active section">Filter sensitive data</div>
    </div>
    <div class="ui divider"></div>

    <div class="ui small form warning">
      <div class="ui warning message">
        <div class="header">GDPR’s consent</div>
        <p>We’re requesting access to your website access behavior. Before
          agreeing, please know that you can
          withdraw your consent at any time.</p>
        <input
          type="radio"
          id="is_consent_agree"
          style="display:none"
        />

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
      <div class="grouped fields">
        <label for="exclustionURLs">Add sensitive data</label>
        <div class="field">
          <label>Exclusion URLs</label>
          <span class="ui small text">This dictate on which web pages KOSMOS plugin should be disabled. One entry per line. Invalid directives will be silently ignored and removed.
          </span>
          <textarea
            name="exclustionURLs"
            placeholder="Please enter the URLs"
          ></textarea>
        </div>
      </div>

      <button
        @click="submit"
        class="ui mini green button"
        type="button"
      >Save</button>

      <router-link
        to="/"
        tag="button"
        class="ui mini button"
      >Back</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      is_consent_agree: false
    }
  },
  methods: {
    async submit () {
      let last_consent_status = document.querySelector("#is_consent_agree").checked;

      // if consent is changed
      if (this.is_consent_agree != last_consent_status) {
        await this.setStorageData({ is_consent_agree: this.is_consent_agree });

        // if allow
        if (this.is_consent_agree) {
          this.executeScriptEveryTabs({ code: "Countly.add_consent('all');" });
        } else {
          this.executeScriptEveryTabs({ code: "Countly.remove_consent('all');" });
        }
        this.$router.push({ path: "/" });
      }
    }
  },
  async created () {
    // load is_consent_agree value from storage
    let { is_consent_agree } = await this.getStorageData(['is_consent_agree']);
    this.is_consent_agree = is_consent_agree;

    // keep original value for comparing when submit form
    document.querySelector("#is_consent_agree").checked = is_consent_agree;
  }
}
</script>
