const { API_BASE } = require('./config');

console.log("API_BASE = "+API_BASE)

async function authUser(username, password) {
    const user = {
        username,
        password,
    };
    const res = await fetch(
        API_BASE+"/api/auth",
        {
            mode: "cors",
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin':'*',
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

