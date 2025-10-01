import React from 'react';
import ResponsiveProvider from '../../src/context/ResponsiveContext';
import { PortfolioProvider } from '../../src/context/PortfolioContext';

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <ResponsiveProvider>
    <PortfolioProvider>{children}</PortfolioProvider>
  </ResponsiveProvider>
);

export default AllTheProviders;
