import { render, screen } from '@testing-library/react';
import { SortOption } from '../../const';
import SortOptions from './sort-options';

describe('Component: SortOptions', () => {
  it('Case: rendered correctly', () => {
    const mockCallback = jest.fn();

    render(<SortOptions onSortOptionClick={mockCallback} currentSortOption={''}/>);

    Object.values(SortOption).forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });
});
