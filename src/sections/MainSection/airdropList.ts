import { AirdropEntry, VALID_AIRDROP_CATEGORIES } from './types';

type AirdropRecipients = Record<string, AirdropEntry[]>;
const airdropRecipients: AirdropRecipients = {};

const tempAirdropArray = [
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
    recipient: 'symphony14jz5ppgxl0mhvpmkmtm5fr75vz24p752m5mqq2',
    entries: [
      {
        amount: 50,
        denom: 'MLD',
        reason: 'Testnet Tasks',
      },
      {
        amount: 0,
        denom: 'MLD',
        reason: 'Fairdrop',
      },
      {
        amount: 25,
        denom: 'XYZ',
        reason: 'Other contribution',
      },
    ],
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

tempAirdropArray.forEach(({ recipient, entries }) => {
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
