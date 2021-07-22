import { BrowserRouter } from 'react-router-dom';

import FileManager from './container/fileManager/fileManager';
import "./components/FontawsomeIcons"

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div style={{textAlign: 'center'}}>
          <h1>
            React File Maanger
          </h1>
        </div>
        <FileManager />
      </div>
    </BrowserRouter>
    
  );
}

export default App;
