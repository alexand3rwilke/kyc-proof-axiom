import {
  add,
  sub,
  mul,
  div,
  checkLessThan,
  addToCallback,
  CircuitValue,
  CircuitValue256,
  constant,
  witness,
  getAccount,
  getReceipt,
  log,
  checkEqual
} from "@axiom-crypto/client";

// For type safety, define the input types to your circuit here.
// These should be the _variable_ inputs to your circuit. Constants can be hard-coded into the circuit itself.
export interface CircuitInputs {
  blockNumber: CircuitValue;
  txNumber : CircuitValue;
  address: CircuitValue;
}

// Default inputs to use for compiling the circuit. These values should be different than the inputs fed into
// the circuit at proving time.
export const defaultInputs = {
  "blockNumber": 5527475,
    "txNumber" : 22,
    "address": "0x2f7205f46840A18b98B7F5EC306daf5936434e62"
}

// The function name `circuit` is searched for by default by our Axiom CLI; if you decide to 
// change the function name, you'll also need to ensure that you also pass the Axiom CLI flag 
// `-f <circuitFunctionName>` for it to work
export const circuit = async (inputs: CircuitInputs) => {
  
  // // Binance Hot wallets
  // let binance1 = "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE"
  // let binance2 = "0xD551234Ae421e3BCBA99A0Da6d736074f22192FF"
  // let binance3 = "0x564286362092D8e7936f0549571a803B203aAceD"
  // let binance4 = "0x0681d8Db095565FE8A346fA0277bFfdE9C0eDBBF"
  // let binance5 = "0xfE9e8709d3215310075d67E3ed32A380CCf451C8"
  
  // //Binance most recent Hot Wallet
  // let binance14 = "0x28C6c06298d514Db089934071355E5743bf21d60"
  
  // //CB Hot wallet
  // let coinbase1 = "0x71660c4005BA85c37ccec55d0C4493E66Fe775d3"
  // let coinbase2 = "0x503828976D22510aad0201ac7EC88293211D23Da"
  // let coinbase3 = "0xddfAbCdc4D8FfC6d5beaf154f18B778f892A0740"
  // let coinbase4 = "0x3cD751E6b0078Be393132286c442345e5DC49699"
  // let coinbase5 = "0xb5d85CBf7cB3EE0D56b3bB207D5Fc4B82f43F511"
  // let coinbase6 = "0xeB2629a2734e272Bcc07BDA959863f316F4bD4Cf"
  // let coinbase7 = "0xD688AEA8f7d450909AdE10C47FaA95707b0682d9"
  // let coinbase8 = "0x02466E547BFDAb679fC49e96bBfc62B9747D997C"
  // let coinbase9 = "0x6b76F8B1e9E59913BfE758821887311bA1805cAB"
  // let coinbase10 = "0xA9D1e08C7793af67e9d92fe308d5697FB81d3E43"
  // let coinbase11 = "0x77696bb39917C91A0c3908D577d5e322095425cA"
  // let coinbase12 = "0x7c195D981AbFdC3DDecd2ca0Fed0958430488e34"
  // let coinbase13 = "0x95A9bd206aE52C4BA8EecFc93d18EACDd41C88CC"
  // let coinbase14 = "0xb739D0895772DBB71A89A3754A160269068f0D45"

  let binance14Fake = "0xdDA015FC1170466309B507269A427E671b932c0D"
  
  let transferLog = getReceipt(inputs.blockNumber, inputs.txNumber).log(0);
  let fromAddress = await transferLog.topic(1);
  let toAddress = await transferLog.topic(2);
  
 
  checkEqual(toAddress.toCircuitValue(),inputs.address);
  checkEqual(fromAddress.toCircuitValue(),binance14Fake)
  addToCallback(toAddress.toCircuitValue())

  
};