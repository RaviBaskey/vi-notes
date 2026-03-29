import { WritingEditor } from './components/Editor/WritingEditor';
import './App.css';

function App() {
  return (
    <div className="app-layout">
      {/* Top Navigation / Brand Area */}
      <header className="app-header animate-fade-in">
        <div className="brand">
          <h1>Vi-Notes</h1>
          <span className="subtitle">Platform</span>
        </div>
        <div className="status-indicator">
          
        </div>
      </header>

      {/* Main Workspace */}
      <main className="app-main">
        <WritingEditor />
      </main>
    </div>
  );
}

export default App;
