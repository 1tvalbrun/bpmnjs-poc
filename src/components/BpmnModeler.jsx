import React, { useEffect, useRef, useState } from 'react';
import BpmnJS from 'bpmn-js/lib/Modeler';

// Import CSS files
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';

// Import BPMN moddle extension
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';

const BpmnModeler = ({ xml, onXmlChange }) => {
  const containerRef = useRef(null);
  const modelerRef = useRef(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Custom CSS to inject for context pads and popups
  const customCSS = `
    .djs-context-pad {
      background-color: #f0f0f0 !important;
      border: 1px solid #ccc !important;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
    }
    .djs-context-pad .entry {
      background-color: #ffffff !important;
      border: 1px solid #ddd !important;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) !important;
    }
    .djs-popup {
      background-color: #f0f0f0 !important;
      border: 1px solid #ccc !important;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
    }
    .bjs-container {
      width: 100% !important;
    }
    .djs-container {
      width: 100% !important;
    }
  `;

  // Add the custom CSS to the document
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = customCSS;
    document.head.appendChild(style);
    
    return () => document.head.removeChild(style);
  }, []);

  // Initialize modeler once
  useEffect(() => {
    if (!containerRef.current) return;

    console.log("Initializing BPMN Modeler");
    
    const modeler = new BpmnJS({
      container: containerRef.current,
      keyboard: { bindTo: document },
      moddleExtensions: {
        camunda: camundaModdleDescriptor
      },
      width: '100%',
      height: '100%'
    });

    modelerRef.current = modeler;

    // Listen for changes
    modeler.on('commandStack.changed', async () => {
      try {
        const { xml } = await modeler.saveXML({ format: true });
        if (onXmlChange) {
          onXmlChange(xml);
        }
      } catch (err) {
        console.error('Error saving BPMN XML:', err);
      }
    });

    // Set the canvas background color
    setTimeout(() => {
      try {
        const canvas = modeler.get('canvas');
        canvas.setColor('CANVAS', '#f5f5f5');
      } catch (err) {
        console.error('Error setting canvas color:', err);
      }
    }, 200);

    return () => {
      console.log("Destroying modeler");
      modeler.destroy();
    };
  }, []);

  // Import XML when it changes
  useEffect(() => {
    if (!xml || !modelerRef.current) return;

    setIsLoading(true);
    setError(null);
    
    console.log("Importing BPMN XML, length:", xml.length);
    
    // Small delay to ensure modeler is ready
    setTimeout(() => {
      modelerRef.current.importXML(xml)
        .then(({ warnings }) => {
          if (warnings.length) {
            console.warn('Warnings during BPMN import:', warnings);
          }
          modelerRef.current.get('canvas').zoom('fit-viewport');
          setIsLoading(false);
          console.log("BPMN imported successfully");
        })
        .catch(err => {
          console.error('Error importing BPMN XML:', err);
          setError(`Error importing diagram: ${err.message}`);
          setIsLoading(false);
        });
    }, 100);
  }, [xml]);

  // Add window resize handler to make sure the canvas fits properly
  useEffect(() => {
    const handleResize = () => {
      if (modelerRef.current) {
        modelerRef.current.get('canvas').zoom('fit-viewport');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bpmn-modeler-container" style={{ 
      position: 'relative', 
      height: '100%', 
      width: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {error && (
        <div className="error-banner" style={{ 
          backgroundColor: '#ffebee', 
          color: '#d32f2f',
          padding: '10px',
          marginBottom: '10px',
          borderRadius: '4px',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000
        }}>
          {error}
        </div>
      )}
      
      {isLoading && (
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          background: 'rgba(255,255,255,0.7)',
          padding: '10px',
          borderRadius: '4px'
        }}>
          Loading diagram...
        </div>
      )}
      
      <div 
        ref={containerRef} 
        className="canvas" 
        style={{ 
          width: '100%', 
          height: '100%', 
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: '#f5f5f5',
          overflow: 'hidden'
        }}
      ></div>
    </div>
  );
};

export default BpmnModeler;
