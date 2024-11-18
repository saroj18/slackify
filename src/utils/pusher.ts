import pusherServer from "pusher";
import pusherClient from "pusher-js";

export const PUSHER_SERVER = new pusherServer({
  appId: "1897792",
  key: "5a39b3d345faa833cb04",
  secret: "de061b48ddb5b64db7c1",
  cluster: "mt1",
  useTLS: true,
});

export const PUSHER_CLIENT = new pusherClient("5a39b3d345faa833cb04", {
  cluster: "mt1",
});
