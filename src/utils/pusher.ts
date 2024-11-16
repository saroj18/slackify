import pusherServer from "pusher";
import pusherClient from "pusher-js";

export const PUSHER_SERVER = new pusherServer({
  appId: "1889026",
  key: "868004cc78c025b214d4",
  secret: "af00b3fff5d74d467472",
  cluster: "ap2",
  useTLS: true,
});

export const PUSHER_CLIENT = new pusherClient("868004cc78c025b214d4", {
  cluster: "ap2",
});
