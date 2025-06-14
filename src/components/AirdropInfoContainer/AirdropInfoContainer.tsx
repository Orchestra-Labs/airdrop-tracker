import { useChain } from '@cosmos-kit/react';
import { useEffect, useState } from 'react';
import { defaultChainName, walletPrefix } from '@/constants';
import { useToast } from '@/hooks';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../Card';
import { Button } from '../Button';
import {
  AirdropEntry,
  airdropRecipients,
  truncateString,
  VALID_AIRDROP_CATEGORIES,
} from '@/sections';
import { LogOut, Wallet } from 'lucide-react';
import { TopRecipientsTable } from './TopRecipientsTable';
import { UserAirdropTable } from './UserAirdropTable';

type CategoryTotals = Record<string, number>;

export const AirdropInfoContainer = () => {
  const { username, address, isWalletConnected, connect, disconnect } =
    useChain(defaultChainName);
  const { toast } = useToast();
  const [viewTopRecipients, setViewTopRecipients] = useState(false);

  const { address: sendAddress } = useChain(defaultChainName);
  const airdropInfo = sendAddress
    ? airdropRecipients[sendAddress] ?? null
    : null;

  const totalsByRecipient: Record<string, number> = {};
  let allRecipientsTotal = 0;

  Object.entries(airdropRecipients).forEach(([recipient, entries]) => {
    const total = entries
      .filter(
        entry =>
          entry.valid && VALID_AIRDROP_CATEGORIES.includes(entry.category),
      )
      .reduce((sum, entry) => sum + entry.amount, 0);

    if (total > 0) {
      allRecipientsTotal += total;
      if (recipient !== 'unclaimed') {
        totalsByRecipient[recipient] = total;
      }
    }
  });

  const topRecipients = Object.entries(totalsByRecipient)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([recipient, amount]) => ({ recipient, amount }));

  const categoryTotals: CategoryTotals = {};
  VALID_AIRDROP_CATEGORIES.forEach(category => {
    categoryTotals[category] = airdropInfo
      ? airdropInfo
          .filter(entry => entry.valid && entry.category === category)
          .reduce((sum: number, entry: AirdropEntry) => sum + entry.amount, 0)
      : 0;
  });

  const recipientTotal = airdropInfo
    ? airdropInfo
        .filter(entry => entry.valid)
        .reduce((sum: number, entry: AirdropEntry) => sum + entry.amount, 0)
    : 0;

  const copyToClipboard = (addr: string) => {
    navigator.clipboard.writeText(addr);
    toast({
      title: 'Copied to clipboard!',
      description: `Address ${truncateString(walletPrefix, addr)} has been copied.`,
    });
  };

  useEffect(() => {
    if (isWalletConnected) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 0);
    }
  }, [isWalletConnected]);

  return (
    <Card className="w-full max-w-[440px] bg-black backdrop-blur-xl relative">
      <CardHeader
        className={`flex flex-col items-center gap-2 ${!viewTopRecipients && 'pb-0'}`}
      >
        <div className="w-full flex justify-end items-center">
          <Button
            size="sm"
            variant="outline"
            className="text-xs text-white border-white"
            onClick={() => setViewTopRecipients(prev => !prev)}
          >
            {viewTopRecipients ? 'View My Info' : 'View Top 10'}
          </Button>
          {isWalletConnected && (
            <Button
              size="sm"
              variant="ghost"
              className="ml-2 text-white hover:text-red-400"
              onClick={e => {
                e.preventDefault();
                disconnect();
              }}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>

        <CardTitle className="text-center">
          {viewTopRecipients
            ? '🏆 Top 10 Airdrop Recipients'
            : `Wallet: ${isWalletConnected ? username : 'Not Connected'}`}
          {!viewTopRecipients && (
            <CardDescription
              className="hover:bg-blue-hover hover:cursor-pointer p-2 rounded-md text-center"
              onClick={() => copyToClipboard(address || '')}
            >
              {address}
            </CardDescription>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-4 text-white font-medium px-4 pt-2">
          {!isWalletConnected && !viewTopRecipients && (
            <div className="relative border border-white/10 rounded-md">
              <div className="invisible">
                <TopRecipientsTable topRecipients={topRecipients} />
              </div>
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <Button variant="outline" onClick={() => connect()}>
                  <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
                </Button>
              </div>
            </div>
          )}

          {isWalletConnected && !viewTopRecipients && (
            <>
              {airdropInfo && (
                <div className="text-center">
                  🎁 You are eligible for{' '}
                  <span className="text-green-400">{recipientTotal}</span> MLD
                </div>
              )}
              <UserAirdropTable categoryTotals={categoryTotals} />
            </>
          )}

          {viewTopRecipients && (
            <TopRecipientsTable topRecipients={topRecipients} />
          )}

          <div className="flex justify-end mt-1">
            <span className="text-white font-bold mr-2">Total To Date:</span>
            <span className="font-bold">
              {viewTopRecipients
                ? allRecipientsTotal.toLocaleString('en-US')
                : isWalletConnected
                  ? recipientTotal.toLocaleString('en-US')
                  : '-'}{' '}
              MLD
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
