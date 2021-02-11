const DEFAULT_STATE = {
    name: '',
    counter: 10,
    score: 0
}

export default (state=DEFAULT_STATE, action) => {
    switch (action.type) {
        case "NEW_USER":
            return {...state, name: action.name}
        default:
            return state
    }
}