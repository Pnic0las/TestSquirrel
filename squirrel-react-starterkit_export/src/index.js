import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import Loader from './Components/Loader';
import reportWebVitals from './reportWebVitals';
import './assets/scss/main.scss'

// import { ProvideAuth } from './Hook/useAuth';

const App = lazy(() => import('./App'));

const g = "color:#00000;font-weight:bold;font-size:18px;";
const hello = `%c 👋 Hello, \n\n ✔️ Consulting. \n ✔️ Design. \n ✔️ Développement. \n 🤙 https://www.squirrel.fr`;
console.info(hello, g);

ReactDOM.render(
  <Suspense fallback={<Loader />}>
    {/* <ProvideAuth> */}
      <RecoilRoot>
        <App />
      </RecoilRoot>
    {/* </ProvideAuth> */}
  </Suspense>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
