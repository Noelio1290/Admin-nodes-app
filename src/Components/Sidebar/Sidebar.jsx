// Components/Sidebar/Sidebar.js
import React from 'react';
import { Box, Typography, Button, Divider, TextField, Slider } from '@mui/material';

const nodeTypes = ['default', 'input', 'output'];
const edgeTypes = [
  { key: 'default', label: 'Default' },
  { key: 'straight', label: 'Recta' },
  { key: 'arrow', label: 'Flecha' },
  { key: 'step', label: 'Step' },
  { key: 'smoothstep', label: 'Smoothstep' },
  { key: 'bezier', label: 'Animado' },
];
// Paleta de colores vivos y agradables, incluye los de handles
const edgeColors = [
  '#6ec6ff', // azul claro (source)
  '#a5d6a7', // verde claro (target)
  '#ffb74d', // naranja suave
  '#ffd54f', // amarillo suave
  '#ff8a65', // coral
  '#ba68c8', // violeta
  '#f06292', // rosa
  '#4dd0e1', // turquesa
  '#81c784', // verde vivo
  '#fff176', // amarillo vivo
  '#90caf9', // azul pastel
  '#ff5252', // rojo vivo
  '#ffd180', // durazno
  '#b2ff59', // verde lima
  '#69f0ae', // verde menta
];

const Sidebar = ({ 
  selectedEdgeType, 
  onEdgeTypeChange,
  selectedEdgeColor,
  onEdgeColorChange,
  onExport,
  onImport,
  setSearchQuery,
  edgeWidth,
  setEdgeWidth,
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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '85%' }}>
        {edgeTypes.map((type) => (
          <Button 
            key={type.key} 
            variant={selectedEdgeType === type.key ? 'contained' : 'outlined'}
            onClick={() => onEdgeTypeChange(type.key)}
            sx={{ textTransform: 'none', fontSize: '0.85rem', py: 0.5, minHeight: 28 }}
          >
            {type.label}
          </Button>
        ))}
      </Box>
      {/* Grosor de conexión debajo del selector de tipo */}
      <Box sx={{ width: '85%', mt: 1, mb: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Grosor de conexión</Typography>
        <Slider
          min={1}
          max={10}
          step={1}
          value={edgeWidth}
          onChange={(_, v) => setEdgeWidth(v)}
          valueLabelDisplay="auto"
        />
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