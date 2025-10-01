import React from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import AllTheProviders from './test-providers';

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export { screen, fireEvent, waitFor } from '@testing-library/react';
export { customRender as render };
