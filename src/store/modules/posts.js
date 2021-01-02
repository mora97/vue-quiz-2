import axios from 'axios'
import {
    BASE_URL,
    handleError,
    handleResponse
} from '../utils';

export default {
    state: {
        modal: {
            state: false,
            text: ''
        },
        deleteModal: {
            stat: false
        },
        deletePost: {
            id: '',
            index: Number
        },
        posts: [],
        newPost: {
            id: '',
            description: '',
            img: '',
        }
    },
    mutations: {
        addPost(state, post) {
            state.posts.splice(1, 0, post)
        },
        deletePost(state, postIndex) {
            state.posts.splice(postIndex, 1)
        },
        setDeletePost(state, deletePost) {
            state.deletePost = deletePost
        },
        setPosts(state, posts) {
            state.posts = posts
        },
        setNewPost(state, newPost) {
            state.newPost = newPost
        },
        setNewPostTitle(state, text) {
            state.newPost = {
                ...state.newPost,
                title: {
                    text: text
                }
            }
        }
    },
    getters: {
        getDeletePost(state) {
            return state.deletePost
        },
        getPosts: state => {
            return state.posts.length !== 0 ? state.posts : []
        },
        getNewPost: state => {
            return state.newPost
        }
    },
    actions: {
        async asyncGetPosts({
            commit
        }) {
            let result = await axios.get(BASE_URL).then(response => handleResponse(response)).catch(error => handleError(error))
            let length = result.length
            commit('setNewPost', {
                id: Number(result[length - 1].id) + 1,
                description: result[length - 1].description,
                img: result[length - 1].img
            })
            commit("setPosts", result)
        },
        async asyncDeletePost({
            commit,
            getters
        }) {
            let deletedPost = getters.getDeletePost
            await axios.delete(`${BASE_URL}/${deletedPost.id}`).then(response => handleResponse(response)).catch(error => handleError(error))
            commit("deletePost", deletedPost.index)
            commit('setDeleteModalState')
        },
        async asyncQeuryPost({
            commit
        }, queryText) {
            let result = await axios.get(`${BASE_URL}?q=${queryText}`).then(response =>
                handleResponse(response)
            ).catch(error => handleError(error))
            commit("setPosts", result)
            if (result.length === 0) {
                commit('setNewPostTitle', queryText)
            }
        },
        async asyncCreatePost({
            commit,
            getters
        }) {
            let newPost = getters.getNewPost;
            newPost = {
                ...newPost,
                color: '#' + Math.floor(Math.random() * 16777215).toString(16)
            }
            await axios.post(BASE_URL, newPost).then(response => handleResponse(response)).catch(error => handleError(error))
            commit('addPost', newPost)
            commit('setNewPost', {
                ...newPost,
                id: newPost.id + 1
            })
            commit('setHintModalState', {
                state: true,
                text: 'added succesfully'
            })

        }
    }
}