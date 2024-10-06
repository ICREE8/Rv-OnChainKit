import { ethers } from 'ethers';
import { USDC_CONTRACT_ADDRESS, RENTAL_CONTRACT_ADDRESS } from '../utils/constants';
import usdcAbi from './abis/usdcAbi.json'; // ABI for USDC
import rentalAbi from './abis/rentalAbi.json'; // ABI for Rental Contract

// Function to handle USDC payment
export const rentRV = async (signer: ethers.Signer, rentalAmount: number) => {
  const usdcContract = new ethers.Contract(USDC_CONTRACT_ADDRESS, usdcAbi, signer);
  const rentalPriceInUSDC = ethers.utils.parseUnits(rentalAmount.toString(), 6); // Convert to USDC (6 decimals)
  
  try {
    const tx = await usdcContract.transfer(RENTAL_CONTRACT_ADDRESS, rentalPriceInUSDC);
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Rental payment failed:', error);
    return false;
  }
};

// Function to mint NFT as booking confirmation
export const mintNFT = async (signer: ethers.Signer, tokenURI: string) => {
  const rentalContract = new ethers.Contract(RENTAL_CONTRACT_ADDRESS, rentalAbi, signer);
  try {
    const tx = await rentalContract.mintNFT(await signer.getAddress(), tokenURI);
    await tx.wait();
    return true;
  } catch (error) {
    console.error('NFT minting failed:', error);
    return false;
  }
};
