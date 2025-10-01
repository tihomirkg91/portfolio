/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

declare module 'virtual:pwa-register/react' {
  import type { Dispatch, SetStateAction } from 'react';

  export interface RegisterSWOptions {
    immediate?: boolean;
    onNeedRefresh?(): void;
    onOfflineReady?(): void;
    onRegistered?(registration: ServiceWorkerRegistration | undefined): void;
    onRegisterError?(error: Error): void;
  }

  export interface RegisterSWReturnType {
    needRefresh: [boolean, Dispatch<SetStateAction<boolean>>];
    offlineReady: [boolean, Dispatch<SetStateAction<boolean>>];
    updateServiceWorker(reloadPage?: boolean): Promise<void>;
  }

  export function useRegisterSW(
    options?: RegisterSWOptions
  ): RegisterSWReturnType;
}
