export default (state=[], action) => {
    switch (action.type) {
        case "LOAD_QUESTIONS":
            return [...action.questions];
        case "REMOVE_ANSWER":
            return state.map((question, i) =>
                i === action.index
                    ? {...question, answers: question.answers.filter(val => val !== action.val)}
                    : question
            )
        default:
            return state;
    }
}