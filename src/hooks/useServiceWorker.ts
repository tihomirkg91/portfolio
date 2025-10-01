import { useMemo } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export const useServiceWorker = () => {
  const swOptions = useMemo(
    () => ({
      onRegistered() {
        // console.log('SW Registered: ' + r);
      },
      onRegisterError() {
        // console.log('SW registration error', error);
      },
      onNeedRefresh() {
        // console.log('SW update available - updating silently');
      },
      onOfflineReady() {
        // console.log('App ready to work offline');
      },
    }),
    []
  );

  useRegisterSW(swOptions);
};
