# ToDo-Together

_created by Austin Poor_


## Endpoints

| Endpoint | Method | Description |
|-|-|-|
|`/`| `GET` | Check the status of the API & get version |
|`/auth`| `POST` | Login with `user/pass` and get JWT |
|`/users`| `GET` | Get a list of users |
|`/users/new`| `POST` | Create a new user |
|`/users/{userid}`| `GET` | Get info on a specific user |
|`/users/{userid}`| `PUT` | Update user's info |
|`/lists`| `GET` | Get a list of lists. |
|`/lists/new`| `POST` | Create a new list |
|`/lists/{listid}`| `GET` | Get info on a list. |
|`/lists/{listid}`| `PUT` | Update list info. |
|`/lists/{listid}`| `DELETE` | Delete a list. |



## Instructions to Run

Build and deploy the for the first time:

```bash
$ sam build
$ sam deploy --guided
```

Run functions locally and invoke them with the `sam local invoke` command.

```bash
$ sam local invoke HelloWorldFunction --event events/event.json
```

The SAM CLI can also emulate your application's API. Use the `sam local start-api` to run the API locally on port 3000.

```bash
$ sam local start-api
$ curl http://localhost:3000/
```

Fetch logs with:

```bash
$ sam logs -n HelloWorldFunction --stack-name todo-together --tail
```

Cleanup with:

```bash
aws cloudformation delete-stack --stack-name todo-together
```

