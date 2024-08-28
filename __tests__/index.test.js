/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';

import { JSDOM } from 'jsdom';

import { component, App } from '../src/index';

describe('component', () => {
  it('check innerText', () => {
    expect.assertions(1);
    expect(component(new JSDOM().window.document).tagName).toBe('DIV');
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
