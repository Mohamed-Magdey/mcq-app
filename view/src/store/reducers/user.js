const DEFAULT_STATE = {
    name: '',
    score: 0
}

export default (state=DEFAULT_STATE, action) => {
    switch (action.type) {
        case "NEW_USER":
            return {...state, name: action.name}
        case "INCREMENT_SCORE":
            return {...state, score: action.score}
        default:
            return state
    }
}