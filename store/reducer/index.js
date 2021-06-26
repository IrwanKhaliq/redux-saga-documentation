const initialState = {
    data: "",
    // below state are used for future use
    error: "",
    loading: false,
};

const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'CHANGE_DATA_ON_REDUX':
            return {
                ...state,
                data: payload,
            }
        default:
            return state;
    }
};

export default reducer;
