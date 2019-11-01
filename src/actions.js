import axios from "./axios";

export async function receiveFriendsWannabes() {
    const { data } = await axios.get("/friends-wannabes");
    return {
        type: "RECEIVE_FRIENDS_WANNABES",
        users: data
    };
}

export async function acceptFriendRequest(id) {
    await axios.post(`/accept-friend-request/${id}`);
    return {
        type: "ACCEPT",
        id: id
    };
}

export async function unfriend(id) {
    await axios.post(`/end-friendship/${id}`);
    return {
        type: "UNFRIEND",
        id: id
    };
}
