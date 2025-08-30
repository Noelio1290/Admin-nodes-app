// Components/FlowCanvas/FlowCanvas.js
import React, { useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from '../CustomNode/CustomNode'; // Asumo que tienes este archivo
import { Box, Typography } from '@mui/material';

// Definimos los nodeTypes fuera para que no se recalculen
const nodeTypes = {
  custom: CustomNode,
};

const FlowCanvas = ({
  reactFlowWrapper,
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  onDrop,
  onEdgeClick,
}) => {

  // La lógica de onDragOver puede quedarse aquí, es simple
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} style={{ flexGrow: 1, height: '100%', position: 'relative' }}>
      <Box sx={{ position: 'absolute', top: 10, right: 10, zIndex: 10, background: 'rgba(255, 255, 255, 0.9)', padding: '10px 16px', borderRadius: '8px', boxShadow: 2, minWidth: 180 }}>
        <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
          <b>Tip:</b> Selecciona un tipo de conexión, luego une dos nodos.
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Box sx={{ width: 16, height: 16, borderRadius: '50%', background: '#6ec6ff', border: '2px solid #fff', mr: 1 }} />
          <Typography variant="caption">Salida (source)</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 16, height: 16, borderRadius: '50%', background: '#a5d6a7', border: '2px solid #fff', mr: 1 }} />
          <Typography variant="caption">Entrada (target)</Typography>
        </Box>
      </Box>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap 
          nodeColor="#1976d2" 
          nodeStrokeWidth={2}
          maskColor="rgba(0,0,0,0.1)"
          pannable="true"
          zoomable="true"
          style={{ width: 120, height: 80 }}
        />
        <Background variant='lines' color='#ccc' gap={12} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;