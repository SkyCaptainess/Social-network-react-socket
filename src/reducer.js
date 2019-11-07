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
    if (action.type == "NEW_MESSAGE") {
        state = {
            ...state,
            chatMessages: state.chatMessages.concat(action.message)
        };
    }
    if (action.type == "RECEIVE_WALL_MESSAGES") {
        console.log("wall msg reducer: ", action.messages);
        state = {
            ...state,
            wallMessages: action.messages
        };
    }
    if (action.type == "RECEIVE_WALL_FRIENDSHIP") {
        console.log("RECEIVE_WALL_FRIENDSHIP reducer: ", action.messages);
        state = {
            ...state,
            friendship: action.friendship
        };
    }
    if (action.type == "RECEIVE_NEW_WALL_MESSAGE") {
        console.log("RECEIVE_NEW_WALL_MESSAGE reducer: ", action.message);
        state = {
            ...state,
            wallMessages: state.wallMessages.concat(action.message),
            toggle: !state.toggle
        };
    }
    // console.log("state: ", state);
    return state;
}

//action describes change that we want to make to redux
