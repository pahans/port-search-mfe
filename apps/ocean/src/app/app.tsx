import { QueryProvider } from '@comparativo/common-ui';
import styled from 'styled-components';
import Compare from './Compare';
import {
  BrowserRouter,
  Route,
  Routes,
  useInRouterContext,
} from 'react-router-dom';

const StyledApp = styled.div``;

export function App() {
  const router = useInRouterContext();
  if (router) {
    return (
      <QueryProvider>
        <StyledApp>
          <Compare />
        </StyledApp>
      </QueryProvider>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <QueryProvider>
                <StyledApp>
                  <Compare />
                </StyledApp>
              </QueryProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
