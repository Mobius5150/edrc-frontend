import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import Routes from './Routes';

ReactDOM.render(
	<Routes/>,
	document.getElementById('root')
);
registerServiceWorker();
