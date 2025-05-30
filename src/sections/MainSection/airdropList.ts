import { AirdropEntry, VALID_AIRDROP_CATEGORIES } from './types';
import { airdropData } from '@/constants';

type AirdropRecipients = Record<string, AirdropEntry[]>;
const airdropRecipients: AirdropRecipients = {};

// TODO: Discord events entries recorded at https://docs.google.com/spreadsheets/d/1_Oz5fIKslbozCbYeU0vMWCi9vpbjoI8ClUr_OIZM-I0/edit?gid=372520803#gid=372520803
const airdropArray = [...airdropData];

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
