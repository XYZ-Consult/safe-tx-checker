import { keccak256 } from 'web3-utils';
import { encodeParameters } from 'web3-eth-abi';

export function getTxHash() {
  // Sample data from a trivial transaction 0x014b39df3d37c206395f26fd6a6bcfcbfbdae691e7491aa0d4de187f5a06b6a3
  // This swapped owners on 0x4e4943346848c4867f81dfb37c4ca9c5715a7828 multisig
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
      '0xbb8310d486368db6bd6f849402fdd73ad53d316b5a4b2644ad6efe0f941286d8',
      '0x4e4943346848c4867f81dfb37c4ca9c5715a7828',
      '0',
      keccak256('0xe318b52b000000000000000000000000702cacafa54b88e9c54449563fb2e496e85c78b70000000000000000000000009df8bc0918f357c766a5697e031ff5237c05747a000000000000000000000000fadb20191ab38362c50f52909817b74214ca79ae'),
      '0',
      '0',
      '0',
      '0',
      '0x0000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000',
      '145',
    ]
  ));
  // web3.utils.encodePacked produces bullshit for bytes1
  const txData = '0x1901' + domainSeparator().substr(2) + safeTxHash.substr(2);
  return keccak256(txData);
}

export function domainSeparator() {
  return keccak256(encodeParameters(
    ['bytes32', 'uint256', 'address'],
    ['0x47e79534a245952e8b16893a336b85a3d9ea9fa8c573f3d803afb92a79469218', '1', '0x4e4943346848c4867f81dfb37c4ca9c5715a7828'],
  ));
}
