import { AirdropEntry, VALID_AIRDROP_CATEGORIES } from './types';

type AirdropRecipients = Record<string, AirdropEntry[]>;
const airdropRecipients: AirdropRecipients = {};

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
    recipient: 'sychonix',
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
    recipient: 'Rainchyy',
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
    recipient: 'ed_vndt',
    entries: [{ amount: 0, denom: 'MLD', reason: 'Discord Events' }],
  },
  {
    recipient: '0xfearless_',
    entries: [{ amount: 125, denom: 'MLD', reason: 'Discord Events' }],
  },
  {
    recipient: 'hamza2304',
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
