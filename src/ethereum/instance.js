import {ethers} from 'ethers';
import Buzcafe from './Buzcafe.json';
import KycDapp from './KycDapp.json';

window.providerESN = new ethers.providers.JsonRpcProvider(
  "https://mainnet.eraswap.network"
);
window.provider = new ethers.providers.JsonRpcProvider(
  "https://mainnet.eraswap.network"
);

window.buzcafeInst = new ethers.Contract('0x337Ad7db40DFcbEb5eDeCBCb5072aCc21Ded8be7', Buzcafe.abi, window.providerESN);
window.kycdappInst = new ethers.Contract('0xe1347dAAffbd3102F6CD67edAEA9dfc8A8C4FaDB', KycDapp.abi, window.providerESN);