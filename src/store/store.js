import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        cityname:'istanbul'
    },
    mutations:{
        change(state,name){
            state.cityname=name
        }
    }
    
})