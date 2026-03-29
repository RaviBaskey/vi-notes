import { Routes, Route, Navigate } from 'react-router-dom';
import { WritingEditor } from './components/Editor/WritingEditor';
import { AuthPage } from './pages/AuthPage';
import { useAuth } from './context/AuthContext';
import './App.css';

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  const { user, logout } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <div className="app-layout">
              {/* Top Navigation / Brand Area */}
              <header className="app-header animate-fade-in">
                <div className="brand">
                  <h1>Vi-Notes</h1>
                  <span className="subtitle">Platform</span>
                </div>
                <div className="status-indicator">
                  <span className="status-text">{user?.email}</span>
                  <button onClick={logout} className="logout-btn">
                    Logout
                  </button>
                </div>
              </header>

              {/* Main Workspace */}
              <main className="app-main">
                <WritingEditor />
              </main>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
