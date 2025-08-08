import React, { useCallback, useRef, useState } from 'react';
import {
    ReactFlow,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    Background,
    // 1. Importa el hook useReactFlow
    useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from '../CustomNode/CustomNode';
import { Box, Typography } from '@mui/material';

let nodeId = 0;
const getNextNodeId = () => `dndnode_${nodeId++}`;

const nodeTypes = {
  custom: CustomNode,
};

const FlowCanvas = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  
  // 2. Obtén acceso a las funciones de la instancia de React Flow
  const { getNodes } = useReactFlow();

  const onDeleteNode = useCallback((nodeIdToDelete) => {
    setNodes((currentNodes) => currentNodes.filter((node) => node.id !== nodeIdToDelete));
  }, [setNodes]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  
  // 3. Lógica principal para conectar múltiples nodos
  const onNodeClick = useCallback((event, targetNode) => {
    // Obtenemos todos los nodos del canvas
    const allNodes = getNodes();
    
    // Filtramos para encontrar los nodos que están seleccionados,
    // excluyendo al nodo destino que acabamos de clickear.
    const sourceNodes = allNodes.filter(
      (node) => node.selected && node.id !== targetNode.id
    );

    // Si no hay nodos fuente seleccionados, no hacemos nada.
    if (sourceNodes.length === 0) {
      return;
    }

    // Creamos un array de nuevas uniones (edges)
    const newEdges = sourceNodes.map((sourceNode) => ({
      id: `edge-${sourceNode.id}-${targetNode.id}`,
      source: sourceNode.id,
      target: targetNode.id,
      animated: true,
    }));

    // Añadimos las nuevas uniones al estado
    setEdges((currentEdges) => addEdge(newEdges, currentEdges));

  }, [getNodes, setEdges]);


  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type || !reactFlowInstance) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      
      const newNodeId = getNextNodeId();
      const newNode = {
        id: newNodeId,
        type: 'custom',
        position,
        data: { 
          label: `Nodo ${type}`, 
          onDelete: onDeleteNode,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes, onDeleteNode]
  );

  return (
    <div ref={reactFlowWrapper} style={{ flexGrow: 1, height: '100%', position: 'relative' }}>
        {/* 4. Pequeña ayuda visual para el usuario */}
        <Box sx={{ position: 'absolute', top: 10, right: 10, zIndex: 10, background: 'rgba(255, 255, 255, 0.8)', padding: '8px', borderRadius: '4px' }}>
            <Typography variant="caption">
                <b>Tip:</b> Selecciona nodos y haz clic en otro para conectarlos.
            </Typography>
        </Box>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        // 5. Pasamos la nueva función al componente ReactFlow
        onNodeClick={onNodeClick}
        fitView
      >
        <Background variant='lines' color='#12f0d5' gap={12} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;