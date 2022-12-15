import { AckPolicy, connect, createInbox, JetStreamManager, NatsConnection } from "nats"

const addStream = async (m: JetStreamManager, name: string, subjects?: string[]) => {
  subjects ?? (subjects = [`${name}.*`])
  await m.streams.add({ name, subjects })
}

const addConsumer = async (
  m: JetStreamManager,
  stream: string,
  durableName: string,
  ack: boolean
) => {
  await m.consumers.add(stream, {
    durable_name: durableName,
    deliver_group: "demo-queue",
    ack_policy: ack ? AckPolicy.Explicit : AckPolicy.None,
    ack_wait: 5 * 1000 * 1000 * 1000, // Nano seconds
    deliver_subject: createInbox(),
  })
}

async function setup() {
  const address = process.env.NATS_ADDRESS ?? "localhost:4444"
  const conn = await connect({ servers: address })
  const manager = await conn.jetstreamManager()
  const streamName = "demo"

  await addStream(manager, streamName)
  await addConsumer(manager, streamName, "demo-dr", true)

  conn.close()
}

setup()
