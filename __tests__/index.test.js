/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';

import { JSDOM } from 'jsdom';

import { App } from '../src/index';

describe('app', () => {
  it('attaches event listener', () => {
    expect.assertions(1);

    const jsdom = new JSDOM('<html><body><form id="app"></form></body></html>');
    const doc = jsdom.window.document;

    App(doc);

    expect(doc.getElementById('app')).toHaveLength(0);
  });
});
