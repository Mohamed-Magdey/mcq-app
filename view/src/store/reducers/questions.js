export default (state=[], action) => {
    switch (action.type) {
        case "LOAD_QUESTIONS":
            return [...action.questions];
        default:
            return state;
    }
}