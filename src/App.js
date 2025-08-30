// App.js
import React, { useState, useCallback, useRef } from 'react';
import EdgePopover from './Components/EdgePopover';
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
  const [selectedEdgeColor, setSelectedEdgeColor] = useState('#222222');
  const [edgeWidth, setEdgeWidth] = useState(2);
  const [searchQuery, setSearchQuery] = useState('');
  const [edgePopover, setEdgePopover] = useState({ open: false, anchorEl: null, edge: null });

  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition, getNodes } = useReactFlow();

  const onConnect = useCallback(
    (params) => {
      let type = selectedEdgeType;
      let animated = false;
      let markerEnd = undefined;
      if (selectedEdgeType === 'arrow') {
        type = 'straight';
        animated = true;
        markerEnd = { type: 'arrowclosed', color: selectedEdgeColor };
      }
      // Para bezier, animar y sin markerEnd
      if (selectedEdgeType === 'bezier') {
        type = 'bezier';
        animated = true;
        markerEnd = undefined;
      }
      const newEdge = {
        ...params,
        type,
        animated,
        style: { stroke: selectedEdgeColor, strokeWidth: edgeWidth },
        markerEnd,
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges, selectedEdgeType, selectedEdgeColor, edgeWidth]
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

  // Exportar
  const exportFlow = () => {
    const dataStr = JSON.stringify({ nodes, edges }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mapa-mental.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Importar
const importFlow = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      let { nodes: n, edges: egs } = JSON.parse(e.target.result);

      // Asegura que todos los nodos tengan las funciones y campos necesarios
      n = n.map(node => ({
        ...node,
        data: {
          ...node.data,
          onDelete: onDeleteNode,
          onChange: onNodeDataChange,
          color: node.data.color || '',
          icon: node.data.icon || '',
          image: node.data.image || '',
          note: node.data.note || '',
        }
      }));
      // Actualiza los estados
      setNodes(n);
      setEdges(egs);
      // Actualiza nodeId para evitar duplicados
      const maxId = n
        .map(node => parseInt(node.id.replace('dndnode_', ''), 10))
        .filter(num => !isNaN(num))
        .reduce((max, curr) => Math.max(max, curr), -1);
      nodeId = maxId + 1;
    } catch (err) {
      alert('Archivo inválido');
    }
  };
  reader.readAsText(file);
};

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
          handleColor: '#1976d2', // color por defecto
          handleSize: 14,         // tamaño por defecto
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes, onDeleteNode, onNodeDataChange]
  );

  // Filtrar nodos por búsqueda
  const filteredNodes = searchQuery
    ? nodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          highlight: (node.data.label && node.data.label.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (node.data.note && node.data.note.toLowerCase().includes(searchQuery.toLowerCase())),
        },
      }))
    : nodes;

  // Handler para click en edge
  const onEdgeClick = useCallback((event, edge) => {
    event.stopPropagation();
    setEdgePopover({ open: true, anchorEl: event.currentTarget, edge });
  }, []);

  // Acciones del popover
  const handleDeleteEdge = () => {
    setEdges((eds) => eds.filter(e => e.id !== edgePopover.edge.id));
    setEdgePopover({ open: false, anchorEl: null, edge: null });
  };
  const handleEdgeColor = (color) => {
    setEdges((eds) => eds.map(e => e.id === edgePopover.edge.id ? { ...e, style: { ...e.style, stroke: color } } : e));
  };
  const handleEdgeType = (type) => {
    setEdges((eds) => eds.map(e => {
      if (e.id !== edgePopover.edge.id) return e;
      // Flecha: type 'animated-arrow'
      if (type === 'arrow') {
        return {
          ...e,
          type: 'animated-arrow',
          animated: true,
          markerEnd: { type: 'arrowclosed', color: e.style?.stroke || '#222222' },
        };
      }
      // Animado: type 'bezier' + animated
      if (type === 'bezier') {
        return {
          ...e,
          type: 'bezier',
          animated: true,
          markerEnd: undefined,
        };
      }
      // Otros tipos
      return {
        ...e,
        type,
        animated: false,
        markerEnd: undefined,
      };
    }));
  };
  const handleEdgeWidth = (width) => {
    setEdges((eds) => eds.map(e => e.id === edgePopover.edge.id ? { ...e, style: { ...e.style, strokeWidth: width } } : e));
  };

  return (
    <Box sx={{ display: 'flex', flexFlow: 'row', height: '100vh', fontFamily: 'sans-serif' }}>
      <Sidebar 
        selectedEdgeType={selectedEdgeType}
        onEdgeTypeChange={setSelectedEdgeType}
        selectedEdgeColor={selectedEdgeColor}
        onEdgeColorChange={setSelectedEdgeColor}
        onExport={exportFlow}
        onImport={importFlow}
        setSearchQuery={setSearchQuery}
        edgeWidth={edgeWidth}
        setEdgeWidth={setEdgeWidth}
      />
      <FlowCanvas
        reactFlowWrapper={reactFlowWrapper}
        nodes={filteredNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onDrop={onDrop}
        onEdgeClick={onEdgeClick}
      />
      <EdgePopover
        open={edgePopover.open}
        anchorEl={edgePopover.anchorEl}
        edge={edgePopover.edge}
        onClose={() => setEdgePopover({ open: false, anchorEl: null, edge: null })}
        onDelete={handleDeleteEdge}
        onColor={handleEdgeColor}
        onType={handleEdgeType}
        onWidth={handleEdgeWidth}
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