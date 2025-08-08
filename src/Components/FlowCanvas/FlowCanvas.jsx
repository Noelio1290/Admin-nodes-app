// Components/FlowCanvas/FlowCanvas.js
import React, { useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
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
}) => {

  // La lógica de onDragOver puede quedarse aquí, es simple
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} style={{ flexGrow: 1, height: '100%', position: 'relative' }}>
      <Box sx={{ position: 'absolute', top: 10, right: 10, zIndex: 10, background: 'rgba(255, 255, 255, 0.8)', padding: '8px', borderRadius: '4px' }}>
        <Typography variant="caption">
          <b>Tip:</b> Selecciona un tipo de conexión, luego une dos nodos.
        </Typography>
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
        nodeTypes={nodeTypes}
        fitView
      >
        <Background variant='lines' color='#ccc' gap={12} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;