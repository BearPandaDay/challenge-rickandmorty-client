import { BrowserRouter } from 'react-router-dom';
import { ManagerRouter } from './router'
import { AuthProvider } from './contexts';

import './App.scss';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <ManagerRouter />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
