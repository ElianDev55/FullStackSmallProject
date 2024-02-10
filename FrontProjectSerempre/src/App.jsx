// App.js
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Perfil } from './Pages/Perfil';
import { TokenContext } from './Context/TokenContext';
import { Login } from './Pages/Login';
import { UsersProvider } from './Context/UserContext';
import ProtectedRoute from './ProtectedRoute'; // Asegúrate de importar ProtectedRoute

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <UsersProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/another-view" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
          </Routes>
        </Router>
      </UsersProvider>
    </TokenContext.Provider>
  );
};

export default App;