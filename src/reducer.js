export function reducer(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS_WANNABES") {
        state = {
            ...state,
            users: action.users
        };
    }
    if (action.type == "ACCEPT") {
        state = {
            ...state,
            users: state.users.map(user => {
                if (user.id == action.id) {
                    return {
                        ...user,
                        accepted: true
                    };
                } else {
                    return user;
                }
            })
        };
    }
    if (action.type == "UNFRIEND") {
        state = {
            ...state,
            users: state.users.filter(user => user.id != action.id)
        };
    }
    if (action.type == "CHAT_MESSAGES") {
        state = {
            ...state,
            chatMessages: action.messages.reverse()
        };
    }
    console.log("state: ", state);
    return state;
}

//action describes change that we want to make to redux
