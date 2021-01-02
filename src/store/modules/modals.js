export default {
    state: {
        modal: {
            state: false,
            text: ''
        },
        deleteModal: {
            stat: false
        }
    },
    mutations: {
        setHintModalState(state, modalState) {
            console.log(state.modal);
            state.modal.state = modalState.state
            state.modal.text = modalState.text
        },
        setDeleteModalState(state) {
            state.deleteModal.state = !state.deleteModal.state
        },
    },
    getters: {
        getHintModalState: state => {
            return state.modal.state
        },
        getHintModalText: state => {
            return state.modal.text
        },
        getDeleteModalState(state) {
            return state.deleteModal.state
        },
    },
    actions: {

    }
}