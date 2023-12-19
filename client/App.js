import Navigation from './Navigation';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import axios from 'axios';

axios.defaults.baseURL ='http://192.168.137.1:3011'
export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

