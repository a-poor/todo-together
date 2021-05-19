# todo-together

_created by Austin Poor_



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

