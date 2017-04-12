import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import Root from './Root';
import cookUpApp from './reducers/cookUpApp';

let store = createStore(cookUpApp);

render(
    <Root store={store}/>,
    document.getElementById('react-root')
);

// for debugging
console.log(store.getState());
store.subscribe(() =>
    console.log(store.getState())
);
