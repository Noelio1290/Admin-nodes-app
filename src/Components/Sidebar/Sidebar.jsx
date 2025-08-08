// Components/Sidebar/Sidebar.js
import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';

const nodeTypes = ['default', 'input', 'output'];
const edgeTypes = ['default', 'straight', 'step', 'smoothstep', 'bezier'];
const edgeColors = [
  '#222222', '#e63946', '#f4a261', '#e76f51', '#2a9d8f', 
  '#264653', '#8338ec', '#ff006e', '#06d6a0', '#ffbe0b'
];

const Sidebar = ({ 
  selectedEdgeType, 
  onEdgeTypeChange,
  selectedEdgeColor,
  onEdgeColorChange,
}) => {
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
      {/* SECCIÓN 1: Arrastrar Nodos */}
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Arrastrar Nodos
      </Typography>
      {nodeTypes.map((type) => (
        <Box
          key={type}
          onDragStart={(e) => onDragStart(e, type)}
          draggable
          /* ...estilos... */
        >
          Nodo {type}
        </Box>
      ))}

      <Divider sx={{ width: '100%', marginY: 2 }} />

      {/* SECCIÓN 2: Tipo de Conexión */}
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Tipo de Conexión
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '85%' }}>
        {edgeTypes.map((type) => (
          <Button 
            key={type} 
            variant={selectedEdgeType === type ? 'contained' : 'outlined'}
            onClick={() => onEdgeTypeChange(type)}
            sx={{ textTransform: 'none' }}
          >
            {type}
          </Button>
        ))}
      </Box>

      <Divider sx={{ width: '100%', marginY: 2 }} />

      {/* SECCIÓN 3: Color de Conexión */}
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Color de Conexión
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', width: '85%' }}>
        {edgeColors.map((color) => (
          <Box
            key={color}
            onClick={() => onEdgeColorChange(color)}
            sx={{
              width: 30,
              height: 30,
              backgroundColor: color,
              borderRadius: '50%',
              cursor: 'pointer',
              border: selectedEdgeColor === color ? '3px solid #007bff' : '1px solid #ddd',
              boxSizing: 'border-box',
              transition: 'border 0.2s',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;