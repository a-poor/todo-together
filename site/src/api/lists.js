
async function getLists(token) {
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
    return await res.json();
    // const data = await res.json();
    // return data.lists;
}
exports.getLists = getLists;

async function newList(name, items = [], token = undefined) {
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
    return await res.json();
    // const data = await res.json();
    // return data.list;
}
exports.newList = newList;

async function getList(listId, token) {
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
    return await res.json();
    // const data = await res.json();
    // return data.list;
}
exports.getList = getList;

async function updateList(listId, data, token) {
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
    return await res.json();
    // const res_data = await res.json();
    // return res_data.list;
}
exports.updateList = updateList;

async function deleteList(listId, token) {
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
    return await res.json();
    // const data = await res.json();
    // return data.success;
}
exports.deleteList = deleteList;

