import type { NitroApp } from 'nitropack';

declare module '#imports' {
  export function defineNitroPlugin(plugin: (nitroApp: NitroApp) => void): void;
}
