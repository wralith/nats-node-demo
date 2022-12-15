import { connect, NatsConnection, StringCodec } from "nats"
import readline from "readline"
import { randomData } from "./random"

readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)

const encode = (data: unknown) => StringCodec().encode(JSON.stringify(data))

const publish = async (c: NatsConnection) => {
  const js = c.jetstream()
  const data = randomData()
  await js.publish("demo.message", encode(data))
  console.log("Data published!")
}

async function main() {
  const address = process.env.NATS_ADDRESS ?? "localhost:4444"
  const conn = await connect({ servers: address })
  console.log("Publisher connected to NATS")
  console.log("Press 'r' to publish. Press 'ctrl+c' to exit.")

  process.stdin.on("keypress", async (_str, key) => {
    if (key.ctrl && key.name === "c") {
      await conn.close()
      console.log("Connection closed")
      process.exit(0)
    }
    if (key.name === "r") {
      await publish(conn)
    }
  })
}

main()
