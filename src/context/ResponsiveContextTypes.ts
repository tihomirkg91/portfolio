import type { ReactNode } from 'react';

export interface ResponsiveContextType {
  readonly isMobile: boolean;
}

export interface ResponsiveProviderProps {
  readonly children: ReactNode;
}
