import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../components/Catalog/Catalog', () => () => <div>Mocked Catalog</div>);
jest.mock('../../hooks/useCheckAuth', () => () => {});

describe('HomePage', () => {
  it('рендерит заголовок и кнопку', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(screen.getByText('Здоровая еда доступна каждому!'))
      .toBeInTheDocument();
    expect(screen.getByRole('button', { name: /заказать сейчас/i }))
      .toBeInTheDocument();
    expect(screen.getByText('Mocked Catalog')).toBeInTheDocument();
  });
}); 

