import { AirdropEntry, VALID_AIRDROP_CATEGORIES } from './types';

type AirdropRecipients = Record<string, AirdropEntry[]>;
const airdropRecipients: AirdropRecipients = {};

// TODO: Discord events entries recorded at https://docs.google.com/spreadsheets/d/1_Oz5fIKslbozCbYeU0vMWCi9vpbjoI8ClUr_OIZM-I0/edit?gid=372520803#gid=372520803
const airdropArray = [
  // TODO: remove first recipient here
  {
    recipient: 'symphony14jz5ppgxl0mhvpmkmtm5fr75vz24p752m5mqqe',
    entries: [
      {
        amount: 100,
        denom: 'MLD',
        reason: 'Discord Events',
      },
      { amount: 75, denom: 'MLD', reason: 'Communities' },
    ],
  },
  {
    friendlyName: 'Raven',
    recipient: 'symphony1hel9md4mwxtwfrjjna60fwynfuqe55avw4mask',
    entries: [{ amount: 6150, denom: 'MLD', reason: 'Discord Events' }],
  },
  {
    friendlyName: 'sychonix',
    recipient: 'symphony1g7u2rvuff7lx73eahtr2qsvngv6ptp2hqmp8jp',
    entries: [{ amount: 3700, denom: 'MLD', reason: 'Discord Events' }],
  },
  {
    recipient: 'Kubbykubs',
    entries: [{ amount: 2525, denom: 'MLD', reason: 'Discord Events' }],
  },
  {
    recipient: 'kimga',
    entries: [{ amount: 2500, denom: 'MLD', reason: 'Discord Events' }],
  },
  {
    friendlyName: 'dilay4235',
    recipient: 'symphony1znaj4lqyds2jsg9tpmwt59r0mxn85at4ss3gan',
    entries: [{ amount: 125, denom: 'MLD', reason: 'Discord Events' }],
  },
  {
    recipient: 'vicactive',
    entries: [{ amount: 2500, denom: 'MLD', reason: 'Discord Events' }],
  },
  {
    recipient: 'dwang',
    entries: [{ amount: 2450, denom: 'MLD', reason: 'Discord Events' }],
  },
  {
    recipient: 'andyflex123 VAULTD',
    entries: [{ amount: 2450, denom: 'MLD', reason: 'Discord Events' }],
  },
  {
    friendlyName: 'kychame',
    recipient: 'symphony1mzvhn757ycgn6e4hyr8pnwvjqfe5kgjvc8g452',
    entries: [{ amount: 375, denom: 'MLD', reason: 'Discord Events' }],
  },
  {
    recipient: 'Bang Pateng',
    entries: [{ amount: 275, denom: 'MLD', reason: 'Discord Events' }],
  },
  {
    recipient: 'N I R Z H A I CLONE',
    entries: [{ amount: 250, denom: 'MLD', reason: 'Discord Events' }],
  },
  {
    friendlyName: 'ifan2000',
    recipient: 'symphony1rtyehaur9xyjrk4kr8yvvyp7k9vm8jl5rfaqu3',
    entries: [{ amount: 250, denom: 'MLD', reason: 'Discord Events' }],
  },
  {
    recipient: 'Abdul Sandana',
    entries: [{ amount: 250, denom: 'MLD', reason: 'Discord Events' }],
  },
  {
    friendlyName: 'Rainchyy',
    recipient: 'symphony1sn2nep7qhv6477v728zmhsd64ca8zu5zmngu5y',
    entries: [{ amount: 225, denom: 'MLD', reason: 'Discord Events' }],
  },
  {
    friendlyName: 'Axell',
    recipient: 'symphony1nde9cz5hu3608jhpqlc0u00axqjffn2hg29cf5',
    entries: [{ amount: 25, denom: 'MLD', reason: 'Discord Events' }],
  },
  {
    friendlyName: 'taradora11',
    recipient: 'symphony1qk5lts8r9vfaedp042xlrhhga8zczpnyv9llkt',
    entries: [{ amount: 975, denom: 'MLD', reason: 'Discord Events' }],
  },
  {
    recipient: 'Chun | Orochi Network',
    entries: [{ amount: 50, denom: 'MLD', reason: 'Discord Events' }],
  },
  {
    recipient: 'benjamin',
    entries: [{ amount: 25, denom: 'MLD', reason: 'Discord Events' }],
  },
  {
    friendlyName: '0xfearless_',
    recipient: 'symphony12c3yc0wpvx5afa3fdgs4eulum4pn8rdna6h945',
    entries: [{ amount: 125, denom: 'MLD', reason: 'Discord Events' }],
  },
  {
    friendlyName: 'hamza2304',
    recipient: 'symphony1hlgpv7egtwg2xs52cvhazphdm8h4fhxrlv0dsk',
    entries: [{ amount: 150, denom: 'MLD', reason: 'Discord Events' }],
  },
  {
    friendlyName: 'saadudin06',
    recipient: 'symphony1z4yl0zplnjujxfs3yx9euh9mqrhay342vjtwj7',
    entries: [{ amount: 625, denom: 'MLD', reason: 'Discord Events' }],
  },
  {
    friendlyName: 'alidargo08',
    recipient: 'symphony1alqu2n5kc7fax23v8yvhsvvmwwwsc0qh3l9ts7',
    entries: [{ amount: 625, denom: 'MLD', reason: 'Discord Events' }],
  },
  {
    friendlyName: 'alidargo08',
    recipient: 'symphony1alqu2n5kc7fax23v8yvhsvvmwwwsc0qh3l9ts7',
    entries: [{ amount: 125, denom: 'MLD', reason: 'Discord Events' }],
  },
];

const isEntryValid = (entry: Omit<AirdropEntry, 'valid'>): boolean => {
  return (
    entry.amount > 0 &&
    entry.denom === 'MLD' &&
    VALID_AIRDROP_CATEGORIES.includes(
      entry.reason as (typeof VALID_AIRDROP_CATEGORIES)[number],
    )
  );
};

airdropArray.forEach(({ recipient, entries }) => {
  if (!airdropRecipients[recipient]) {
    airdropRecipients[recipient] = [];
  }
  const entriesWithValidity = entries.map(entry => ({
    ...entry,
    valid: isEntryValid(entry),
  }));
  airdropRecipients[recipient].push(...entriesWithValidity);
});

export { airdropRecipients };
