import { useState, useEffect } from 'react';
import './App.css';
import BpmnModeler from './components/BpmnModeler';
import workflowMetadata from './data/workflowMetadata';
import { convertWorkflowToBpmn } from './utils/workflowToBpmn';

function App() {
  const [bpmnXml, setBpmnXml] = useState('');
  const [error, setError] = useState(null);
  const [debugMode, setDebugMode] = useState(false); // Start with debug mode off
  
  useEffect(() => {
    try {
      // Convert workflow metadata to BPMN XML when component mounts
      console.log('Converting workflow to BPMN...');
      const xml = convertWorkflowToBpmn(workflowMetadata);
      console.log('Generated BPMN XML, length:', xml.length);
      setBpmnXml(xml);
    } catch (err) {
      console.error('Error converting workflow to BPMN:', err);
      setError(`Error converting workflow: ${err.message}`);
    }
  }, []);
  
  const handleDownload = () => {
    if (!bpmnXml) return;
    
    const blob = new Blob([bpmnXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `workflow-diagram.bpmn`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const toggleDebugMode = () => {
    setDebugMode(!debugMode);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Workflow to BPMN Converter</h1>
        <div className="actions">
          <button onClick={handleDownload} disabled={!bpmnXml}>Download BPMN</button>
          <button 
            onClick={toggleDebugMode} 
            style={{ 
              marginLeft: '10px', 
              backgroundColor: debugMode ? '#4caf50' : '#757575',
              color: 'white'
            }}
          >
            {debugMode ? 'Hide Debug' : 'Show Debug'}
          </button>
        </div>
      </header>
      
      <main className="main" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: 'calc(100vh - 70px)',
        width: '100%',
        maxWidth: '100%',
        padding: '0',
        backgroundColor: '#f5f5f5'
      }}>
        {error ? (
          <div className="error">{error}</div>
        ) : (
          <>
            <div className="diagram-container" style={{ 
              flex: 1,
              position: 'relative', 
              minHeight: debugMode ? '60%' : '100%',
              width: '100%',
              border: '1px solid #ccc', 
              borderRadius: '0',
              overflow: 'hidden',
              backgroundColor: '#f5f5f5'
            }}>
              <BpmnModeler 
                xml={bpmnXml} 
                onXmlChange={(newXml) => setBpmnXml(newXml)}
              />
            </div>
            
            {debugMode && bpmnXml && (
              <div className="debug-panel" style={{ 
                height: '40%',
                width: '100%',
                padding: '10px', 
                backgroundColor: '#f5f5f5',
                border: '1px solid #ddd',
                borderRadius: '0',
                marginTop: '0',
                overflow: 'auto'
              }}>
                <h3>BPMN XML</h3>
                <pre style={{ 
                  overflow: 'auto',
                  backgroundColor: '#282c34',
                  color: '#f8f8f2',
                  padding: '10px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  height: 'calc(100% - 50px)',
                  margin: 0
                }}>{bpmnXml}</pre>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
