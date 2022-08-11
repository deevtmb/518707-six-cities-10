import { render, screen } from '@testing-library/react';
import { makeFakeOffer } from '../../mocks/mocks';
import Map from './map';

describe('Component: Map', () => {
  const offer = makeFakeOffer();
  it('Case: rendered correctly', () => {
    render(<Map city={offer.city} offers={[]} additionalClass={''} activeOffer={null} />);

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
