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

          <div class="ui small form">
            <div class="field">
              <label>Ethereum address</label>
              <textarea
                rows="2"
                v-model="device_id"
                :readonly="is_address_readonly"
                placeholder="Please enter the address"
              ></textarea>
            </div>

            <button
              class="ui mini button"
              :class="is_address_readonly?'red':'green'"
              type="button"
              @click="saveETHAddress"
            >{{actionAddressText}}</button>

            <button
              v-if="actionAddressText =='Save'"
              class="ui mini button"
              type="button"
              @click="cancelEditETHAddress"
            >Cancel</button>
          </div>

        </div>
      </div>
    </a>
    <a class="item">
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
          name="is_uploadable"
          v-model="is_uploadable"
          @change="switchUploadData"
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
      device_id: "",
      is_uploadable: true,
      is_address_readonly: true
    }
  },
  async created () {
    console.log('created HOME');
    let { device_id } = await this.getStorageData(['device_id']);

    if (!device_id) {
      console.log("go get started");
      this.$router.push({ path: "get-started" });
    }
  },
  async mounted () {
    // apply accordion for menu item
    $('.ui.accordion').accordion();

    // get [Set to upload data enable switch]
    let storage_data = await this.getStorageData(['device_id', 'is_uploadable']);
    if (storage_data.is_uploadable === false) {
      this.is_uploadable = false;
    }

    if (storage_data.device_id) {
      this.device_id = storage_data.device_id;
    }

    this.is_address_readonly = this.device_id ? true : false;

  },
  methods: {
    async switchUploadData () {
      await this.setStorageData({ is_uploadable: this.is_uploadable });

      //stop/resume tracking user for all opened tabs
      this.executeScriptEveryTabs({ file: "js/opt_inout.js" });
    },
    async saveETHAddress () {

      // change to edit mode
      if (this.is_address_readonly) {
        this.is_address_readonly = false;
      } else {
        this.is_address_readonly = true;
        await this.setStorageData({ device_id: this.device_id });
      }
    },
    async cancelEditETHAddress () {
      let { device_id } = await this.getStorageData(['device_id']);
      this.device_id = device_id;
      this.is_address_readonly = true;
    }
  },
  computed: {
    actionAddressText () {
      return this.device_id && this.is_address_readonly ? "Edit" : "Save";
    }
  }
}
</script>
