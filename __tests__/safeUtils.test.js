import { describe, expect, it } from '@jest/globals';

import { getTxHash, domainSeparator } from '../src/safeUtils';

describe('getTxHash', () => {
  it('calculates correct hash for swap owners', () => {
    expect.assertions(1);
    // Sample data from a trivial transaction 0x014b39df3d37c206395f26fd6a6bcfcbfbdae691e7491aa0d4de187f5a06b6a3
    // This swapped owners on 0x4e4943346848c4867f81dfb37c4ca9c5715a7828 multisig, nonce 145

    const safe = '0x4e4943346848c4867f81dfb37c4ca9c5715a7828';
    expect(getTxHash(safe, 1, 145, safe, 0, '0xe318b52b000000000000000000000000702cacafa54b88e9c54449563fb2e496e85c78b70000000000000000000000009df8bc0918f357c766a5697e031ff5237c05747a000000000000000000000000fadb20191ab38362c50f52909817b74214ca79ae')).toBe('0x9232a6679a679063c05fc47c2e7035abee056597391d47106ff100edfc37f76b');
  });

  it('calcluates correst hash for rejection', () => {
    expect.assertions(1);
    // Sample data from an onchain rejection 0xd66b115a18719b37b54de989c9ca1dae64acffae23fa122ce4e05f2c16be4e4e
    // Safe 0x4e4943346848c4867f81dfb37c4ca9c5715a7828, nonce 136

    const safe = '0x4e4943346848c4867f81dfb37c4ca9c5715a7828';
    expect(getTxHash(safe, 1, 136, safe)).toBe('0xf0f6f9eaffb5c396a6657ff44436532ecbafe19e5d9b20a86abac69353a3316e');
  });
});

describe('domainSeparator', () => {
  it('calculates correct hash for Ethereum', () => {
    expect.assertions(1);

    // 0xd9db270c1b5e3bd161e8c8503c55ceabee709552 is 1.3.0 singleton on Ethereum

    expect(domainSeparator(1, '0xd9db270c1b5e3bd161e8c8503c55ceabee709552')).toBe('0xb0d1bc5d61a96b7e642e23eb0d9f7d3d53a1e9b75f5b28b8e68b1bdb8e9faecb');
  });

  it('calculates correct hash for Era', () => {
    expect.assertions(1);

    // 0x1727c2c531cf966f902E5927b98490fDFb3b2b70 is 1.3.0 singleton on Era

    expect(domainSeparator(324, '0x1727c2c531cf966f902E5927b98490fDFb3b2b70')).toBe('0x99b1cfe92f2a6048c3cb48b64c60dff6014b0b56de8391e2d144e6f71ff0484d');
  });
});
