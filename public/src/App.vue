<template>
  <div>
    <head>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    </head>
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="container" v-if="ready">
      <div class="row">
        <div class="col-sm-12">
          <h1>Advanced storage</h1>
          <div class="form-group">
            <label for="addDataInput">Add data (integer)</label>
            <input v-model="newData" id="addDataInput" type="number" class="form-control">
          </div>
          <button @click="setData" type="submit" class="btn btn-primary">Submit</button>
          <hr>
          <div>Data: <span id="data"> {{ data }} </span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { initWeb3, initContract} from './utils.js'

export default {
  name: 'App',
  data() {
    return {
      ready: false,
      accounts: false,
      advancedStorage: null,
      data: null,
      newData: null
    }
  },
  async mounted() {
    const web3 = await initWeb3();
    this.advancedStorage = await initContract(web3);

    await web3.eth.getAccounts().then(accounts => {
      this.accounts = accounts;
    });

    await this.getData();
    
    this.ready = true;
  },
  methods: {
    async setData() {
      return this.advancedStorage.methods
        .add(this.newData)
        .send({from: this.accounts[0]})
        .then(() => {
          return this.getData();
        });
    },
    async getData() {
      return this.advancedStorage.methods.getAll().call().then(result => {
        this.data = result.join(', ');
      });
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
