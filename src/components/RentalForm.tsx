import React, { useState } from 'react';
import { useSigner } from '../utils/web3Provider'; // Custom hook to get signer
import { rentRV, mintNFT } from '../services/rentalService';

const RentalForm = () => {
  const [rentalAmount, setRentalAmount] = useState<number>(0);
  const [tokenURI, setTokenURI] = useState<string>('');
  const signer = useSigner(); // Assuming the signer is already set up
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signer) {
      alert('Connect your wallet!');
      return;
    }

    const success = await rentRV(signer, rentalAmount);
    if (success) {
      await mintNFT(signer, tokenURI);
      alert('Rental completed and NFT minted!');
    } else {
      alert('Rental process failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Rental Amount (USDC):</label>
        <input
          type="number"
          value={rentalAmount}
          onChange={(e) => setRentalAmount(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Token URI:</label>
        <input
          type="text"
          value={tokenURI}
          onChange={(e) => setTokenURI(e.target.value)}
          required
        />
      </div>
      <button type="submit">Rent RV</button>
    </form>
  );
};

export default RentalForm;
