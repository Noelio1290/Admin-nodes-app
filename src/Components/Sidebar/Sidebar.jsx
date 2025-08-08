// Components/Sidebar/Sidebar.js
import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';

const nodeTypes = ['default', 'input', 'output'];
const edgeTypes = ['default', 'straight', 'step', 'smoothstep', 'bezier'];

const Sidebar = ({ selectedEdgeType, onEdgeTypeChange }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Box 
      sx={{ 
        display: "flex",
        borderRight: "1px solid #ddd",
        flexFlow: "column",
        alignItems: "center",
        padding: "16px", 
        width: "250px",
        backgroundColor: '#f7f7f7'
      }}
    >
      {/* SECCIÓN 1: Arrastrar Nodos (Tu funcionalidad original) */}
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Arrastrar Nodos
      </Typography>
      {nodeTypes.map((type) => (
        <Box
          key={type}
          onDragStart={(e) => onDragStart(e, type)}
          draggable
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "40px",
            width: '85%',
            marginBottom: "10px",
            border: '1px solid #1a192b',
            borderRadius: '3px',
            backgroundColor: 'white',
            cursor: 'grab',
            '&:active': { cursor: 'grabbing' },
          }}
        >
          Nodo {type}
        </Box>
      ))}

      <Divider sx={{ width: '100%', marginY: 2 }} />

      {/* SECCIÓN 2: Seleccionar Tipo de Conexión (Nueva funcionalidad) */}
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Tipo de Conexión
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '85%' }}>
        {edgeTypes.map((type) => (
          <Button 
            key={type} 
            // El 'variant' cambia para mostrar cuál está seleccionado
            variant={selectedEdgeType === type ? 'contained' : 'outlined'}
            onClick={() => onEdgeTypeChange(type)}
            sx={{ textTransform: 'none' }}
          >
            {type}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;