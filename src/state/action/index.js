export const hideComponent = (hiddenState) => {
    return (dispatch) => {
        dispatch({
            type: 'HIDE',
            payload: hiddenState
        })
    }
}

export const unhideComponent = (hiddenState) => {
    return (dispatch) => {
        dispatch({
            type: 'UNHIDE',
            payload: hiddenState
        })
    }
}