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

// Un ID único para los nodos que se arrastran y sueltan
let nodeId = 0;
const getNextNodeId = () => `dndnode_${nodeId++}`;

const AppContainer = () => {
  // El estado de los nodos y conexiones ahora vive aquí
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  // NUEVO: Estado para saber qué tipo de conexión está seleccionada
  const [selectedEdgeType, setSelectedEdgeType] = useState('default');

  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition, getNodes } = useReactFlow();

  // La lógica para conectar nodos ahora usa el tipo de conexión seleccionado
  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        type: selectedEdgeType, // Usa el tipo de conexión del estado
        label: `Edge: ${selectedEdgeType}`,
        animated: selectedEdgeType === 'bezier',
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges, selectedEdgeType] // Depende del tipo de conexión seleccionado
  );

  // La lógica para conectar múltiples nodos también usa el tipo de conexión
  const onNodeClick = useCallback((event, targetNode) => {
    const allNodes = getNodes();
    const sourceNodes = allNodes.filter(
      (node) => node.selected && node.id !== targetNode.id
    );

    if (sourceNodes.length === 0) {
      return;
    }

    const newEdges = sourceNodes.map((sourceNode) => ({
      id: `edge-${sourceNode.id}-${targetNode.id}`,
      source: sourceNode.id,
      target: targetNode.id,
      type: selectedEdgeType, // Usa el tipo de conexión del estado
      label: `Edge: ${selectedEdgeType}`,
      animated: selectedEdgeType === 'bezier',
    }));

    setEdges((currentEdges) => addEdge(newEdges, currentEdges));
  }, [getNodes, setEdges, selectedEdgeType]);


  // La lógica para eliminar un nodo (necesaria para el CustomNode)
  const onDeleteNode = useCallback((nodeIdToDelete) => {
    setNodes((currentNodes) => currentNodes.filter((node) => node.id !== nodeIdToDelete));
  }, [setNodes]);

  // La lógica para soltar un nuevo nodo en el lienzo
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
        type: 'custom', // Usamos tu CustomNode
        position,
        data: { 
          label: `Nodo ${type}`, 
          onDelete: onDeleteNode, // Pasamos la función de borrado
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes, onDeleteNode]
  );

  return (
    <Box sx={{ display: 'flex', flexFlow: 'row', height: '100vh', fontFamily: 'sans-serif' }}>
      <Sidebar 
        selectedEdgeType={selectedEdgeType}
        onEdgeTypeChange={setSelectedEdgeType}
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

// Envolvemos todo en el Provider para que useReactFlow funcione
const App = () => (
  <ReactFlowProvider>
    <AppContainer />
  </ReactFlowProvider>
);

export default App;