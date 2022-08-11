import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import {fakeStore} from '../../mocks/mocks';
import HeaderUserInfo from './header-user-info';

describe('Component: HeaderUserInfo', () => {
  it('Case: rendered correctly', () => {
    const user = {
      email: 'em@i.l',
    };

    render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <HeaderUserInfo />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(user.email)).toBeInTheDocument();
  });
});
