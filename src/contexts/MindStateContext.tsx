import React, { createContext, useContext, useState, useCallback } from 'react';

export type MindState = 'neural' | 'cyber' | 'dream';

interface MindStateColors {
  background: [number, number, number];
  primary: [number, number, number];
  glow: [number, number, number];
  fogColor: string;
}

const MIND_STATE_COLORS: Record<MindState, MindStateColors> = {
  neural: {
    background: [0.01, 0.012, 0.02],
    primary: [0.0, 0.85, 1.0],
    glow: [0.0, 0.6, 0.8],
    fogColor: '#020308',
  },
  cyber: {
    background: [0.005, 0.015, 0.008],
    primary: [0.2, 0.9, 0.3],
    glow: [0.1, 0.7, 0.2],
    fogColor: '#010302',
  },
  dream: {
    background: [0.025, 0.01, 0.03],
    primary: [0.85, 0.4, 0.75],
    glow: [0.6, 0.3, 0.7],
    fogColor: '#050208',
  },
};

interface MindStateContextType {
  mindState: MindState;
  setMindState: (state: MindState) => void;
  colors: MindStateColors;
  isTransitioning: boolean;
}

const MindStateContext = createContext<MindStateContextType | null>(null);

export const useMindState = () => {
  const ctx = useContext(MindStateContext);
  if (!ctx) throw new Error('useMindState must be used within MindStateProvider');
  return ctx;
};

export const MindStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mindState, setMindStateInternal] = useState<MindState>('neural');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const setMindState = useCallback((state: MindState) => {
    if (state === mindState) return;
    setIsTransitioning(true);
    setMindStateInternal(state);
    setTimeout(() => setIsTransitioning(false), 2400);
  }, [mindState]);

  return (
    <MindStateContext.Provider value={{ mindState, setMindState, colors: MIND_STATE_COLORS[mindState], isTransitioning }}>
      {children}
    </MindStateContext.Provider>
  );
};
