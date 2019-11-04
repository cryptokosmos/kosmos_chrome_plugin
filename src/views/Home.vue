<template>
  <div class="ui fluid vertical menu">
    <a class="item">
      <!-- <i class="green chevron circle right icon"></i>
      <span><i class="green ethereum icon"></i>Fill in the Ethereum address</span> -->
      <div class="ui accordion">
        <div class="title">
          <i class="green ethereum icon"></i>
          Fill in the Ethereum address
        </div>
        <div class="content">
          <div class="ui mini fluid action input">
            <input
              type="text"
              value="0x86d9FD0B8E75063ACB3455001aa4b09aEdaD21c0"
              placeholder="Please enter the address"
            >
            <button
              class="ui mini green icon button"
              data-tooltip="Save"
            >
              <i class="save icon"></i>
            </button>
          </div>
        </div>
      </div>
    </a>
    <a class="item">
      <!-- <i class="green chevron circle right icon"></i>
      <span><i class="green money check icon"></i>KMS balance inquiry</span> -->
      <div class="ui accordion">
        <div class="title">
          <i class="green money check icon"></i>KMS balance inquiry<i class="blue spinner loading icon"></i>
        </div>
        <div class="content">
          <div class="ui mini fluid left icon right labeled input">
            <input
              type="text"
              value="9999"
              readonly
            >
            <div class="ui basic label">ETH</div>
            <i class="green ethereum icon"></i>
          </div>
        </div>
      </div>
    </a>
    <router-link
      class="item"
      to="/filter-data"
    >
      <i class="green chevron circle right icon"></i>
      <span><i class="green shield alternate icon"></i>Filter sensitive data</span>
    </router-link>
    <a
      class="item"
      style="display: flex;"
    >

      <span><i class="green cloud upload alternate icon"></i>Set to upload data enable switch</span>

      <div
        class="ui fitted toggle checkbox"
        style="margin-left: auto;"
      >
        <input
          type="checkbox"
          name="enableUpload"
        >
        <label></label>
      </div>
    </a>
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
    $('.ui.accordion')
      .accordion()
      ;

  }
}
</script>
