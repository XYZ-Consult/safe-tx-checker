/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';

import { JSDOM } from 'jsdom';

import { component, App } from '../src/index';

describe('component', () => {
  it('check innerText', () => {
    expect.assertions(1);
    expect(component(new JSDOM().window.document).innerText).toBe('0x9232a6679a679063c05fc47c2e7035abee056597391d47106ff100edfc37f76b');
  });
});

describe('app', () => {
  it('appends app', () => {
    expect.assertions(1);

    const jsdom = new JSDOM('<html><body><div id="app"></div></body></html>');
    const doc = jsdom.window.document;

    App(doc);

    expect(doc.getElementById('app').childNodes).toHaveLength(1);
  });
});
