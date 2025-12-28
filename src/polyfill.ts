/* eslint-disable @typescript-eslint/no-explicit-any */
import { Buffer } from "buffer";
(window as any).Buffer = Buffer;

// Process polyfill for Node.js stream libraries
(window as any).process = {
  env: {},
  browser: true,
  version: '',
  nextTick: (fn: () => void, ...args: any[]) => setTimeout(() => fn(...args), 0),
};