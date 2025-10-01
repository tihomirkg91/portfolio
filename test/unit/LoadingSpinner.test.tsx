import { describe, it, expect } from 'vitest';
import { render, screen } from '../setup/test-utils';
import LoadingSpinner from '../../src/components/LoadingSpinner';
import '@testing-library/jest-dom';

describe('LoadingSpinner', () => {
  it('should render without crashing', () => {
    render(<LoadingSpinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should have correct accessibility attributes', () => {
    render(<LoadingSpinner />);
    const container = screen.getByRole('status');

    expect(container).toHaveAttribute('aria-label', 'Loading content');
    expect(container).toHaveClass('loading-container');
  });

  it('should render spinner element', () => {
    render(<LoadingSpinner />);
    const spinner = document.querySelector('.loading-spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('should have screen reader text', () => {
    render(<LoadingSpinner />);
    const srText = screen.getByText('Loading...');
    expect(srText).toBeInTheDocument();
    expect(srText).toHaveClass('sr-only');
  });
});
