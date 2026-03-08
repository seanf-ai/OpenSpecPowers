import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';

import {
  type SkillTemplate,
  getApplyChangeSkillTemplate,
  getArchiveChangeSkillTemplate,
  getBulkArchiveChangeSkillTemplate,
  getContinueChangeSkillTemplate,
  getExploreSkillTemplate,
  getFeedbackSkillTemplate,
  getFfChangeSkillTemplate,
  getNewChangeSkillTemplate,
  getOnboardSkillTemplate,
  getOpsxApplyCommandTemplate,
  getOpsxArchiveCommandTemplate,
  getOpsxBulkArchiveCommandTemplate,
  getOpsxContinueCommandTemplate,
  getOpsxExploreCommandTemplate,
  getOpsxFfCommandTemplate,
  getOpsxNewCommandTemplate,
  getOpsxOnboardCommandTemplate,
  getOpsxSyncCommandTemplate,
  getOpsxProposeCommandTemplate,
  getOpsxProposeSkillTemplate,
  getOpsxVerifyCommandTemplate,
  getSyncSpecsSkillTemplate,
  getVerifyChangeSkillTemplate,
} from '../../../src/core/templates/skill-templates.js';
import { generateSkillContent } from '../../../src/core/shared/skill-generation.js';

const EXPECTED_FUNCTION_HASHES: Record<string, string> = {
  getExploreSkillTemplate: '51cf80b41f4275eb1e5f4486190f8e657b4246293681f57e63503fd9c6f80d47',
  getNewChangeSkillTemplate: '46e2d881ce17947af1bc1404c65553b6ef1e8fce3d6204c4284c431e150094f2',
  getContinueChangeSkillTemplate: '48443ca98750ec9ddf50bee4c34551d58fef3bfd2442580c210cc32cdefc85fa',
  getApplyChangeSkillTemplate: 'b66b80b41013ab6d4bc910916ba5e9dea02e1ad3882c8f8dd602f95affd5a518',
  getFfChangeSkillTemplate: 'c7a695b76c8f40d0d453369acae0c461434886439501b9f42c330f49a70e83e5',
  getSyncSpecsSkillTemplate: 'd6f09ad847aa89de8fd88f35ed11830317025813d000f67efcdd390acf5935dc',
  getOnboardSkillTemplate: '1e7f30f9ddbc129a4aefb347e7f33867f684e236b14de387c7de824c9b3b4257',
  getOpsxExploreCommandTemplate: '2247156a44e5140028e79a57376fc70f3b8de4dd03330445cf990b3931594454',
  getOpsxNewCommandTemplate: '98dd44ab2b009d62d41d508c9a521964c04156d73181d5384140ecb98d565460',
  getOpsxContinueCommandTemplate: '9fb8a8347ecc3c7c31a09350fd106c5715acd26190e5899c12bec64ea26c40f4',
  getOpsxApplyCommandTemplate: 'd17fd329db4f6e666e52ef761a703460e476044170fc3eb489bf699dbd00622f',
  getOpsxFfCommandTemplate: 'f8d33d4b2a23da1c89fa15184e171477f0091e845a2d57c8a3dba0766badde77',
  getArchiveChangeSkillTemplate: 'e50d4cda7ce92e01083fb9089c1d3788c81b5ab14290152204603bc56d0a8bb2',
  getBulkArchiveChangeSkillTemplate: 'd4168533df974e7252d5f3a233628a6f2ce55c6f73dae369da25a31a2dd3f79a',
  getOpsxSyncCommandTemplate: '103e03688d24a892a1b96dc35adb39c0944cc431de734944b88c2c9d9ff16eab',
  getVerifyChangeSkillTemplate: 'd7b6d8c0d2e5acf699c5c1b44336f15ad4d9ed4d0b3622ef80219ff21686c2fb',
  getOpsxArchiveCommandTemplate: '8cad22d6e7bb836016eee1ec26d8ba9392d3a6441e92cff084c8b9d01cae5007',
  getOpsxOnboardCommandTemplate: '53bedb8c227ec9a1684bf27a0990dc108c7a35d6b1b2f91f6618841af13b863b',
  getOpsxBulkArchiveCommandTemplate: 'a30210db78830b22ef9fc90791ff350be7dfcec9cd47a3a9e73cd78ac7aa5b0f',
  getOpsxVerifyCommandTemplate: 'a4c6a08a5ec7c9029673055478ea6f2530456439d385f2dbd2c6f8a6d1b35d06',
  getOpsxProposeSkillTemplate: '7397d62a33f48f5b5a95b6c1c8e9b9c74654e2215be7a9d88bd1a1a14000f371',
  getOpsxProposeCommandTemplate: '82195e0bc2cf0a05b02ed2905e1fcf8288a6c40fa441bf7a91ede130adcb83e8',
  getFeedbackSkillTemplate: '237f4dc7c644f63c13c1b4adc0b0fcd217e24f4517786a58a23b840b52cc5194',
};

const EXPECTED_GENERATED_SKILL_CONTENT_HASHES: Record<string, string> = {
  'openspecpowers-explore': 'ecf4f7442fb17c9737d874f1ca2e2e18761b204dfe10151d9bc1f3e2266713d3',
  'openspecpowers-new-change': 'df97fc1875c78f4414b9c6d3a4d01abddabe1a8dc949c611897c091000a20086',
  'openspecpowers-continue-change': '1d81c26db75b983d4c6fe1235271700d600feac5d7a2bb6c7daff11e444fafa5',
  'openspecpowers-apply-change': '00ce1eb49bf31b53bfe54ff6672e6ed5bdaf40a7bb4f24549fff2319504c1035',
  'openspecpowers-ff-change': '1156796325bc87a81d1dde3dc172d3f3bc316e5c1de4c892ef853d2bc7866f19',
  'openspecpowers-sync-specs': '3612bee81266e6e6719a139971d895828ebd81212f5a25d4b6153a1596d1bd59',
  'openspecpowers-archive-change': '40fc895e705da4fc4f428f10921e2243e4fdc173cddfb13458a6c6ca16f34322',
  'openspecpowers-bulk-archive-change': 'c0654ff753b59a59e46de757782ce0eb88020e335e89dd217d5e4127484e2bf2',
  'openspecpowers-verify-change': 'e8c8679f1c3aeb1fd91277c11cb3c562f2ce1fbab97737abf238258ae89c22a4',
  'openspecpowers-onboard': '4053ed2c5863bbe2ada5d5213f94bcce0108635c558dc23349304534758d0dd0',
  'openspecpowers-propose': '3a6d3c0b025562f4dbf8963fabe2e532c934388e9d7b0b18c346f22c2c60a501',
};

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(',')}]`;
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, item]) => `${JSON.stringify(key)}:${stableStringify(item)}`);

    return `{${entries.join(',')}}`;
  }

  return JSON.stringify(value);
}

function hash(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

describe('skill templates split parity', () => {
  it('preserves all template function payloads exactly', () => {
    const functionFactories: Record<string, () => unknown> = {
      getExploreSkillTemplate,
      getNewChangeSkillTemplate,
      getContinueChangeSkillTemplate,
      getApplyChangeSkillTemplate,
      getFfChangeSkillTemplate,
      getSyncSpecsSkillTemplate,
      getOnboardSkillTemplate,
      getOpsxExploreCommandTemplate,
      getOpsxNewCommandTemplate,
      getOpsxContinueCommandTemplate,
      getOpsxApplyCommandTemplate,
      getOpsxFfCommandTemplate,
      getArchiveChangeSkillTemplate,
      getBulkArchiveChangeSkillTemplate,
      getOpsxSyncCommandTemplate,
      getVerifyChangeSkillTemplate,
      getOpsxArchiveCommandTemplate,
      getOpsxOnboardCommandTemplate,
      getOpsxBulkArchiveCommandTemplate,
      getOpsxVerifyCommandTemplate,
      getOpsxProposeSkillTemplate,
      getOpsxProposeCommandTemplate,
      getFeedbackSkillTemplate,
    };

    const actualHashes = Object.fromEntries(
      Object.entries(functionFactories).map(([name, fn]) => [name, hash(stableStringify(fn()))])
    );

    expect(actualHashes).toEqual(EXPECTED_FUNCTION_HASHES);
  });

  it('preserves generated skill file content exactly', () => {
    // Intentionally excludes getFeedbackSkillTemplate: skillFactories only models templates
    // deployed via generateSkillContent, while feedback is covered in function payload parity.
    const skillFactories: Array<[string, () => SkillTemplate]> = [
      ['openspecpowers-explore', getExploreSkillTemplate],
      ['openspecpowers-new-change', getNewChangeSkillTemplate],
      ['openspecpowers-continue-change', getContinueChangeSkillTemplate],
      ['openspecpowers-apply-change', getApplyChangeSkillTemplate],
      ['openspecpowers-ff-change', getFfChangeSkillTemplate],
      ['openspecpowers-sync-specs', getSyncSpecsSkillTemplate],
      ['openspecpowers-archive-change', getArchiveChangeSkillTemplate],
      ['openspecpowers-bulk-archive-change', getBulkArchiveChangeSkillTemplate],
      ['openspecpowers-verify-change', getVerifyChangeSkillTemplate],
      ['openspecpowers-onboard', getOnboardSkillTemplate],
      ['openspecpowers-propose', getOpsxProposeSkillTemplate],
    ];

    const actualHashes = Object.fromEntries(
      skillFactories.map(([dirName, createTemplate]) => [
        dirName,
        hash(generateSkillContent(createTemplate(), 'PARITY-BASELINE')),
      ])
    );

    expect(actualHashes).toEqual(EXPECTED_GENERATED_SKILL_CONTENT_HASHES);
  });
});
