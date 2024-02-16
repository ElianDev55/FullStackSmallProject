// App.js
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Perfil } from './Pages/Perfil';
import { TokenContext } from './Context/TokenContext';
import { Login } from './Pages/Login';
import { UsersProvider } from './Context/UserContext';
import ProtectedRoute from './ProtectedRoute'; // Asegúrate de importar ProtectedRoute
import { NavbarCompo } from './Components/Navbar';
import { Home } from './Pages/Home';
import { ReportsProvider } from './Context/ReportContext';

const App = () => {
  const [token, setToken] = useState(null);



  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <ReportsProvider>
      <UsersProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/another-view" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </UsersProvider>
      </ReportsProvider>
    </TokenContext.Provider>
  );
};

export default App;