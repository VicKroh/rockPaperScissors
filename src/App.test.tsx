import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

const rockLookupGameStates: { [key: string]: string } = {
  'scissors.png': 'You Win!',
  'paper.png': 'You Lose :(',
  'rock.png': 'Draw, try again!',
}

test('it should render the App', () => {
  render(<App />);
  const headerElement = screen.getByText(/Rock Paper Scissors/i);
  expect(headerElement).toBeInTheDocument();
});

test('it should display white logos at the start', () => {
  render(<App />);
  const whiteLogos = screen.getAllByAltText(/logo-white/i);
  expect(whiteLogos.length).toBe(2);
});

test('it should display a rock play-option button', () => {
  render(<App />);
  const buttonElement = screen.getByText('Rock', {exact: true});
  expect(buttonElement).toBeInTheDocument();
});

test('it should display the rock logo if the rock button is clicked', async () => {
  const { container } = render(<App />);

  fireEvent.click(screen.getByText('Rock', {exact: true}));

  await waitFor(() => {
    const playerChoiceLogo = container.getElementsByClassName('player1Choice')[0];
    expect(playerChoiceLogo.getAttribute('src')).toBe('rock.png');
  })
});

test('it should display the scissors logo if the scissors button is clicked', async () => {
  const { container } = render(<App />);

  fireEvent.click(screen.getByText('Scissors', {exact: true}));

  await waitFor(() => {
    const playerChoiceLogo = container.getElementsByClassName('player1Choice')[0];
    expect(playerChoiceLogo.getAttribute('src')).toBe('scissors.png');
  })
});

test('it should display the paper logo if the paper button is clicked', async () => {
  const { container } = render(<App />);

  fireEvent.click(screen.getByText('Paper', {exact: true}));

  await waitFor(() => {
    const playerChoiceLogo = container.getElementsByClassName('player1Choice')[0];
    expect(playerChoiceLogo.getAttribute('src')).toBe('paper.png');
  })
});

test('it should display the correct game state', async () => {
  const { container } = render(<App />);

  const buttonElement = screen.getByText('Rock', {exact: true});
  fireEvent.click(buttonElement);

  await waitFor(() => {
    const computerChoice = container.getElementsByClassName('player2Choice')[0].getAttribute('src') ?? '';
    expect(computerChoice).not.toBe('');

    const gameState = container.getElementsByClassName('gameState')[0].innerHTML;
    expect(gameState).toBe(rockLookupGameStates[computerChoice]);
  })
});

test('it should reset the game state', async () => {
  const { container } = render(<App />);

  const buttonElement = screen.getByText('Rock', {exact: true});
  fireEvent.click(buttonElement);

  await waitFor(() => {
    const resetButtonElement = screen.getByText('Reset Game', {exact: true});
    fireEvent.click(resetButtonElement);

    const whiteLogos = screen.getAllByAltText(/logo-white/i);
    expect(whiteLogos.length).toBe(2);

    const gameState = container.getElementsByClassName('gameState')[0].innerHTML;
    expect(gameState).toBe('');
  })
});