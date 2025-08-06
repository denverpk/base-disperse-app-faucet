import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ethers } from 'ethers';

export default function FaucetApp() {
  const [walletAddress, setWalletAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  const handleFaucet = async () => {
    try {
      setStatus('Sending...');

      const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/base');
      const faucetPrivateKey = '<0xc37bb6ee6cc890ee8180aaef68e016a7fa144cb42596995a16160ff26ce076c7>'; // Replace with your faucet wallet private key
      const signer = new ethers.Wallet(faucetPrivateKey, provider);

      const tx = await signer.sendTransaction({
        to: walletAddress,
        value: ethers.utils.parseEther(amount),
      });

      await tx.wait();

      setStatus('Transaction Successful: ' + tx.hash);
    } catch (error) {
      console.error(error);
      setStatus('Transaction Failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h1 className="text-xl font-bold mb-4">Base Mainnet Faucet</h1>
          <Input
            placeholder="Wallet Address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="mb-3"
          />
          <Input
            placeholder="Amount (ETH)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mb-3"
          />
          <Button onClick={handleFaucet} className="w-full">Send</Button>
          {status && <p className="mt-3 text-sm text-center">{status}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
