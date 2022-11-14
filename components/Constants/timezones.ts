// INCREDIBLY STUPID HACK: We need to use the timezone names from the
// server, but we can't import the server code into the client code.
// So we're just going to copy the timezone names from the server code
// and paste them here. This is a terrible idea, but it's the only way
// I can think of to do this.

// We should remove them from the db and just use the timezone names
// instead.

const DEV_TIMEZONES = [
  {
    _id: "62795d81a0893096df01e204",
    isDst: false,
    label: "(GMT +4:30) Kabul",
    value: "+04:30",
  },
  {
    _id: "62795d81a0893096df01e1f2",
    isDst: false,
    label: "(GMT -9:30) Taiohae",
    value: "-09:30",
  },
  {
    _id: "62795d81a0893096df01e209",
    isDst: false,
    label: "(GMT +6:30) Yangon, Mandalay",
    value: "+06:30",
  },
  {
    _id: "62795d81a0893096df01e20c",
    isDst: false,
    label: "(GMT +8:45) Eucla",
    value: "+08:45",
  },
  {
    _id: "62795d81a0893096df01e211",
    isDst: false,
    label: "(GMT +11:00) Magadan, Solomon Islands, New Caledonia",
    value: "+11:00",
  },
  {
    _id: "62795d81a0893096df01e214",
    isDst: false,
    label: "(GMT +12:45) Chatham Islands",
    value: "+12:45",
  },
  {
    _id: "62795d81a0893096df01e216",
    isDst: false,
    label: "(GMT +14:00) Line Islands, Tokelau",
    value: "+14:00",
  },
  {
    _id: "62795d81a0893096df01e1fa",
    isDst: false,
    label: "(GMT -3:30) Newfoundland",
    value: "-03:30",
  },
  {
    _id: "62795d81a0893096df01e1fb",
    isDst: false,
    label: "(GMT -3:00) Brazil, Buenos Aires, Georgetown",
    value: "-03:00",
  },
  {
    _id: "62795d81a0893096df01e1fd",
    isDst: false,
    label: "(GMT -1:00) Azores, Cape Verde Islands",
    value: "-01:00",
  },
  {
    _id: "62795d81a0893096df01e1fe",
    isDst: false,
    label: "(GMT) Western Europe Time, London, Lisbon, Casablanca",
    value: "+00:00",
  },
  {
    _id: "62795d81a0893096df01e205",
    isDst: false,
    label: "(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent",
    value: "+05:00",
  },
  {
    _id: "62795d81a0893096df01e20b",
    isDst: false,
    label: "(GMT +8:00) Beijing, Perth, Singapore, Hong Kong",
    value: "+08:00",
  },
  {
    _id: "62795d81a0893096df01e20d",
    isDst: false,
    label: "(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk",
    value: "+09:00",
  },
  {
    _id: "62795d81a0893096df01e212",
    isDst: false,
    label: "(GMT +11:30) Norfolk Island",
    value: "+11:30",
  },
  {
    _id: "62795d81a0893096df01e213",
    isDst: false,
    label: "(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka",
    value: "+12:00",
  },
  {
    _id: "62795d81a0893096df01e1ef",
    isDst: false,
    label: "(GMT -12:00) Eniwetok, Kwajalein",
    value: "-12:00",
  },
  {
    _id: "62795d81a0893096df01e1f0",
    isDst: false,
    label: "(GMT -11:00) Midway Island, Samoa",
    value: "-11:00",
  },
  {
    _id: "62795d81a0893096df01e1f1",
    isDst: false,
    label: "(GMT -10:00) Hawaii",
    value: "-10:00",
  },
  {
    _id: "62795d81a0893096df01e1f5",
    zone: "MST7MDT",
    isDst: true,
    label: "(GMT -7:00) Mountain Time (US & Canada)",
    value: "-07:00",
  },
  {
    _id: "62795d81a0893096df01e1f7",
    zone: "EST5EDT",
    isDst: true,
    label: "(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima",
    value: "-05:00",
  },
  {
    _id: "62795d81a0893096df01e1f8",
    isDst: false,
    label: "(GMT -4:30) Caracas",
    value: "-04:30",
  },
  {
    _id: "62795d81a0893096df01e1f9",
    isDst: false,
    label: "(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz",
    value: "-04:00",
  },
  {
    _id: "62795d81a0893096df01e200",
    isDst: false,
    label: "(GMT +2:00) Kaliningrad, South Africa",
    value: "+02:00",
  },
  {
    _id: "62795d81a0893096df01e201",
    isDst: false,
    label: "(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg",
    value: "+03:00",
  },
  {
    _id: "62795d81a0893096df01e203",
    isDst: false,
    label: "(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi",
    value: "+04:00",
  },
  {
    _id: "62795d81a0893096df01e206",
    isDst: false,
    label: "(GMT +5:30) Bombay, Calcutta, Madras, New Delhi",
    value: "+05:30",
  },
  {
    _id: "62795d81a0893096df01e20e",
    isDst: false,
    label: "(GMT +9:30) Adelaide, Darwin",
    value: "+09:30",
  },
  {
    _id: "62795d81a0893096df01e20f",
    isDst: false,
    label: "(GMT +10:00) Eastern Australia, Guam, Vladivostok",
    value: "+10:00",
  },
  {
    _id: "62795d81a0893096df01e210",
    isDst: false,
    label: "(GMT +10:30) Lord Howe Island",
    value: "+10:30",
  },
  {
    _id: "62795d81a0893096df01e1f3",
    isDst: false,
    label: "(GMT -9:00) Alaska",
    value: "-09:00",
  },
  {
    _id: "62795d81a0893096df01e1f4",
    zone: "PST8PDT",
    isDst: true,
    label: "(GMT -8:00) Pacific Time (US & Canada)",
    value: "-08:00",
  },
  {
    _id: "62795d81a0893096df01e1f6",
    zone: "CST6CDT",
    isDst: true,
    label: "(GMT -6:00) Central Time (US & Canada), Mexico City",
    value: "-06:00",
  },
  {
    _id: "62795d81a0893096df01e1fc",
    isDst: false,
    label: "(GMT -2:00) Mid-Atlantic",
    value: "-02:00",
  },
  {
    _id: "62795d81a0893096df01e1ff",
    isDst: false,
    label: "(GMT +1:00) Brussels, Copenhagen, Madrid, Paris",
    value: "+01:00",
  },
  {
    _id: "62795d81a0893096df01e202",
    isDst: false,
    label: "(GMT +3:30) Tehran",
    value: "+03:30",
  },
  {
    _id: "62795d81a0893096df01e207",
    isDst: false,
    label: "(GMT +5:45) Kathmandu, Pokhara",
    value: "+05:45",
  },
  {
    _id: "62795d81a0893096df01e208",
    isDst: false,
    label: "(GMT +6:00) Almaty, Dhaka, Colombo",
    value: "+06:00",
  },
  {
    _id: "62795d81a0893096df01e20a",
    isDst: false,
    label: "(GMT +7:00) Bangkok, Hanoi, Jakarta",
    value: "+07:00",
  },
  {
    _id: "62795d81a0893096df01e215",
    isDst: false,
    label: "(GMT +13:00) Apia, Nukualofa",
    value: "+13:00",
  },
];

const PROD_TIMEZONES = [
  {
    _id: "5fc0c54a18074b1992264a94",
    value: "-09:00",
    label: "(GMT -9:00) Alaska",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264a96",
    value: "-07:00",
    label: "(GMT -7:00) Mountain Time (US & Canada)",
    isDst: true,
    zone: "MST7MDT",
  },
  {
    _id: "5fc0c54a18074b1992264aa1",
    value: "+02:00",
    label: "(GMT +2:00) Kaliningrad, South Africa",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264aac",
    value: "+08:00",
    label: "(GMT +8:00) Beijing, Perth, Singapore, Hong Kong",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264a9a",
    value: "-04:00",
    label: "(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264ab5",
    value: "+12:45",
    label: "(GMT +12:45) Chatham Islands",
    __v: 0,
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264a9c",
    value: "-03:00",
    label: "(GMT -3:00) Brazil, Buenos Aires, Georgetown",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264ab7",
    value: "+14:00",
    label: "(GMT +14:00) Line Islands, Tokelau",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264aaf",
    value: "+09:30",
    label: "(GMT +9:30) Adelaide, Darwin",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264ab6",
    value: "+13:00",
    label: "(GMT +13:00) Apia, Nukualofa",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264a93",
    value: "-09:30",
    label: "(GMT -9:30) Taiohae",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264ab4",
    value: "+12:00",
    label: "(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264aa3",
    value: "+03:30",
    label: "(GMT +3:30) Tehran",

    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264ab0",
    value: "+10:00",
    label: "(GMT +10:00) Eastern Australia, Guam, Vladivostok",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264aaa",
    value: "+06:30",
    label: "(GMT +6:30) Yangon, Mandalay",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264a90",
    value: "-12:00",
    label: "(GMT -12:00) Eniwetok, Kwajalein",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264a95",
    value: "-08:00",
    label: "(GMT -8:00) Pacific Time (US & Canada)",
    isDst: true,
    zone: "PST8PDT",
  },
  {
    _id: "5fc0c54a18074b1992264a98",
    value: "-05:00",
    label: "(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima",
    isDst: true,
    zone: "EST5EDT",
  },
  {
    _id: "5fc0c54a18074b1992264aa9",
    value: "+06:00",
    label: "(GMT +6:00) Almaty, Dhaka, Colombo",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264a99",
    value: "-04:30",
    label: "(GMT -4:30) Caracas",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264aa8",
    value: "+05:45",
    label: "(GMT +5:45) Kathmandu, Pokhara",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264ab1",
    value: "+10:30",
    label: "(GMT +10:30) Lord Howe Island",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264aad",
    value: "+08:45",
    label: "(GMT +8:45) Eucla",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264ab2",

    value: "+11:00",
    label: "(GMT +11:00) Magadan, Solomon Islands, New Caledonia",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264aa2",
    value: "+03:00",
    label: "(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264a9e",
    value: "-01:00",
    label: "(GMT -1:00) Azores, Cape Verde Islands",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264a92",
    value: "-10:00",
    label: "(GMT -10:00) Hawaii",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264a91",
    value: "-11:00",
    label: "(GMT -11:00) Midway Island, Samoa",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264a9b",
    value: "-03:30",
    label: "(GMT -3:30) Newfoundland",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264aa7",
    value: "+05:30",
    label: "(GMT +5:30) Bombay, Calcutta, Madras, New Delhi",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264aa4",
    value: "+04:00",
    label: "(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264aa5",
    value: "+04:30",
    label: "(GMT +4:30) Kabul",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264ab3",
    value: "+11:30",
    label: "(GMT +11:30) Norfolk Island",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264a9f",
    value: "+00:00",
    label: "(GMT) Western Europe Time, London, Lisbon, Casablanca",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264aa6",
    value: "+05:00",
    label: "(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264a97",
    value: "-06:00",
    label: "(GMT -6:00) Central Time (US & Canada), Mexico City",
    isDst: true,
    zone: "CST6CDT",
  },
  {
    _id: "5fc0c54a18074b1992264aa0",
    value: "+01:00",
    label: "(GMT +1:00) Brussels, Copenhagen, Madrid, Paris",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264aab",
    value: "+07:00",
    label: "(GMT +7:00) Bangkok, Hanoi, Jakarta",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264aae",
    value: "+09:00",
    label: "(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk",
    isDst: false,
  },
  {
    _id: "5fc0c54a18074b1992264a9d",
    value: "-02:00",
    label: "(GMT -2:00) Mid-Atlantic",
    isDst: false,
  },
];

export interface Timezone {
  _id: string;
  value: string;
  label: string;
  isDst: boolean;
  zone?: string;
}

export default (process.env.NEXT_PUBLIC_NODE_ENV
  ? PROD_TIMEZONES
  : DEV_TIMEZONES
).sort((a, b) => a.value.localeCompare(b.value));
