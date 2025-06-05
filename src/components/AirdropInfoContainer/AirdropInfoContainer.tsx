import { useChain } from '@cosmos-kit/react';
import { useState } from 'react';
import { defaultChainName, walletPrefix } from '@/constants';
import { useToast } from '@/hooks';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../Card';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
} from '../Table';
import { Button } from '../Button';
import {
  AIRDROP_CATEGORY_STATUS,
  AirdropEntry,
  airdropRecipients,
  AirdropStatus,
  truncateString,
  VALID_AIRDROP_CATEGORIES,
} from '@/sections';

type CategoryTotals = Record<string, number>;

export const AirdropInfoContainer = () => {
  const { connect, isWalletConnected, username, address } = useChain(defaultChainName);
  const { toast } = useToast();

  const [viewTopRecipients, setViewTopRecipients] = useState(true);

  const copyToClipboard = (addr: string) => {
    navigator.clipboard.writeText(addr);
    toast({
      title: `Copied to clipboard!`,
      description: `Address ${truncateString(walletPrefix, addr)} copied.`,
    });
  };

  // Top 10 calculation
  const totalsByRecipient: Record<string, number> = {};

  Object.entries(airdropRecipients).forEach(([recipient, entries]) => {
    const total = entries
      .filter(e => e.valid && VALID_AIRDROP_CATEGORIES.includes(e.reason))
      .reduce((sum, e) => sum + e.amount, 0);

    if (total > 0) {
      totalsByRecipient[recipient] = total;
    }
  });

  const topRecipients = Object.entries(totalsByRecipient)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([recipient, amount]) => ({ recipient, amount }));

  const airdropInfo = address ? airdropRecipients[address] ?? null : null;
  const categoryTotals: CategoryTotals = {};

  VALID_AIRDROP_CATEGORIES.forEach(category => {
    categoryTotals[category] = airdropInfo
      ? airdropInfo
          .filter(e => e.valid && e.reason === category)
          .reduce((sum, e) => sum + e.amount, 0)
      : 0;
  });

  const recipientTotal = airdropInfo
    ? airdropInfo.filter(e => e.valid).reduce((sum, e) => sum + e.amount, 0)
    : 0;

  return (
    <Card className="w-full max-w-[440px] bg-black backdrop-blur-xl relative">
      <CardHeader className="flex flex-col items-center gap-2 pb-0">
        <CardTitle className="text-center">🏆 Top 10 Airdrop Recipients</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-4 text-white font-medium px-4 pt-2">
          {/* Top 10 Table */}
          <div className="relative border border-white/10 rounded-md">
            <Table className="table-fixed w-full text-sm text-gray-300">
              <TableHeader className="bg-black border-b border-white/10">
                <TableRow>
                  <TableHead className="w-[5%] text-white text-center">#</TableHead>
                  <TableHead className="w-[65%] text-white pl-12">Address</TableHead>
                  <TableHead className="w-[30%] text-white text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topRecipients.map((entry, index) => (
                  <TableRow key={`${entry.recipient}-${index}`}>
                    <TableCell className="text-white text-center">{index + 1}</TableCell>
                    <TableCell
                      className="truncate text-white hover:cursor-pointer hover:underline"
                      onClick={() => copyToClipboard(entry.recipient)}
                    >
                      {truncateString(walletPrefix, entry.recipient)}
                    </TableCell>
                    <TableCell className="text-right text-green-400">
                      {entry.amount.toLocaleString('en-US')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* If wallet is not connected, show connect button */}
          {!isWalletConnected && (
            <div className="flex justify-center mt-4">
              <Button variant="outline" onClick={() => connect()}>
                Connect Wallet to View Your Airdrop
              </Button>
            </div>
          )}

          {/* If wallet is connected, show user info */}
          {isWalletConnected && airdropInfo && (
            <>
              <div className="mt-6 border-t border-white/10 pt-4">
                <CardTitle className="text-center">Wallet: {username}</CardTitle>
                <CardDescription
                  className="hover:bg-blue-hover hover:cursor-pointer p-2 rounded-md text-center"
                  onClick={() => copyToClipboard(address ?? '')}
                >
                  {address}
                </CardDescription>

                <div className="text-center mt-2">
                  🎁 You are eligible for{' '}
                  <span className="text-green-400">{recipientTotal}</span> MLD
                </div>

                {/* Personal table */}
                <div className="mt-4 border border-white/10 rounded-md">
                  <Table className="table-fixed w-full text-sm text-gray-300">
                    <TableHeader className="bg-black border-b border-white/10">
                      <TableRow>
                        <TableHead className="text-white">Category</TableHead>
                        <TableHead className="text-white text-right">Airdrop</TableHead>
                        <TableHead className="text-white text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {VALID_AIRDROP_CATEGORIES.map(category => (
                        <TableRow key={category}>
                          <TableCell className="text-left text-white">{category}</TableCell>
                          <TableCell className="text-right">
                            {[
                              AirdropStatus.NotStarted,
                              AirdropStatus.NotCounted,
                            ].includes(AIRDROP_CATEGORY_STATUS[category])
                              ? '-'
                              : categoryTotals[category].toLocaleString('en-US')}
                          </TableCell>
                          <TableCell className="text-right">
                            <span
                              className={`${
                                AIRDROP_CATEGORY_STATUS[category] === AirdropStatus.Ongoing
                                  ? 'text-success'
                                  : AIRDROP_CATEGORY_STATUS[category] === AirdropStatus.NotStarted ||
                                    AIRDROP_CATEGORY_STATUS[category] === AirdropStatus.NotCounted
                                  ? 'text-warning'
                                  : 'text-white'
                              }`}
                            >
                              {AIRDROP_CATEGORY_STATUS[category]}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
