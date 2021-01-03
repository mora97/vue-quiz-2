import axios from 'axios'
import {
    BASE_URL,
    converObjectToArray,
    convertArrayToObject,
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
        backUpPosts: [],
        newPost: {
            id: '',
            description: '',
            img: '',
        }
    },
    mutations: {
        addPost(state, post) {
            state.posts.splice(0, 0, post)
            state.backUpPosts.splice(0, 0, post)
        },
        deletePost(state, postIndex) { //delete selected post
            state.posts.splice(postIndex, 1)
            state.backUpPosts.splice(postIndex, 1)
        },
        setDeleteSelectedPost(state, deletePost) { //store index and id of selected post for deleteing
            state.deletePost = deletePost
        },
        setPosts(state, posts) {
            state.posts = posts
            if (state.posts.length % 2 !== 0) {
                state.posts.push({
                    id: '-1',
                    title: {
                        text: ''
                    },
                    img: '',
                    description: ''
                })
            }
        },
        setBackUpPosts(state, posts) {
            state.backUpPosts = posts
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
        getDeleteSelectedPost(state) { //return selected post's id and index for deleteing
            return state.deletePost
        },
        getPosts: state => {
            return state.posts.length !== 0 ? state.posts : []
        },
        getBackUpPosts: state => {
            return state.backUpPosts.length !== 0 ? state.backUpPosts : []
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
            result = converObjectToArray(result.data)
            let length = result.length
            commit('setNewPost', {
                id: Number(result[length - 1].id) + 1,
                description: result[length - 1].description,
                img: result[length - 1].img
            })
            commit("setPosts", result)
            commit("setBackUpPosts", result)
        },
        async asyncDeletePost({
            commit,
            getters
        }) {
            let deletedPost = getters.getDeleteSelectedPost
            commit("deletePost", deletedPost.index)
            let posts = await convertArrayToObject(getters.getBackUpPosts, "id")
            await axios.put(BASE_URL, posts).then(response => handleResponse(response)).catch(error => handleError(error))
            commit('setDeleteModalState')
            commit('setHintModalState', {
                text: 'the deleted successfully',
                state: true
            })
            // await axios.delete(`${BASE_URL}/${deletedPost.id}`).then(response => handleResponse(response)).catch(error => handleError(error))
        },
        async asyncQeuryPost({
            commit,
            getters
        }, queryText) {
            let posts = getters.getBackUpPosts
            let text = queryText.toLowerCase()
            let result = await posts.filter(post => {
                let title = post.title.text.toLowerCase()
                let description = post.description.toLowerCase()
                return (title.includes(text, 0) || description.includes(text, 0))
            })
            // let result = await axios.get(`${BASE_URL}?q=${queryText}`).then(response =>
            //     handleResponse(response)
            // ).catch(error => handleError(error))

            console.log(queryText);
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
            console.log(newPost);
            commit('addPost', newPost)
            let posts = await convertArrayToObject(getters.getBackUpPosts, "id")
            await axios.put(BASE_URL, posts).then(response => handleResponse(response)).catch(error => handleError(error))
            console.log(posts);
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