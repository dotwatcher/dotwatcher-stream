import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "eu",
  encrypted: true,
});

module.exports = (req, res) => {
  // try {
  const payload = {
    post: req.body.sys.id,
    category: req.body.fields.race["en-US"].sys.id,
  };
  console.log("Post published event received", payload);
  pusher.trigger("dotwatcher", "new-post", payload);
  return res.status(200);
  // } catch (e) {
  //   res.status(500).send(`Error with payload: ${e}`);
  // }
};
