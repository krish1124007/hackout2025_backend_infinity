import { Inngest } from "inngest";
import dotenv from "dotenv";

dotenv.config();

const inngest = new Inngest({
  id: "my-test-app",
  eventKey: process.env.INNGEST_EVENT_KEY,
});

(async () => {
  try {
    const res = await inngest.send({
      name: "test/event",
      data: { hello: "world" },
    });
    console.log("✅ Sent:", res);
  } catch (err) {
    console.error("❌ Failed:", err);
  }
})();
