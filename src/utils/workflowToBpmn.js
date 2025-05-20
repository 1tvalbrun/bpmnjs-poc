export function convertWorkflowToBpmn(workflowMetadata) {
  // Create very simple BPMN with alphanumeric IDs only
  return `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
                  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
                  xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
                  xmlns:camunda="http://camunda.org/schema/1.0/bpmn"
                  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                  id="Definitions"
                  targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" name="${workflowMetadata.name}" isExecutable="true">
    <bpmn:startEvent id="StartEvent_1" name="Start">
      <bpmn:outgoing>SequenceFlow_1</bpmn:outgoing>
    </bpmn:startEvent>
    
    <bpmn:exclusiveGateway id="Gateway_1" name="${getConditionName(workflowMetadata.metaConditions[0])}">
      <bpmn:incoming>SequenceFlow_1</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_2</bpmn:outgoing>
      <bpmn:outgoing>SequenceFlow_3</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    
    <bpmn:sequenceFlow id="SequenceFlow_1" sourceRef="StartEvent_1" targetRef="Gateway_1" />
    
    <bpmn:sequenceFlow id="SequenceFlow_2" name="Yes" sourceRef="Gateway_1" targetRef="ServiceTask_1">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">\${true}</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    
    <bpmn:sequenceFlow id="SequenceFlow_3" name="No" sourceRef="Gateway_1" targetRef="EndEvent_1">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">\${false}</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    
    <bpmn:serviceTask id="ServiceTask_1" name="${getTaskName(workflowMetadata.metaActions[0])}" camunda:type="external" camunda:topic="sendMail">
      <bpmn:extensionElements>
        <camunda:inputOutput>
          <camunda:inputParameter name="recipient">${getRecipient(workflowMetadata.metaActions[0])}</camunda:inputParameter>
          <camunda:inputParameter name="subject">${getSubject(workflowMetadata.metaActions[0])}</camunda:inputParameter>
        </camunda:inputOutput>
      </bpmn:extensionElements>
      <bpmn:incoming>SequenceFlow_2</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_4</bpmn:outgoing>
    </bpmn:serviceTask>
    
    <bpmn:sequenceFlow id="SequenceFlow_4" sourceRef="ServiceTask_1" targetRef="EndEvent_1" />
    
    <bpmn:endEvent id="EndEvent_1" name="End">
      <bpmn:incoming>SequenceFlow_3</bpmn:incoming>
      <bpmn:incoming>SequenceFlow_4</bpmn:incoming>
    </bpmn:endEvent>
  </bpmn:process>
  
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_1" bpmnElement="StartEvent_1">
        <dc:Bounds x="173" y="102" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="179" y="145" width="24" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      
      <bpmndi:BPMNShape id="_BPMNShape_Gateway_1" bpmnElement="Gateway_1" isMarkerVisible="true">
        <dc:Bounds x="259" y="95" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="240" y="65" width="90" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      
      <bpmndi:BPMNEdge id="BPMNEdge_SequenceFlow_1" bpmnElement="SequenceFlow_1">
        <di:waypoint x="209" y="120" />
        <di:waypoint x="259" y="120" />
      </bpmndi:BPMNEdge>
      
      <bpmndi:BPMNEdge id="BPMNEdge_SequenceFlow_2" bpmnElement="SequenceFlow_2">
        <di:waypoint x="309" y="120" />
        <di:waypoint x="359" y="120" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="326" y="102" width="18" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      
      <bpmndi:BPMNEdge id="BPMNEdge_SequenceFlow_3" bpmnElement="SequenceFlow_3">
        <di:waypoint x="284" y="145" />
        <di:waypoint x="284" y="205" />
        <di:waypoint x="489" y="205" />
        <di:waypoint x="489" y="138" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="381" y="185" width="15" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      
      <bpmndi:BPMNShape id="_BPMNShape_ServiceTask_1" bpmnElement="ServiceTask_1">
        <dc:Bounds x="359" y="80" width="100" height="80" />
      </bpmndi:BPMNShape>
      
      <bpmndi:BPMNEdge id="BPMNEdge_SequenceFlow_4" bpmnElement="SequenceFlow_4">
        <di:waypoint x="459" y="120" />
        <di:waypoint x="471" y="120" />
      </bpmndi:BPMNEdge>
      
      <bpmndi:BPMNShape id="_BPMNShape_EndEvent_1" bpmnElement="EndEvent_1">
        <dc:Bounds x="471" y="102" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="479" y="145" width="20" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;
}

// Helper functions
function getConditionName(condition) {
  if (!condition) return "Default Condition";
  
  if (condition.valuesMap.department) {
    return `Department is ${condition.valuesMap.department.value}`;
  } else if (condition.valuesMap.title) {
    return `Title is ${condition.valuesMap.title.value}`;
  }
  return `Condition`;
}

function getTaskName(action) {
  if (!action) return "Send Email Task";
  
  if (action.valuesMap.subject) {
    return `Send Email: ${action.valuesMap.subject.value.substring(0, 20)}`;
  }
  
  return "Send Email Task";
}

function getRecipient(action) {
  if (!action || !action.valuesMap.sendTo) return "example@example.com";
  return action.valuesMap.sendTo.value;
}

function getSubject(action) {
  if (!action || !action.valuesMap.subject) return "Task Notification";
  return action.valuesMap.subject.value;
}
