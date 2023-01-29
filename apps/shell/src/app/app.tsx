import * as React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import ErrorBoundary from './error-boundary';
import './reset.css';

const Ocean = React.lazy(() => import('ocean/Module'));

const Air = React.lazy(() => import('air/Module'));

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  &a {
    text-decoration: none;
  }
`;

const Li = styled.li`
  padding: 0.5rem;
`;

const Navigation = styled.nav`
  background-color: #e2e2e2;
`;

const Heading = styled.h1`
  padding: 1rem;
  font-family: sans-serif;
`;

const BodyContainer = styled.div`
  padding: 1rem;
`;
export function App() {
  return (
    <React.Suspense fallback={null}>
      <Navigation>
        <Ul>
          <Li>
            <Link to="/">Home</Link>
          </Li>
          <Li>
            <Link to="/ocean">/Ocean</Link>
          </Li>
          <Li>
            <Link to="/air">/Air</Link>
          </Li>
        </Ul>
      </Navigation>
      <BodyContainer>
        <Routes>
          <Route
            path="/"
            element={<Heading>Welcome, please select an app to begin</Heading>}
          />
          <Route
            path="/ocean"
            element={
              <ErrorBoundary componentName="Ocean">
                <Ocean />
              </ErrorBoundary>
            }
          />
          <Route
            path="/air"
            element={
              <ErrorBoundary componentName="Air">
                <Air />
              </ErrorBoundary>
            }
          />
        </Routes>
      </BodyContainer>
    </React.Suspense>
  );
}

export default App;
