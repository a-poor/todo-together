
async function listUsers(token) {
    const res = await fetch(
        "/api/users",
        {
            method: "GET",
            headers: {
                "Authorization": token
            }
        }
    );
    return await res.json();
    // const data = await res.json();
    // return data.users;
}
exports.listUsers = listUsers;

async function newUser(name, username, password) {
    const res = fetch(
        "/api/users/new",
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                username,
                password,
            })
        }
    );
    return await res.json();
    // const data = await res.json();
    // return data["user-id"];
}
exports.newUser = newUser;

async function getUser(userId, token) {
    const res = await fetch(
        `/api/users/${userId}`,
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": token,
            }
        }
    );
    return await res.json();
    // const data = await res.json();
    // return data.user;
}
exports.getUser = getUser;

