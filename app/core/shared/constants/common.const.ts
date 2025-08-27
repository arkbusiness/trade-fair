import { SortOrderEnum } from '../types';

export const ORGANIZER_APP_ROUTES = {
  root: () => '/organizer',
  settings: (tab?: string) => `/organizer/settings${tab ? `?tab=${tab}` : ''}`,
  auth: {
    login: () => '/?tab=organizer',
    signup: (token: string) => `/organizer/sign-up/${token}`,
    onboarding: () => '/organizer/onboarding'
  },
  exhibitors: {
    root: () => '/organizer/exhibitors/manage',
    detail: (id: string) => `/organizer/exhibitors/manage/${id}`,
    booths: {
      root: () => '/organizer/exhibitors/booths'
    }
  },
  attendees: {
    root: () => '/organizer/attendees/manage',
    detail: (id: string) => `/organizer/attendees/manage/${id}`
  }
};

export const EXHIBITOR_APP_ROUTES = {
  root: () => '/exhibitor',
  auth: {
    login: () => '/?tab=exhibitor'
  },
  settings: (tab?: string) => `/exhibitor/settings${tab ? `?tab=${tab}` : ''}`,
  inventory: {
    root: () => '/exhibitor/inventory/manage',
    detail: (id: string) => `/exhibitor/inventory/manage/${id}`,
    add: () => `/exhibitor/inventory/manage/add`,
    invoice: {
      root: () => '/exhibitor/inventory/invoice',
      detail: (id: string) => `/exhibitor/inventory/invoice/${id}`
    }
  },
  attendees: {
    appointment: {
      root: () => '/exhibitor/attendees/appointments',
      details: (id: string) => `/exhibitor/attendees/appointments/${id}`
    },
    messaging: {
      root: () => '/exhibitor/attendees/messaging'
    }
  }
};

export const APP_NAME = 'Ark';
export const CURRENCY = 'NGN';
export const CURRENCY_SYMBOL = '₦';

export const ARK_META = {
  title: 'Gopher | All-in-One Event Platform for Trade Shows & Exhibitions',
  description:
    'Revolutionize your events with Gopher: QR check-ins, exhibitor tools, and flat-rate pricing.'
};

export const COOKIE_OPTIONS = {
  dev: (hours: number) => {
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + hours * 60 * 60 * 1000);

    return {
      sameSite: 'lax' as const,
      secure: false,
      httpOnly: false,
      expires: expiryDate
    };
  },
  prod: (hours: number) => {
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + hours * 60 * 60 * 1000);

    return {
      secure: true,
      sameSite: true,
      expires: expiryDate
    };
  }
};

export const COOKIE_KEYS = {
  auth: {
    token: 'gopher_access_token',
    inviteToken: 'gopher_invite_token'
  }
};

export const EMPTY_ARRAY = [];

export const SORTING_OPTIONS = [
  { value: SortOrderEnum.ASC, label: 'Highest' },
  { value: SortOrderEnum.DESC, label: 'Lowest' }
];

export const COUNTRY_DETAILS = {
  andorra: {
    name: 'Andorra',
    currency: 'EUR'
  },
  'united arab emirates': {
    name: 'United Arab Emirates',
    currency: 'AED'
  },
  afghanistan: {
    name: 'Afghanistan',
    currency: 'AFN'
  },
  'antigua and barbuda': {
    name: 'Antigua and Barbuda',
    currency: 'XCD'
  },
  anguilla: {
    name: 'Anguilla',
    currency: 'XCD'
  },
  albania: {
    name: 'Albania',
    currency: 'ALL'
  },
  armenia: {
    name: 'Armenia',
    currency: 'AMD'
  },
  angola: {
    name: 'Angola',
    currency: 'AOA'
  },
  antarctica: {
    name: 'Antarctica',
    currency: 'AC'
  },
  argentina: {
    name: 'Argentina',
    currency: 'ARS'
  },
  austria: {
    name: 'Austria',
    currency: 'EUR'
  },
  australia: {
    name: 'Australia',
    currency: 'AUD'
  },
  aruba: {
    name: 'Aruba',
    currency: 'AWG'
  },
  åland: {
    name: 'Åland',
    currency: 'EUR'
  },
  azerbaijan: {
    name: 'Azerbaijan',
    currency: 'AZN'
  },
  'bosnia and herzegovina': {
    name: 'Bosnia and Herzegovina',
    currency: 'BAM'
  },
  barbados: {
    name: 'Barbados',
    currency: 'BBD'
  },
  bangladesh: {
    name: 'Bangladesh',
    currency: 'BDT'
  },
  belgium: {
    name: 'Belgium',
    currency: 'EUR'
  },
  'burkina faso': {
    name: 'Burkina Faso',
    currency: 'XOF'
  },
  bulgaria: {
    name: 'Bulgaria',
    currency: 'BGN'
  },
  bahrain: {
    name: 'Bahrain',
    currency: 'BHD'
  },
  burundi: {
    name: 'Burundi',
    currency: 'BIF'
  },
  benin: {
    name: 'Benin',
    currency: 'XOF'
  },
  'saint barthélemy': {
    name: 'Saint Barthélemy',
    currency: 'EUR'
  },
  bermuda: {
    name: 'Bermuda',
    currency: 'BMD'
  },
  brunei: {
    name: 'Brunei',
    currency: 'BND'
  },
  bolivia: {
    name: 'Bolivia',
    currency: 'BOB'
  },
  brazil: {
    name: 'Brazil',
    currency: 'BRL'
  },
  bahamas: {
    name: 'Bahamas',
    currency: 'BSD'
  },
  bhutan: {
    name: 'Bhutan',
    currency: 'BTN'
  },
  'bouvet island': {
    name: 'Bouvet Island',
    currency: 'NOK'
  },
  botswana: {
    name: 'Botswana',
    currency: 'BWP'
  },
  belarus: {
    name: 'Belarus',
    currency: 'BYR'
  },
  belize: {
    name: 'Belize',
    currency: 'BZD'
  },
  canada: {
    name: 'Canada',
    currency: 'CAD'
  },
  'cocos [keeling] islands': {
    name: 'Cocos [Keeling] Islands',
    currency: 'AUD'
  },
  'democratic republic of the congo': {
    name: 'Democratic Republic of the Congo',
    currency: 'CDF'
  },
  'central african republic': {
    name: 'Central African Republic',
    currency: 'XAF'
  },
  'republic of the congo': {
    name: 'Republic of the Congo',
    currency: 'XAF'
  },
  switzerland: {
    name: 'Switzerland',
    currency: 'CHF'
  },
  'ivory coast': {
    name: 'Ivory Coast',
    currency: 'XOF'
  },
  chile: {
    name: 'Chile',
    currency: 'CLP'
  },
  cameroon: {
    name: 'Cameroon',
    currency: 'XAF'
  },
  china: {
    name: 'China',
    currency: 'CNY'
  },
  colombia: {
    name: 'Colombia',
    currency: 'COP'
  },
  'costa rica': {
    name: 'Costa Rica',
    currency: 'CRC'
  },
  cuba: {
    name: 'Cuba',
    currency: 'CUP'
  },
  'cape verde': {
    name: 'Cape Verde',
    currency: 'CVE'
  },
  curacao: {
    name: 'Curacao',
    currency: 'ANG'
  },
  'christmas island': {
    name: 'Christmas Island',
    currency: 'AUD'
  },
  cyprus: {
    name: 'Cyprus',
    currency: 'EUR'
  },
  czechia: {
    name: 'Czechia',
    currency: 'CZK'
  },
  germany: {
    name: 'Germany',
    currency: 'EUR'
  },
  djibouti: {
    name: 'Djibouti',
    currency: 'DJF'
  },
  denmark: {
    name: 'Denmark',
    currency: 'DKK'
  },
  dominica: {
    name: 'Dominica',
    currency: 'XCD'
  },
  'dominican republic': {
    name: 'Dominican Republic',
    currency: 'DOP'
  },
  algeria: {
    name: 'Algeria',
    currency: 'DZD'
  },
  ecuador: {
    name: 'Ecuador',
    currency: 'USD'
  },
  estonia: {
    name: 'Estonia',
    currency: 'EUR'
  },
  egypt: {
    name: 'Egypt',
    currency: 'EGP'
  },
  'western sahara': {
    name: 'Western Sahara',
    currency: 'MAD'
  },
  eritrea: {
    name: 'Eritrea',
    currency: 'ERN'
  },
  spain: {
    name: 'Spain',
    currency: 'EUR'
  },
  ethiopia: {
    name: 'Ethiopia',
    currency: 'ETB'
  },
  finland: {
    name: 'Finland',
    currency: 'EUR'
  },
  fiji: {
    name: 'Fiji',
    currency: 'FJD'
  },
  'falkland islands': {
    name: 'Falkland Islands',
    currency: 'FKP'
  },
  'faroe islands': {
    name: 'Faroe Islands',
    currency: 'DKK'
  },
  france: {
    name: 'France',
    currency: 'EUR'
  },
  gabon: {
    name: 'Gabon',
    currency: 'XAF'
  },
  'united kingdom': {
    name: 'United Kingdom',
    currency: 'GBP'
  },
  grenada: {
    name: 'Grenada',
    currency: 'XCD'
  },
  georgia: {
    name: 'Georgia',
    currency: 'GEL'
  },
  'french guiana': {
    name: 'French Guiana',
    currency: 'EUR'
  },
  guernsey: {
    name: 'Guernsey',
    currency: 'GBP'
  },
  ghana: {
    name: 'Ghana',
    currency: 'GHS'
  },
  gibraltar: {
    name: 'Gibraltar',
    currency: 'GIP'
  },
  greenland: {
    name: 'Greenland',
    currency: 'DKK'
  },
  gambia: {
    name: 'Gambia',
    currency: 'GMD'
  },
  guinea: {
    name: 'Guinea',
    currency: 'GNF'
  },
  guadeloupe: {
    name: 'Guadeloupe',
    currency: 'EUR'
  },
  'equatorial guinea': {
    name: 'Equatorial Guinea',
    currency: 'XAF'
  },
  greece: {
    name: 'Greece',
    currency: 'EUR'
  },
  'south georgia and the south sandwich islands': {
    name: 'South Georgia and the South Sandwich Islands',
    currency: 'GBP'
  },
  guatemala: {
    name: 'Guatemala',
    currency: 'GTQ'
  },
  'guinea-bissau': {
    name: 'Guinea-Bissau',
    currency: 'XOF'
  },
  guyana: {
    name: 'Guyana',
    currency: 'GYD'
  },
  'hong kong': {
    name: 'Hong Kong',
    currency: 'HKD'
  },
  'heard island and mcdonald islands': {
    name: 'Heard Island and McDonald Islands',
    currency: 'AUD'
  },
  honduras: {
    name: 'Honduras',
    currency: 'HNL'
  },
  croatia: {
    name: 'Croatia',
    currency: 'HRK'
  },
  haiti: {
    name: 'Haiti',
    currency: 'HTG'
  },
  hungary: {
    name: 'Hungary',
    currency: 'HUF'
  },
  indonesia: {
    name: 'Indonesia',
    currency: 'IDR'
  },
  ireland: {
    name: 'Ireland',
    currency: 'EUR'
  },
  israel: {
    name: 'Israel',
    currency: 'ILS'
  },
  'isle of man': {
    name: 'Isle of Man',
    currency: 'GBP'
  },
  india: {
    name: 'India',
    currency: 'INR'
  },
  iraq: {
    name: 'Iraq',
    currency: 'IQD'
  },
  iran: {
    name: 'Iran',
    currency: 'IRR'
  },
  iceland: {
    name: 'Iceland',
    currency: 'ISK'
  },
  italy: {
    name: 'Italy',
    currency: 'EUR'
  },
  jersey: {
    name: 'Jersey',
    currency: 'GBP'
  },
  jamaica: {
    name: 'Jamaica',
    currency: 'JMD'
  },
  jordan: {
    name: 'Jordan',
    currency: 'JOD'
  },
  japan: {
    name: 'Japan',
    currency: 'JPY'
  },
  kenya: {
    name: 'Kenya',
    currency: 'KES'
  },
  kyrgyzstan: {
    name: 'Kyrgyzstan',
    currency: 'KGS'
  },
  cambodia: {
    name: 'Cambodia',
    currency: 'KHR'
  },
  kiribati: {
    name: 'Kiribati',
    currency: 'AUD'
  },
  comoros: {
    name: 'Comoros',
    currency: 'KMF'
  },
  'saint kitts and nevis': {
    name: 'Saint Kitts and Nevis',
    currency: 'XCD'
  },
  'north korea': {
    name: 'North Korea',
    currency: 'KPW'
  },
  'south korea': {
    name: 'South Korea',
    currency: 'KRW'
  },
  kuwait: {
    name: 'Kuwait',
    currency: 'KWD'
  },
  'cayman islands': {
    name: 'Cayman Islands',
    currency: 'KYD'
  },
  kazakhstan: {
    name: 'Kazakhstan',
    currency: 'KZT'
  },
  laos: {
    name: 'Laos',
    currency: 'LAK'
  },
  lebanon: {
    name: 'Lebanon',
    currency: 'LBP'
  },
  'saint lucia': {
    name: 'Saint Lucia',
    currency: 'XCD'
  },
  liechtenstein: {
    name: 'Liechtenstein',
    currency: 'CHF'
  },
  'sri lanka': {
    name: 'Sri Lanka',
    currency: 'LKR'
  },
  liberia: {
    name: 'Liberia',
    currency: 'LRD'
  },
  lesotho: {
    name: 'Lesotho',
    currency: 'LSL'
  },
  lithuania: {
    name: 'Lithuania',
    currency: 'EUR'
  },
  luxembourg: {
    name: 'Luxembourg',
    currency: 'EUR'
  },
  latvia: {
    name: 'Latvia',
    currency: 'EUR'
  },
  libya: {
    name: 'Libya',
    currency: 'LYD'
  },
  morocco: {
    name: 'Morocco',
    currency: 'MAD'
  },
  monaco: {
    name: 'Monaco',
    currency: 'EUR'
  },
  moldova: {
    name: 'Moldova',
    currency: 'MDL'
  },
  montenegro: {
    name: 'Montenegro',
    currency: 'EUR'
  },
  'saint martin': {
    name: 'Saint Martin',
    currency: 'EUR'
  },
  madagascar: {
    name: 'Madagascar',
    currency: 'MGA'
  },
  macedonia: {
    name: 'Macedonia',
    currency: 'MKD'
  },
  mali: {
    name: 'Mali',
    currency: 'XOF'
  },
  'myanmar [burma]': {
    name: 'Myanmar [Burma]',
    currency: 'MMK'
  },
  mongolia: {
    name: 'Mongolia',
    currency: 'MNT'
  },
  macao: {
    name: 'Macao',
    currency: 'MOP'
  },
  martinique: {
    name: 'Martinique',
    currency: 'EUR'
  },
  mauritania: {
    name: 'Mauritania',
    currency: 'MRO'
  },
  montserrat: {
    name: 'Montserrat',
    currency: 'XCD'
  },
  malta: {
    name: 'Malta',
    currency: 'EUR'
  },
  mauritius: {
    name: 'Mauritius',
    currency: 'MUR'
  },
  maldives: {
    name: 'Maldives',
    currency: 'MVR'
  },
  malawi: {
    name: 'Malawi',
    currency: 'MWK'
  },
  mexico: {
    name: 'Mexico',
    currency: 'MXN'
  },
  malaysia: {
    name: 'Malaysia',
    currency: 'MYR'
  },
  mozambique: {
    name: 'Mozambique',
    currency: 'MZN'
  },
  namibia: {
    name: 'Namibia',
    currency: 'NAD'
  },
  'new caledonia': {
    name: 'New Caledonia',
    currency: 'XPF'
  },
  niger: {
    name: 'Niger',
    currency: 'XOF'
  },
  'norfolk island': {
    name: 'Norfolk Island',
    currency: 'AUD'
  },
  nigeria: {
    name: 'Nigeria',
    currency: 'NGN'
  },
  nicaragua: {
    name: 'Nicaragua',
    currency: 'NIO'
  },
  netherlands: {
    name: 'Netherlands',
    currency: 'EUR'
  },
  norway: {
    name: 'Norway',
    currency: 'NOK'
  },
  nepal: {
    name: 'Nepal',
    currency: 'NPR'
  },
  nauru: {
    name: 'Nauru',
    currency: 'AUD'
  },
  'new zealand': {
    name: 'New Zealand',
    currency: 'NZD'
  },
  oman: {
    name: 'Oman',
    currency: 'OMR'
  },
  panama: {
    name: 'Panama',
    currency: 'PAB'
  },
  peru: {
    name: 'Peru',
    currency: 'PEN'
  },
  'french polynesia': {
    name: 'French Polynesia',
    currency: 'XPF'
  },
  'papua new guinea': {
    name: 'Papua New Guinea',
    currency: 'PGK'
  },
  philippines: {
    name: 'Philippines',
    currency: 'PHP'
  },
  pakistan: {
    name: 'Pakistan',
    currency: 'PKR'
  },
  poland: {
    name: 'Poland',
    currency: 'PLN'
  },
  'saint pierre and miquelon': {
    name: 'Saint Pierre and Miquelon',
    currency: 'EUR'
  },
  'puerto rico': {
    name: 'Puerto Rico',
    currency: 'USD'
  },
  palestine: {
    name: 'Palestine',
    currency: 'ILS'
  },
  portugal: {
    name: 'Portugal',
    currency: 'EUR'
  },
  paraguay: {
    name: 'Paraguay',
    currency: 'PYG'
  },
  qatar: {
    name: 'Qatar',
    currency: 'QAR'
  },
  réunion: {
    name: 'Réunion',
    currency: 'EUR'
  },
  romania: {
    name: 'Romania',
    currency: 'RON'
  },
  serbia: {
    name: 'Serbia',
    currency: 'RSD'
  },
  russia: {
    name: 'Russia',
    currency: 'RUB'
  },
  rwanda: {
    name: 'Rwanda',
    currency: 'RWF'
  },
  'saudi arabia': {
    name: 'Saudi Arabia',
    currency: 'SAR'
  },
  'solomon islands': {
    name: 'Solomon Islands',
    currency: 'SBD'
  },
  seychelles: {
    name: 'Seychelles',
    currency: 'SCR'
  },
  sudan: {
    name: 'Sudan',
    currency: 'SDG'
  },
  sweden: {
    name: 'Sweden',
    currency: 'SEK'
  },
  singapore: {
    name: 'Singapore',
    currency: 'SGD'
  },
  'saint helena': {
    name: 'Saint Helena',
    currency: 'SHP'
  },
  slovenia: {
    name: 'Slovenia',
    currency: 'EUR'
  },
  'svalbard and jan mayen': {
    name: 'Svalbard and Jan Mayen',
    currency: 'NOK'
  },
  slovakia: {
    name: 'Slovakia',
    currency: 'EUR'
  },
  'sierra leone': {
    name: 'Sierra Leone',
    currency: 'SLL'
  },
  'san marino': {
    name: 'San Marino',
    currency: 'EUR'
  },
  senegal: {
    name: 'Senegal',
    currency: 'XOF'
  },
  somalia: {
    name: 'Somalia',
    currency: 'SOS'
  },
  suriname: {
    name: 'Suriname',
    currency: 'SRD'
  },
  'south sudan': {
    name: 'South Sudan',
    currency: 'SSP'
  },
  'são tomé and príncipe': {
    name: 'São Tomé and Príncipe',
    currency: 'STD'
  },
  'el salvador': {
    name: 'El Salvador',
    currency: 'USD'
  },
  'sint maarten': {
    name: 'Sint Maarten',
    currency: 'ANG'
  },
  syria: {
    name: 'Syria',
    currency: 'SYP'
  },
  swaziland: {
    name: 'Swaziland',
    currency: 'SZL'
  },
  chad: {
    name: 'Chad',
    currency: 'XAF'
  },
  'french southern territories': {
    name: 'French Southern Territories',
    currency: 'EUR'
  },
  togo: {
    name: 'Togo',
    currency: 'XOF'
  },
  thailand: {
    name: 'Thailand',
    currency: 'THB'
  },
  tajikistan: {
    name: 'Tajikistan',
    currency: 'TJS'
  },
  turkmenistan: {
    name: 'Turkmenistan',
    currency: 'TMT'
  },
  tunisia: {
    name: 'Tunisia',
    currency: 'TND'
  },
  tonga: {
    name: 'Tonga',
    currency: 'TOP'
  },
  turkey: {
    name: 'Turkey',
    currency: 'TRY'
  },
  'trinidad and tobago': {
    name: 'Trinidad and Tobago',
    currency: 'TTD'
  },
  tuvalu: {
    name: 'Tuvalu',
    currency: 'AUD'
  },
  taiwan: {
    name: 'Taiwan',
    currency: 'TWD'
  },
  tanzania: {
    name: 'Tanzania',
    currency: 'TZS'
  },
  ukraine: {
    name: 'Ukraine',
    currency: 'UAH'
  },
  uganda: {
    name: 'Uganda',
    currency: 'UGX'
  },
  'united states': {
    name: 'United States',
    currency: 'USD'
  },
  uruguay: {
    name: 'Uruguay',
    currency: 'UYU'
  },
  uzbekistan: {
    name: 'Uzbekistan',
    currency: 'UZS'
  },
  'vatican city': {
    name: 'Vatican City',
    currency: 'EUR'
  },
  'saint vincent and the grenadines': {
    name: 'Saint Vincent and the Grenadines',
    currency: 'XCD'
  },
  venezuela: {
    name: 'Venezuela',
    currency: 'VEF'
  },
  vietnam: {
    name: 'Vietnam',
    currency: 'VND'
  },
  vanuatu: {
    name: 'Vanuatu',
    currency: 'VUV'
  },
  'wallis and futuna': {
    name: 'Wallis and Futuna',
    currency: 'XPF'
  },
  samoa: {
    name: 'Samoa',
    currency: 'WST'
  },
  kosovo: {
    name: 'Kosovo',
    currency: 'EUR'
  },
  yemen: {
    name: 'Yemen',
    currency: 'YER'
  },
  mayotte: {
    name: 'Mayotte',
    currency: 'EUR'
  },
  'south africa': {
    name: 'South Africa',
    currency: 'ZAR'
  },
  zambia: {
    name: 'Zambia',
    currency: 'ZMW'
  },
  zimbabwe: {
    name: 'Zimbabwe',
    currency: 'ZWL'
  }
};
export const COUNTRY_LIST = Object.values(COUNTRY_DETAILS).map(
  (country) => country.name
);
const COUNTRY_CURRENCY = Object.values(COUNTRY_DETAILS).map(
  (country) => country.currency
);
export const COUNTRY_CURRENCY_LIST = [...new Set(COUNTRY_CURRENCY)];
