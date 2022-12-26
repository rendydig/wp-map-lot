import { createElement as h, render as hRender, Component } from 'https://unpkg.com/preact@latest?module';
import { useState as hUseState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import htm from 'https://unpkg.com/htm?module';

// Initialize htm with Preact
export const html = htm.bind(h);
export const render = hRender;
export const useState = hUseState
export default { html, render, useState };