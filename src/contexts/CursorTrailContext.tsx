import { createContext, useContext, useState, ReactNode } from 'react';

type TrailType =
  | 'default'
  | 'hero'
  | 'projects'
  | 'about'
  | 'contact'
  | 'planets';

interface CursorTrailContextType {
  trailType: TrailType;
  setTrailType: (type: TrailType) => void;
}

const CursorTrailContext = createContext<CursorTrailContextType | undefined>(
  undefined
);

export const useCursorTrail = () => {
  const context = useContext(CursorTrailContext);
  if (!context) {
    throw new Error('useCursorTrail must be used within a CursorTrailProvider');
  }
  return context;
};

interface CursorTrailProviderProps {
  children: ReactNode;
}

export const CursorTrailProvider = ({ children }: CursorTrailProviderProps) => {
  const [trailType, setTrailType] = useState<TrailType>('default');

  return (
    <CursorTrailContext.Provider value={{ trailType, setTrailType }}>
      {children}
    </CursorTrailContext.Provider>
  );
};
