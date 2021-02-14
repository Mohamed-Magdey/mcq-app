import axios from 'axios';

export const loadQuestions = questions => ({
    type: "LOAD_QUESTIONS",
    questions
});

function apiCall(method, path, data) {
    return new Promise((resolve, reject) => {
        return axios[method](path, data)
            .then(res => {
                return resolve(res.data)
            })
            .catch(err => {
                return reject(err.response);
            })
    });
}

export default function fetchQuestions() {
    return dispatch => {
        return apiCall("get", 'https://mcq-server.herokuapp.com/')
            .then(res => dispatch(loadQuestions(res)))
            .catch(err => console.log("Error: " + err));
    }
}