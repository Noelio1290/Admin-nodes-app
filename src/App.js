// App.js
import React, { useState, useCallback, useRef } from 'react';
import {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
} from '@xyflow/react';
import { Box } from '@mui/material';
import Sidebar from './Components/Sidebar/Sidebar';
import FlowCanvas from './Components/FlowCanvas/FlowCanvas';

let nodeId = 0;
const getNextNodeId = () => `dndnode_${nodeId++}`;

const AppContainer = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedEdgeType, setSelectedEdgeType] = useState('default');
  const [selectedEdgeColor, setSelectedEdgeColor] = useState('#222222'); // Color inicial

  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition, getNodes } = useReactFlow();

  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        type: selectedEdgeType,
        animated: selectedEdgeType === 'bezier',
        style: { stroke: selectedEdgeColor, strokeWidth: 2 }, // Aplica el color
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges, selectedEdgeType, selectedEdgeColor]
  );

  const onNodeClick = useCallback((event, targetNode) => {
    const allNodes = getNodes();
    const sourceNodes = allNodes.filter(
      (node) => node.selected && node.id !== targetNode.id
    );

    if (sourceNodes.length === 0) return;

    const newEdges = sourceNodes.map((sourceNode) => ({
      id: `edge-${sourceNode.id}-${targetNode.id}`,
      source: sourceNode.id,
      target: targetNode.id,
      type: selectedEdgeType,
      animated: selectedEdgeType === 'bezier',
      style: { stroke: selectedEdgeColor, strokeWidth: 2 }, // Aplica el color
    }));

    setEdges((currentEdges) => addEdge(newEdges, currentEdges));
  }, [getNodes, setEdges, selectedEdgeType, selectedEdgeColor]);

  const onNodeDataChange = useCallback((nodeId, newData) => {
    setNodes((currentNodes) =>
      currentNodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, ...newData } };
        }
        return node;
      })
    );
  }, [setNodes]);

  const onDeleteNode = useCallback((nodeIdToDelete) => {
    setNodes((currentNodes) => currentNodes.filter((node) => node.id !== nodeIdToDelete));
  }, [setNodes]);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      
      const newNode = {
        id: getNextNodeId(),
        type: 'custom',
        position,
        data: { 
          nodeType: type,
          label: `Nodo ${type}`, 
          value: '',
          onDelete: onDeleteNode,
          onChange: onNodeDataChange,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes, onDeleteNode, onNodeDataChange]
  );

  return (
    <Box sx={{ display: 'flex', flexFlow: 'row', height: '100vh', fontFamily: 'sans-serif' }}>
      <Sidebar 
        selectedEdgeType={selectedEdgeType}
        onEdgeTypeChange={setSelectedEdgeType}
        selectedEdgeColor={selectedEdgeColor}
        onEdgeColorChange={setSelectedEdgeColor}
      />
      <FlowCanvas
        reactFlowWrapper={reactFlowWrapper}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onDrop={onDrop}
      />
    </Box>
  );
};

const App = () => (
  <ReactFlowProvider>
    <AppContainer />
  </ReactFlowProvider>
);

export default App;