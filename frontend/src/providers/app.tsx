import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../store';

interface AppProviderProps {}

const AppProvider: React.FC<PropsWithChildren<AppProviderProps>> = ({
  children,
}) => {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};

export default AppProvider;
