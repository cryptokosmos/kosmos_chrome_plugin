<template>
  <div class="ui container">
    <div class="ui mini breadcrumb">
      <a class="section">Home</a>
      <i class="right chevron icon divider"></i>
      <div class="active section">Filter sensitive data</div>
    </div>
    <div class="ui divider"></div>

    <div class="ui small form">
      <div class="required inline field">
        <div class="ui checkbox">
          <input
            type="checkbox"
            class="hidden"
            checked
          >
          <label>GDPR</label>
        </div>
        <br><a
          href="https://gdpr.eu/what-is-gdpr/"
          target="_blank"
        >What is GDPR ?</a>
      </div>
      <div class="grouped fields">
        <label for="customSensitiveData">Add sensitive data</label>
        <div class="field">
          <div class="ui checkbox checked">
            <input
              type="checkbox"
              name="customSensitiveData"
              checked=""
            >
            <label>IP Address</label>
          </div>
        </div>
        <div class="field">
          <div class="ui checkbox">
            <input
              type="checkbox"
              name="customSensitiveData"
            >
            <label>Email</label>
          </div>
        </div>
        <div class="field">
          <div class="ui checkbox">
            <input
              type="checkbox"
              name="customSensitiveData"
            >
            <label>Specific URLs</label>
          </div>
        </div>
      </div>

      <button
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
      enableUpload: true
    }
  },
  mounted () {

  }
}
</script>
