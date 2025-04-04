export interface Asset {
  denom: string;
  amount: string;
  isIbc: boolean;
  logo?: string;
  symbol?: string;
  exponent?: number;
}

export interface AirdropEntry {
  amount: number;
  denom: string;
  reason: string;
  valid: boolean;
}

export type AirdropRecipients = Record<string, AirdropEntry[]>;

export const VALID_AIRDROP_CATEGORIES = [
  'Discord Events',
  'Testnet Tasks',
  'Communities',
  'Fairdrop',
] as readonly string[];
