import Web3 from 'web3'
import './App.css';
import Message from './Message.json'
import React, {useEffect, useState } from "react";



function useAsyncNetwork() {
  const [web3, setweb3] = useState(0);
  const [account, setAccount] = useState(0)

  useEffect(() => {


    async function loadWeb3() {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)

        let account = await window.ethereum.enable()
        setAccount(account)
        const web3 = window.web3
        setweb3(web3)
    

      }
      else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
      }
      else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
    }
    loadWeb3()

  }, [0]);

  return [web3, account];
}

function useAsyncData() {
  const [data, setData] = useState(0);
  const [contract, setContract] = useState(0)

  useEffect(() => {
    async function loadBlockchainData() {
      const web3 = window.web3
      const contract = new web3.eth.Contract(Message.abi, Message.address)
      setContract(contract)
      const get = await contract.methods.get().call()
      setData(get)
    }

    loadBlockchainData()

  }, [0]);

  return [data, contract];
}



const App = () => {
  const [web3, account] = useAsyncNetwork();
  const [data, contract] = useAsyncData()
  const [dataToBlockchain, setDataToBlockchain] = useState('');
  const [newData, setNewData] = useState(0)

 

async function handleSubmit(e) {
  e.preventDefault();
  const web3 = window.web3
  new web3.eth.Contract(Message.abi, Message.address)
  await contract.methods.set(dataToBlockchain).send({from:account[0]})
    let newData = await  contract.methods.get().call()
    setNewData(newData)
}

  return !web3 ? (
    <div>Loading Web3, accounts, and contract...</div>
  ) : (
      <div className="App">
        <h1>Your address:</h1>
        <p>{account}</p>
        <h1>Get data before change from blockchain: </h1>
        <p>{data }</p>
        <h1>Get data after change from blockchain: </h1>
        <p>{newData }</p>
        <h1>Change value in blockchain</h1>
        <form onSubmit={handleSubmit}>
      <label>
         data to send 
        <input
          type="text"
          value={dataToBlockchain}
          onChange={e => setDataToBlockchain(e.target.value)}
        />
      </label>
      <button onClick={handleSubmit}>Success!</button>
    </form>
        

      </div>
      
    );
};

export default App;
