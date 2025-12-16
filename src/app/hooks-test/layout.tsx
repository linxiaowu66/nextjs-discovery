'use client';

import { createContext } from 'react';

export const TestContext = createContext<string>('test-context-value');

export default function HooksTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TestContext.Provider value="test-context-value">
      {children}
    </TestContext.Provider>
  );
}

