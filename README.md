# Setup

Start NATS container, `-js` activates JetStream. You can also add `-DV` for additional logs and traces or `-d` for detached mode.

```sh
docker run --name=nats-demo -p 4444:4444 nats -p 4444 -js
```

Install package dependencies with `npm install`, `pnpm i` or `yarn install`.

## Try

First run `pnpm nats:init` for setting NATS.

- Adds stream
- Defines consumer

Start few receiver instances by running `pnpm nats:listen` in different terminals.

Publish messages by running `pnpm nats:publish`

- Press `r` to publish messages.
