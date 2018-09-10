import { fireEvent, waitForElement } from 'react-testing-library';
import Home from '../components/Home';
import { renderApp } from './utils';

describe('Testing App', () => {
  it('Renders greeting after the click on a button (Home route)', async () => {
    expect.assertions(2);
    const { getByText, getByLabelText, getByTestId } = await renderApp({
      Component: Home,
      componentLoaderName: 'loadHomeComponent'
    });
    expect(getByText('Home page')).toBeInTheDOM();
    getByLabelText('User Name').value = 'Idan';
    fireEvent(
      getByText('Greet with the name'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );
    await waitForElement(() => getByTestId('greeting'));
    expect(getByTestId('greeting').innerHTML).toEqual('Greetings to Idan!');
  });
});
