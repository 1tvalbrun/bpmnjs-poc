import React, { useEffect, useRef } from 'react';
import { PropertiesPanel as BpmnPropertiesPanel } from 'bpmn-js-properties-panel';
import CamundaPropertiesProvider from 'bpmn-js-properties-panel/lib/provider/camunda';

// Import the properties panel CSS
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';

const PropertiesPanel = ({ modeler }) => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current || !modeler) return;
    
    const propertiesPanel = new BpmnPropertiesPanel({
      container: containerRef.current,
      provider: [CamundaPropertiesProvider]
    });
    
    modeler.attachPropertiesPanel(propertiesPanel);
    
    return () => {
      modeler.detachPropertiesPanel();
    };
  }, [modeler]);
  
  return (
    <div 
      ref={containerRef} 
      className="properties-panel-container"
      style={{ width: '300px', height: '600px', overflow: 'auto', border: '1px solid #ccc' }}
    ></div>
  );
};

export default PropertiesPanel;
