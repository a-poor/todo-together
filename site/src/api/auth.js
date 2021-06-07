
async function authUser(username, password) {
    const user = {
        username,
        password,
    };
    const res = await fetch(
        "/api/auth",
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        }
    )
    return await res.json();
    // const data = await res.json();
    // return `Bearer ${data.token}`;
}
exports.authUser = authUser;


function fmtToken(token) {
    return `Bearer ${token}`;
}
exports.fmtToken = fmtToken;

