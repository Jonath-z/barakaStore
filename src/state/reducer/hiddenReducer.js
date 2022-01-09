const reducer = (state = false,action) => {
    switch (action.type) {
        case "HIDE":
            return true;
        case "UNHIDE":
            return false
        default:
            return state
     }
}
 
export default reducer;