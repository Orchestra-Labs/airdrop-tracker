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
    recipient: 'Raven',
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
    recipient: 'kycha | Solana ID',
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
    recipient: 'ifan2000',
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
    recipient: 'Axell',
    entries: [{ amount: 25, denom: 'MLD', reason: 'Discord Events' }],
  },
  {
    recipient: 'taradora11',
    entries: [{ amount: 475, denom: 'MLD', reason: 'Discord Events' }],
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
    friendlyName: 'ed_vndt',
    recipient: 'symphony1uvs5m8ekhvaaz92zwwwttzm5eu8nfk0fdculkg',
    entries: [{ amount: 0, denom: 'MLD', reason: 'Discord Events' }],
  },
  {
    recipient: '0xfearless_',
    entries: [{ amount: 125, denom: 'MLD', reason: 'Discord Events' }],
  },
  {
    friendlyName: 'hamza2304',
    recipient: 'symphony1hlgpv7egtwg2xs52cvhazphdm8h4fhxrlv0dsk',
    entries: [{ amount: 150, denom: 'MLD', reason: 'Discord Events' }],
  },
  {
    recipient: 'saadudin06',
    entries: [{ amount: 125, denom: 'MLD', reason: 'Discord Events' }],
  },
  {
    recipient: 'alidargo08',
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
