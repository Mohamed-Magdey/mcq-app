export const newUser = name => ({
    type: "NEW_USER",
    name
});

export const increment = score => ({
    type: "INCREMENT_SCORE",
    score
})