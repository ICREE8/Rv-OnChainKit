import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export const useSigner = () => {
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  useEffect(() => {
    const getProvider = async () => {
      const { ethereum } = window as any;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        setSigner(signer);
      }
    };
    getProvider();
  }, []);

  return signer;
};
