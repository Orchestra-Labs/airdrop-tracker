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

export enum AirdropStatus {
  NotStarted = 'Not Started',
  NotCounted = 'Not Counted',
  Ongoing = 'Ongoing',
  Counted = 'Counted',
  Cliff = 'Cliff',
  Vesting = 'Vesting',
  Disbursed = 'Disbursed',
}

export const AIRDROP_CATEGORY_STATUS: Record<string, AirdropStatus> = {
  'Discord Events': AirdropStatus.Ongoing,
  'Testnet Tasks': AirdropStatus.NotCounted,
  Communities: AirdropStatus.NotStarted,
  Fairdrop: AirdropStatus.NotStarted,
};
