import { keccak256 } from 'web3-utils';
import { encodeParameters } from 'web3-eth-abi';

const SAFE_TX_TYPEHASH = '0xbb8310d486368db6bd6f849402fdd73ad53d316b5a4b2644ad6efe0f941286d8';
const DOMAIN_SEPARATOR_TYPEHASH = '0x47e79534a245952e8b16893a336b85a3d9ea9fa8c573f3d803afb92a79469218';


export function getTxHash(safeAddress, chainId, nonce, to, value = '0', calldata = '0x', operation = '0', safeTxGas = '0', baseGas = '0', gasPrice = '0', gasToken = '0x0000000000000000000000000000000000000000', refundReceiver = '0x0000000000000000000000000000000000000000') {
  const safeTxHash  = keccak256(encodeParameters(
    [
      'bytes32',  // SAFE_TX_TYPEHASH
      'address',  // to
      'uint256',  // value
      'bytes32',  // keccak256(data)
      'uint',     // operation
      'uint256',  // safeTxGas
      'uint256',  // baseGas
      'uint256',  // gasPrice
      'address',  // gasToken
      'address',  // refundReceiver
      'uint256',  // _nonce
    ],
    [
      SAFE_TX_TYPEHASH,
      to,
      value,
      keccak256(calldata),
      operation,
      safeTxGas,
      baseGas,
      gasPrice,
      gasToken,
      refundReceiver,
      nonce,
    ]
  ));
  // web3.utils.encodePacked produces bullshit for bytes1
  const txData = '0x1901' + domainSeparator(chainId, safeAddress).substr(2) + safeTxHash.substr(2);
  return keccak256(txData);
}

export function domainSeparator(chainId, safeAddress) {
  return keccak256(encodeParameters(
    ['bytes32', 'uint256', 'address'],
    [DOMAIN_SEPARATOR_TYPEHASH, chainId, safeAddress],
  ));
}
