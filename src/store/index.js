import {
    createStore
} from 'vuex'
import Posts from './modules/posts'
import Modals from './modules/modals'

export default createStore({
    state: {},
    mutations: {},
    getters: {},
    actions: {},
    modules: {
        Posts,
        Modals
    }
})