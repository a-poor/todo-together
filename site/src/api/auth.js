
export async function authUser(username, password) {
    const data = {
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
            body: JSON.stringify(data)
        }
    )
    const data = await r.json();
    return `Bearer ${data.token}`;
}

