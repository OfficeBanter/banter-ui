const GETTING_TO_KNOW_YOU = "Getting to know you";
const SHARE_A_PHOTO = "Share a photo";
const OPINIONS_AND_DEBATES = "Opinions and Debate";
const BRAIN_TEASERS = "Brain Teasers";

const TAGS_SANDBOX = [
  {
    name: GETTING_TO_KNOW_YOU,
    img: "/assets/img/Smiling_Emoji.png",
    preview: "/assets/img/Getting_To_Know_You.png",
    description: "Simple opinion based questions",
    _id: "62795d80a0893096df01e1de",
  },
  {
    name: SHARE_A_PHOTO,
    img: "/assets/img/Selfie_Emoji.png",
    preview: "/assets/img/Share_A_Photo.jpg",
    description: "Share a photo based on a message",
    _id: "62795d80a0893096df01e1df",
  },
  {
    name: OPINIONS_AND_DEBATES,
    img: "/assets/img/Thinking_Emoji.png",
    preview: "/assets/img/Opinions_And_Debate.png",
    description: "Questions to know how you think",
    _id: "62795d80a0893096df01e1e0",
  },
  {
    name: BRAIN_TEASERS,
    img: "/assets/img/Mind_Blown.png",
    preview: "/assets/img/Brain_Teasers.jpg",
    description:
      "Get your brain working, these questions will test your knowledge",
    _id: "627c9267ab80717325f2d034",
  },
];

const TAGS_PROD = [
  {
    name: GETTING_TO_KNOW_YOU,
    img: "/assets/img/Smiling_Emoji.png",
    preview: "/assets/img/Getting_To_Know_You.png",
    description: "Simple opinion based questions",
    _id: "5fc0c54918074b1992264a8d",
  },
  {
    name: SHARE_A_PHOTO,
    img: "/assets/img/Selfie_Emoji.png",
    preview: "/assets/img/Share_A_Photo.jpg",
    description: "Share a photo based on a message",
    _id: "5fc0c54918074b1992264a8e",
  },
  {
    name: OPINIONS_AND_DEBATES,
    img: "/assets/img/Thinking_Emoji.png",
    preview: "/assets/img/Opinions_And_Debate.png",
    description: "Questions to know how you think",
    _id: "5fc0c54918074b1992264a8f",
  },
  {
    name: BRAIN_TEASERS,
    img: "/assets/img/Mind_Blown.png",
    preview: "/assets/img/Brain_Teasers.jpg",
    description:
      "Get your brain working, these questions will test your knowledge",
    _id: "627f078738e2f76aa0cf5449",
  },
];

export const TAGS =
  process.env.NODE_ENV === "production" ? TAGS_PROD : TAGS_SANDBOX;

export const DEFAULT_TAGS = TAGS.map((tag) => tag._id);
