import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from './utils/WavePortal.json';

export default function App() {
   const [currentAccount, setCurrentAccount] = useState("");
   const [wavers, setWavers] = useState([]);
    const contractAddress = "0x3ea0BF655989A45F142A87Ec5ff357BB50D19710";

  const checkIfWalletIsConnected = async() => {
    /*
    * First make sure we have access to window.ethereum
    */
   try {
      const { ethereum } = window;
      
      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }
      
      /*
      * Check if we're authorized to access the user's wallet
      */
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
        loadWaverCount()
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }
  const loadWaverCount= async ()=>{
try {
      const { ethereum } = window;
      const contractABI= abi.abi;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await wavePortalContract.getTotalWaves();
        let wavers = await wavePortalContract.getAllWavers();
        console.log("Retrieved total wave count...", count.toNumber());
      setWavers(wavers)

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }
useEffect(()=>{

checkIfWalletIsConnected();

},[])
const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 
    } catch (error) {
      console.log(error)
    }
  }
const wave = async ()=>{
   try {
      const { ethereum } = window;
      const contractABI= abi.abi;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        await wavePortalContract.wave();
        let count = await wavePortalContract.getTotalWaves();
        let wavers = await wavePortalContract.getAllWavers();
        console.log("Retrieved total wave count...", count.toNumber());
      setWavers(wavers)

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
}
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
        </div>

        <div className="bio">
        I am salinda a fullstack developer so that's pretty cool right? Connect your Ethereum wallet and wave at me!
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      
         {wavers.map(x=>(
           <span>{x}</span>
         ))}
       
      </div>
    </div>
  );
}
