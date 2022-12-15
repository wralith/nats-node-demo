import { connect, consumerOpts, createInbox, StringCodec } from "nats"

const decode = (data: Uint8Array, parse?: boolean) =>
  parse ? JSON.parse(StringCodec().decode(data)) : StringCodec().decode(data)

async function receive() {
  const address = process.env.NATS_ADDRESS ?? "localhost:4444"
  const conn = await connect({ servers: address })
  const js = conn.jetstream()
  console.log("Receiver connected to NATS")

  const opts = consumerOpts()
  opts.queue("demo-queue")
  opts.bind("demo", "demo-dr")

  let sub = await js.subscribe("demo.message", opts)

  const fn = (async () => {
    for await (const m of sub) {
      console.log(decode(m.data, true))
      m.ack()
    }
  })()
}

receive()
