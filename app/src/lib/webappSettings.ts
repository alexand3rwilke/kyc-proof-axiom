import compiledCircuit from "../../axiom/data/compiled.json";
import inputs from "../../axiom/data/inputs.json";
import AverageBalanceAbi from "./abi/AverageBalance.json";
import ExchangeKYCAbi from "./abi/ExchangeKYC.json";

export const WebappSettings = {
  compiledCircuit,
  inputs,
  provider: process.env.NEXT_PUBLIC_PROVIDER_URI_SEPOLIA as string,
  chainId: "11155111",
  //change to callback contract
  callbackTarget: "0x1677a836ed1c01e4fe9f6713c0673f78bf56d87f",
  callbackAbi: ExchangeKYCAbi,
}