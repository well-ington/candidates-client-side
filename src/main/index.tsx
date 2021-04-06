import { App } from '@/presentation/components/app/app';
import { Home } from '@/presentation/pages';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from '../data/store/reducer/store';



ReactDOM.render(<Provider store={store}>
<App />
</Provider>, document.getElementById('app'))