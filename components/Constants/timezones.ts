// INCREDIBLY STUPID HACK: We need to use the timezone names from the
// server, but we can't import the server code into the client code.
// So we're just going to copy the timezone names from the server code
// and paste them here. This is a terrible idea, but it's the only way
// I can think of to do this.

// We should remove them from the db and just use the timezone names
// instead.

const TIMEZONES = [
  {
    _id: "5fc0c54a18074b1992264a94",
    value: "-09:00",
    label: "(GMT -9:00) Alaska",
    IANA: "America/Anchorage",
  },
  {
    _id: "5fc0c54a18074b1992264a96",
    value: "-07:00",
    label: "(GMT -7:00) Mountain Time (US & Canada)",
    IANA: "America/Denver",
  },
  {
    _id: "5fc0c54a18074b1992264aa1",
    value: "+02:00",
    label: "(GMT +2:00) Kaliningrad, South Africa",
    IANA: "Europe/Kaliningrad",
  },
  {
    _id: "5fc0c54a18074b1992264aac",
    value: "+08:00",
    label: "(GMT +8:00) Beijing, Perth, Singapore, Hong Kong",
    IANA: "Asia/Shanghai",
  },
  {
    _id: "5fc0c54a18074b1992264a9a",
    value: "-04:00",
    label: "(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz",
    IANA: "America/Halifax",
  },
  {
    _id: "5fc0c54a18074b1992264ab5",
    value: "+12:45",
    label: "(GMT +12:45) Chatham Islands",
    IANA: "Pacific/Chatham",
    __v: 0,
  },
  {
    _id: "5fc0c54a18074b1992264a9c",
    value: "-03:00",
    label: "(GMT -3:00) Brazil, Buenos Aires, Georgetown",
    IANA: "America/Sao_Paulo",
  },
  {
    _id: "5fc0c54a18074b1992264ab7",
    value: "+14:00",
    label: "(GMT +14:00) Line Islands, Tokelau",
    IANA: "Pacific/Kiritimati",
  },
  {
    _id: "5fc0c54a18074b1992264aaf",
    value: "+09:30",
    label: "(GMT +9:30) Adelaide, Darwin",
    IANA: "Australia/Adelaide",
  },
  {
    _id: "5fc0c54a18074b1992264ab6",
    value: "+13:00",
    label: "(GMT +13:00) Apia, Nukualofa",
    IANA: "Pacific/Apia",
  },
  {
    _id: "5fc0c54a18074b1992264ab4",
    value: "+12:00",
    label: "(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka",
    IANA: "Pacific/Auckland",
  },
  {
    _id: "5fc0c54a18074b1992264aa3",
    value: "+03:30",
    label: "(GMT +3:30) Tehran",
    IANA: "Asia/Tehran",
  },
  {
    _id: "5fc0c54a18074b1992264ab0",
    value: "+10:00",
    label: "(GMT +10:00) Sydney",
    IANA: "Australia/Sydney",
  },
  {
    _id: "5fc0c54a18074b1992264aaa",
    value: "+06:30",
    label: "(GMT +6:30) Yangon, Mandalay",
    IANA: "Asia/Yangon",
  },
  {
    _id: "5fc0c54a18074b1992264a90",
    value: "-12:00",
    label: "(GMT -12:00) Eniwetok, Kwajalein",
    IANA: "Pacific/Kwajalein",
  },
  {
    _id: "5fc0c54a18074b1992264a95",
    value: "-08:00",
    label: "(GMT -8:00) Pacific Time (US & Canada)",
    IANA: "America/Los_Angeles",
  },
  {
    _id: "5fc0c54a18074b1992264a98",
    value: "-05:00",
    label: "(GMT -5:00) Eastern Time",
    IANA: "America/New_York",
  },
  {
    _id: "5fc0c54a18074b1992264aa9",
    value: "+06:00",
    label: "(GMT +6:00) Almaty, Dhaka, Colombo",
    IANA: "Asia/Almaty",
  },
  {
    _id: "5fc0c54a18074b1992264a99",
    value: "-04:30",
    label: "(GMT -4:30) Caracas",
    IANA: "America/Caracas",
  },
  {
    _id: "5fc0c54a18074b1992264aa8",
    value: "+05:45",
    label: "(GMT +5:45) Kathmandu, Pokhara",
    IANA: "Asia/Kathmandu",
  },
  {
    _id: "5fc0c54a18074b1992264ab1",
    value: "+10:30",
    label: "(GMT +10:30) Lord Howe Island",
    IANA: "Australia/Lord_Howe",
  },
  {
    _id: "5fc0c54a18074b1992264aad",
    value: "+08:45",
    label: "(GMT +8:45) Eucla",
    IANA: "Australia/Eucla",
  },
  {
    _id: "5fc0c54a18074b1992264ab2",
    value: "+11:00",
    label: "(GMT +11:00) Magadan, Solomon Islands, New Caledonia",
    IANA: "Pacific/Guadalcanal",
  },
  {
    _id: "5fc0c54a18074b1992264aa2",
    value: "+03:00",
    label: "(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg",
    IANA: "Asia/Baghdad",
  },
  {
    _id: "5fc0c54a18074b1992264a9e",
    value: "-01:00",
    label: "(GMT -1:00) Azores, Cape Verde Islands",
    IANA: "Atlantic/Azores",
  },
  {
    _id: "5fc0c54a18074b1992264a92",
    value: "-10:00",
    label: "(GMT -10:00) Hawaii",
    IANA: "Pacific/Honolulu",
  },
  {
    _id: "5fc0c54a18074b1992264a91",
    value: "-11:00",
    label: "(GMT -11:00) Midway Island, Samoa",
    IANA: "Pacific/Midway",
  },
  {
    _id: "5fc0c54a18074b1992264a9b",
    value: "-03:30",
    label: "(GMT -3:30) Newfoundland",
    IANA: "America/St_Johns",
  },
  {
    _id: "5fc0c54a18074b1992264aa7",
    value: "+05:30",
    label: "(GMT +5:30) Bombay, Calcutta, Madras, New Delhi",
    IANA: "Asia/Calcutta",
  },
  {
    _id: "5fc0c54a18074b1992264aa4",
    value: "+04:00",
    label: "(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi",
    IANA: "Asia/Dubai",
  },
  {
    _id: "5fc0c54a18074b1992264aa5",
    value: "+04:30",
    label: "(GMT +4:30) Kabul",
    IANA: "Asia/Kabul",
  },
  {
    _id: "5fc0c54a18074b1992264ab3",
    value: "+11:30",
    label: "(GMT +11:30) Norfolk Island",
    IANA: "Pacific/Norfolk",
  },
  {
    _id: "5fc0c54a18074b1992264a9f",
    value: "+00:00",
    label: "(GMT) Western Europe Time, London, Lisbon, Casablanca",
    IANA: "Europe/London",
  },
  {
    _id: "5fc0c54a18074b1992264aa6",
    value: "+05:00",
    label: "(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent",
    IANA: "Asia/Karachi",
  },
  {
    _id: "5fc0c54a18074b1992264a97",
    value: "-06:00",
    label: "(GMT -6:00) Central Time (US & Canada), Mexico City",
    IANA: "America/Chicago",
  },
  {
    _id: "5fc0c54a18074b1992264aa0",
    value: "+01:00",
    label: "(GMT +1:00) Brussels, Copenhagen, Madrid, Paris",
    IANA: "Europe/Paris",
  },
  {
    _id: "5fc0c54a18074b1992264aab",
    value: "+07:00",
    label: "(GMT +7:00) Bangkok, Hanoi, Jakarta",
    IANA: "Asia/Bangkok",
  },
  {
    _id: "5fc0c54a18074b1992264aae",
    value: "+09:00",
    label: "(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk",
    IANA: "Asia/Tokyo",
  },
  {
    _id: "5fc0c54a18074b1992264a9d",
    value: "-02:00",
    label: "(GMT -2:00) Mid-Atlantic",
    IANA: "America/Noronha",
  },
];

export interface Timezone {
  _id: string;
  value: string;
  label: string;
  IANA: string;

  zone?: string;
}

export default TIMEZONES.sort((a, b) => a.value.localeCompare(b.value));
