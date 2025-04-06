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
  AirdropEntry,
  airdropRecipients,
  truncateString,
  VALID_AIRDROP_CATEGORIES,
} from '@/sections';

type CategoryTotals = Record<string, number>;

export const AirdropInfoContainer = () => {
  const { username, address } = useChain(defaultChainName);
  const { toast } = useToast();
  const [viewTopRecipients, setViewTopRecipients] = useState(false);

  const { address: sendAddress } = useChain(defaultChainName);

  // Look up the airdrop entries for the sendAddress
  const airdropInfo = sendAddress
    ? airdropRecipients[sendAddress] ?? null
    : null;

  const totalsByRecipient: Record<string, number> = {};

  Object.entries(airdropRecipients).forEach(([recipient, entries]) => {
    const total = entries
      .filter(
        entry => entry.valid && VALID_AIRDROP_CATEGORIES.includes(entry.reason),
      )
      .reduce((sum, entry) => sum + entry.amount, 0);

    if (total > 0) {
      totalsByRecipient[recipient] = total;
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
          .filter(entry => entry.valid && entry.reason === category)
          .reduce((sum: number, entry: AirdropEntry) => sum + entry.amount, 0)
      : 0;
  });

  const recipientTotal = airdropInfo
    ? airdropInfo
        .filter(entry => entry.valid)
        .reduce((sum: number, entry: AirdropEntry) => sum + entry.amount, 0)
    : 0;

  const topRecipientsTotal = topRecipients.reduce(
    (sum: number, e: { amount: number }) => sum + e.amount,
    0,
  );

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: `Copied to clipboard!`,
      description: `Address ${truncateString(walletPrefix, address)} has been copied.`,
    });
  };

  return (
    <Card className="w-full max-w-[400px] bg-black backdrop-blur-xl relative">
      <CardHeader
        className={`flex flex-col items-center gap-2 ${!viewTopRecipients && 'pb-0'}`}
      >
        <div className="w-full flex justify-end">
          <Button
            size="sm"
            variant="outline"
            className="text-xs text-white border-white"
            onClick={() => setViewTopRecipients(prev => !prev)}
          >
            {viewTopRecipients ? 'View My Info' : 'View Top 10'}
          </Button>
        </div>
        <CardTitle className="text-center">
          {viewTopRecipients
            ? '🏆 Top 10 Airdrop Recipients'
            : `Wallet: ${username}`}
          {!viewTopRecipients && (
            <CardDescription
              className="hover:bg-blue-hover hover:cursor-pointer p-2 rounded-md text-center"
              onClick={() => copyToClipboard((address || '').toString())}
            >
              {address}
            </CardDescription>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-4 text-white font-medium px-4 pt-2">
          {!viewTopRecipients && airdropInfo && (
            <div className="text-center">
              🎁 You are eligible for{' '}
              <span className="text-green-400">{recipientTotal}</span> MLD
            </div>
          )}

          <div className="relative border border-white/10 rounded-md">
            {/* Header Table */}
            <Table className="table-fixed w-full text-sm text-gray-300">
              <TableHeader className="bg-black border-b border-white/10">
                <TableRow>
                  {viewTopRecipients ? (
                    <>
                      <TableHead className="w-[5%] text-white text-center">
                        #
                      </TableHead>
                      <TableHead className="w-[65%] text-white">
                        Address
                      </TableHead>
                      <TableHead className="w-[30%] text-white text-right">
                        Amount
                      </TableHead>
                    </>
                  ) : (
                    <>
                      <TableHead className="w-1/2 text-white">
                        Category
                      </TableHead>
                      <TableHead className="w-1/2 text-white text-right">
                        Airdrop
                      </TableHead>
                    </>
                  )}
                </TableRow>
              </TableHeader>
            </Table>

            {/* Scrollable Body Table */}
            <div className="max-h-[96px] overflow-y-auto w-full">
              <Table className="table-fixed w-full text-sm text-gray-300">
                <TableBody>
                  {viewTopRecipients
                    ? topRecipients.map((entry, index) => (
                        <TableRow key={`${entry.recipient}-${index}`}>
                          <TableCell className="w-[5%] text-white text-center">
                            {index + 1}
                          </TableCell>
                          <TableCell className="w-[65%] truncate text-white">
                            {truncateString(walletPrefix, entry.recipient)}
                          </TableCell>
                          <TableCell className="w-[30%] text-right text-green-400">
                            {entry.amount}
                          </TableCell>
                        </TableRow>
                      ))
                    : VALID_AIRDROP_CATEGORIES.map(category => (
                        <TableRow key={category}>
                          <TableCell className="w-1/2 text-white text-left">
                            {category}
                          </TableCell>
                          <TableCell className="w-1/2 text-right text-green-400">
                            {categoryTotals[category]}
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="flex justify-end mt-1">
            <span className="text-white font-bold mr-2">Total:</span>
            <span className="text-green-400 font-bold">
              {viewTopRecipients ? topRecipientsTotal : recipientTotal}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
