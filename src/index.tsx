import * as React from 'react';
import { render } from 'react-snapshot';
import './index.css';

import Routes from './Routes';

render(
	<Routes/>,
	document.getElementById('root')
);
