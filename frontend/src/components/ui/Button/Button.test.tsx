import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('рендерит кнопку с правильным текстом', () => {
    render(<Button type="main">Тестовая кнопка</Button>);
    expect(screen.getByText('Тестовая кнопка'))
      .toBeInTheDocument();
  });

  it('вызывает onClick при клике', () => {
    const handleClick = jest.fn();
    render(
      <Button type="strokeLight" onclick={handleClick}>
        Кликни меня
      </Button>
    );
    
    fireEvent.click(screen.getByText('Кликни меня'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('отображает кнопку как disabled', () => {
    render(
      <Button type="grey" disabled>
        Неактивная кнопка
      </Button>
    );
    
    const button = screen.getByText('Неактивная кнопка');
    expect(button).toBeDisabled();
  });

  it('применяет дополнительные классы', () => {
    render(
      <Button type="strokeDark" classname="custom-class">
        Кнопка с классом
      </Button>
    );
    
    const button = screen.getByText('Кнопка с классом');
    expect(button.className).toContain('custom-class');
  });
}); 