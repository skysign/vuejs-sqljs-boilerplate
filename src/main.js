// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import App from './App'

Vue.use(Vuex)
Vue.use(VueResource)

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    dbFile: null,
    db: null,
    values: []
  },
  mutations: {
    increment (state) {
      state.count++
    },
    GET_DBFILE (state, dbFile) {
      console.log('begin GET_DBFILE mutations in store')
      this.state.dbFile = dbFile
      console.log('this length ' + this.state.dbFile.length)
      console.log('end GET_DBFILE mutations in store')
    }
  },
  actions: {
    getDBFile ({ commit }, { self }) {
      console.log('begin getDBFile')
      // Vue.http.get('http://localhost:8080/assets/mytest.db', {responseType: 'arraybuffer'})
      Vue.http.get('http://localhost:8080/src/assets/mytest.db', {responseType: 'arraybuffer'})
                  .then((response) => {
                    console.log('begin http.get')
                    console.log(response)
                    console.log('end http.get')
                    let rawDataDBFile = new Uint8Array(response.body)

                    console.log('begin data')
                    console.log('data length ' + rawDataDBFile.length)
                    // console.log(mymdata)
                    console.log('end data')
                    let dataDBFile = []
                    for (let i = 0; i < rawDataDBFile.length; ++i) {
                      dataDBFile[i] = String.fromCharCode(rawDataDBFile[i])
                    }

                    commit('GET_DBFILE', dataDBFile.join(''))

                    self.DBFileIsLoaded()
                    console.log('end getDBFile in store')
                  })
                .catch((error) => {
                  console.log('begin error')
                  console.log(error.statusText)
                  console.log('end error')
                })
      console.log('end getDBFile')
    },
    nextChild ({ commit }, { idxChildNext }) {
      commit('NEXT_CHILD', idxChildNext)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
