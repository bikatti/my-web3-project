const Web3 = require('web3')

window.onload = function () {
  let web3
  let from

  // Elements
  const connectBtn = document.getElementById('connect')
  const content = document.getElementById('content')
  const account = document.getElementById('account')

  // Form
  const form = document.getElementById('send')
  const recipientInput = document.getElementById('recipient')
  const amountInput = document.getElementById('amount')

  const ethereum = window.ethereum

  // Functions
  const connect = async () => {
    if (ethereum) {
      try {
        await ethereum.request({
          method: 'eth_requestAccounts'
        })
  
        web3 = new Web3(Web3.givenProvider || ethereum)      
  
        let accounts = await web3.eth.getAccounts()
  
        from = accounts[0]
  
        content.style.display = 'initial'
        connectBtn.style.display = 'none'
        account.innerText = from
      } catch (error) {
        alert('Has rechazado la conexión')
      }
    }

    
    if (!ethereum) {
      alert('Necesitas un proveedor de web3')
    }
  }

  const transact = async event => {
    event.preventDefault()
    
    const amount = amountInput.value
    const recipient = recipientInput.value

    if(Number(amount) <= 0) {
      alert('Valor no permitido')
      return
    }

    if (!web3.utils.isAddress(recipient)) {
      alert('Dirección inválida')
      return
    }

    web3.eth.sendTransaction({
      from: from,
      to: recipient,
      value: amount,
    })
  }

  // Listeners
  connectBtn.onclick = connect
  form.onsubmit = transact
}