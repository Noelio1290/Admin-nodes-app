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
        borderRight: "1px solid #e0e0e0",
        flexDirection: "column",
        alignItems: "center",
        padding: "8px 16px 8px 16px",
        width: "270px",
        minWidth: "230px",
        maxWidth: "280px",
        backgroundColor: '#f7f7f7',
        height: '100vh',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* SECCIÓN: Exportar/Importar */}
      <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 1, color: '#888', mb: 0.5 }}>Archivo</Typography>
  <Box sx={{ width: '100%', display: 'flex', gap: 0.5, mb: 1 }}>
        <Button variant="outlined" fullWidth onClick={onExport}>Exportar</Button>
        <Button variant="outlined" component="label" fullWidth>
          Importar
          <input type="file" accept="application/json" hidden onChange={handleImport} />
        </Button>
      </Box>
      <Divider sx={{ width: '100%', my: 1 }} />

      {/* SECCIÓN: Búsqueda */}
      <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 1, color: '#888', mb: 0.5 }}>Buscar</Typography>
      <TextField
        size="small"
        placeholder="Buscar nodo..."
        fullWidth
        sx={{ mb: 1, width: '100%' }}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <Divider sx={{ width: '100%', my: 1 }} />

      {/* SECCIÓN: Nodos */}
      <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 1, color: '#888', mb: 0.5 }}>Nodos</Typography>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
        Arrastrar Nodos
      </Typography>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 0.5, mb: 1 }}>
        {nodeTypes.map((type) => (
          <Button
            key={type}
            sx={{
              width: '100%',
              textTransform: 'none',
              fontSize: '0.8rem',
              py: 0.3,
              minHeight: 24,
            }}
            variant='contained'
            onDragStart={(e) => onDragStart(e, type)}
            draggable
          >
            Nodo {type}
          </Button>
        ))}
      </Box>
      <Divider sx={{ width: '100%', my: 1 }} />

      {/* SECCIÓN: Conexiones */}
      <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 1, color: '#888', mb: 0.5 }}>Conexiones</Typography>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
        Tipo de Conexión
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, width: '100%', mb: 1 }}>
        {edgeTypes.map((type) => (
          <Button 
            key={type.key} 
            variant={selectedEdgeType === type.key ? 'contained' : 'outlined'}
            onClick={() => onEdgeTypeChange(type.key)}
            sx={{ textTransform: 'none', fontSize: '0.8rem', py: 0.3, minHeight: 24 }}
          >
            {type.label}
          </Button>
        ))}
      </Box>
  <Box sx={{ width: '100%', mb: 1, px: 4 }}>
        <Typography variant="subtitle2" sx={{ mb: 0.5, fontSize: '0.8rem' }}>Grosor de conexión</Typography>
        <Slider
          min={1}
          max={10}
          step={1}
          value={edgeWidth}
          onChange={(_, v) => setEdgeWidth(v)}
          valueLabelDisplay="auto"
          size="small"
        />
      </Box>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Color de Conexión
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '5px', flexWrap: 'wrap', width: '100%' }}>
        {edgeColors.map((color) => (
          <Box
            key={color}
            onClick={() => onEdgeColorChange(color)}
            sx={{
              width: 18,
              height: 18,
              backgroundColor: color,
              borderRadius: '50%',
              cursor: 'pointer',
              border: selectedEdgeColor === color ? '2px solid #007bff' : '1px solid #ddd',
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