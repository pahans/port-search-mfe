import * as React from 'react';
import NxWelcome from './nx-welcome';
import { Link, Route, Routes } from 'react-router-dom';

const Ocean = React.lazy(() => import('ocean/Module'));

const Air = React.lazy(() => import('air/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/ocean">Ocean</Link>
        </li>
        <li>
          <Link to="/air">Air</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NxWelcome title="shell" />} />
        <Route path="/ocean" element={<Ocean />} />
        <Route path="/air" element={<Air />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
