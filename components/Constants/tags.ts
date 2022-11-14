const GETTING_TO_KNOW_YOU = "Getting to know you";
const SHARE_A_PHOTO = "Share a photo";
const OPINIONS_AND_DEBATES = "Opinions and Debate";
const BRAIN_TEASERS = "Brain Teasers";

export const DEFAULT_TAGS = [
  GETTING_TO_KNOW_YOU,
  SHARE_A_PHOTO,
  OPINIONS_AND_DEBATES,
  BRAIN_TEASERS,
];

const TAGS_SANDBOX = [
  {
    name: GETTING_TO_KNOW_YOU,
    img: "",
    preview: "",
    description: "",
    _id: "62795d80a0893096df01e1de",
  },
  {
    name: SHARE_A_PHOTO,
    img: "",
    preview: "",
    description: "",
    _id: "62795d80a0893096df01e1df",
  },
  {
    name: OPINIONS_AND_DEBATES,
    img: "",
    preview: "",
    description: "",
    _id: "62795d80a0893096df01e1e0",
  },
  {
    name: BRAIN_TEASERS,
    img: "",
    preview: "",
    description: "",
    _id: "627c9267ab80717325f2d034",
  },
];

const TAGS_PROD = [
  {
    name: GETTING_TO_KNOW_YOU,
    img: "",
    preview: "",
    description: "",
    _id: "5fc0c54918074b1992264a8d",
  },
  {
    name: SHARE_A_PHOTO,
    img: "",
    preview: "",
    description: "",
    _id: "5fc0c54918074b1992264a8e",
  },
  {
    name: OPINIONS_AND_DEBATES,
    img: "",
    preview: "",
    description: "",
    _id: "5fc0c54918074b1992264a8f",
  },
  {
    name: BRAIN_TEASERS,
    img: "",
    preview: "",
    description: "",
    _id: "627f078738e2f76aa0cf5449",
  },
];

export const TAGS =
  process.env.NODE_ENV === "production" ? TAGS_PROD : TAGS_SANDBOX;
