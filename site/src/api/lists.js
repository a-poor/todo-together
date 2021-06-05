
export async function getLists(token) {
    const res = await fetch(
        "/api/lists",
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": token,
            }
        }
    );
    const data = await res.json();
    return data.lists;
}

export async function newList(name, items = [], token = undefined) {
    const res = await fetch(
        "/api/lists/new",
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                name,
                items: items.map(i => ({text: i}))
            })
        }
    );
    const data = await res.json();
    return data.list;
}

export async function getList(listId, token) {
    const res = await fetch(
        `/api/lists/${listId}`,
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": token
            }
        }
    );
    const data = await res.json();
    return data.list;
}

export async function updateList(listId, data, token) {
    const res = await fetch(
        `/api/lists/${listId}`,
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(data)
        }
    );
    const data = await res.json();
    return data.list;
}

export async function deleteList(listId, token) {
    const res = await fetch(
        `/api/lists/${listId}`,
        {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Authorization": token
            }
        }
    );
    const data = await res.json();
    return data.success;
}

