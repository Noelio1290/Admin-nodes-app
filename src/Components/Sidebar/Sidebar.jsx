// Components/Sidebar/Sidebar.js
import React from 'react';
import { Box, Typography, Button, Divider, TextField } from '@mui/material';

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
  onExport,
  onImport,
  setSearchQuery,
}) => {
  // Maneja importación de archivo
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) onImport(file);
  };
  // Maneja inicio de arrastre de nodo 
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Box 
      sx={{ 
        display: "flex",
        borderRight: "1px solid ",
        flexFlow: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px", 
        width: "250px",
        backgroundColor: '#f7f7f7'
      }}
    >
      {/* SECCIÓN: Exportar/Importar */}
      <Box sx={{ width: '85%', display: 'flex', gap: 1, mb: 2 }}>
        <Button variant="outlined" fullWidth onClick={onExport}>Exportar</Button>
        <Button variant="outlined" component="label" fullWidth>
          Importar
          <input type="file" accept="application/json" hidden onChange={handleImport} />
        </Button>
      </Box>
      {/* SECCIÓN: Búsqueda */}
      <TextField
        size="small"
        placeholder="Buscar nodo..."
        fullWidth
        sx={{ mb: 2, width: '85%' }}
        onChange={e => setSearchQuery(e.target.value)}
      />
      {/* SECCIÓN 1: Arrastrar Nodos */}
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Arrastrar Nodos
      </Typography>
      {nodeTypes.map((type) => (
        <Button
          key={type}
          sx={{
            width: '85%',
            textTransform: 'none',
            marginBottom: '10px',
          }}
          variant='contained'
          onDragStart={(e) => onDragStart(e, type)}
          draggable
        >
          Nodo {type}
        </Button>
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