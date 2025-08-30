import React, { useState } from 'react';
import { Modal, Box, IconButton, Slider, MenuItem, Select, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PaletteIcon from '@mui/icons-material/Palette';
import LineWeightIcon from '@mui/icons-material/LineWeight';
import TimelineIcon from '@mui/icons-material/Timeline';

const edgeTypes = [
  { key: 'default', label: 'Default' },
  { key: 'straight', label: 'Recta' },
  { key: 'arrow', label: 'Flecha' },
  { key: 'step', label: 'Step' },
  { key: 'smoothstep', label: 'Smoothstep' },
  { key: 'bezier', label: 'Animado' },
];

const edgeColors = [
  '#6ec6ff', '#a5d6a7', '#ffb74d', '#ffd54f', '#ff8a65', '#ba68c8', '#f06292', '#4dd0e1',
  '#81c784', '#fff176', '#90caf9', '#ff5252', '#ffd180', '#b2ff59', '#69f0ae', '#222222'
];

export default function EdgeEditModal({ open, onClose, edge, onDelete, onColor, onType, onWidth }) {
  const [color, setColor] = useState(edge?.style?.stroke || '#222222');
  const [type, setType] = useState(edge?.type || 'default');
  const [width, setWidth] = useState(edge?.style?.strokeWidth || 2);

  // Actualiza local y notifica arriba
  const handleColor = (c) => {
    setColor(c);
    onColor(c);
  };
  const handleType = (t) => {
    setType(t);
    onType(t);
  };
  const handleWidth = (w) => {
    setWidth(w);
    onWidth(w);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 2,
        minWidth: 220,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Tooltip title="Eliminar">
            <IconButton color="error" onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Color">
            <IconButton>
              <PaletteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Tipo">
            <IconButton>
              <TimelineIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Grosor">
            <IconButton>
              <LineWeightIcon />
            </IconButton>
          </Tooltip>
        </Box>
        {/* Color picker */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
          {edgeColors.map((c) => (
            <Box key={c} onClick={() => handleColor(c)} sx={{ width: 22, height: 22, borderRadius: '50%', background: c, border: color === c ? '2px solid #1976d2' : '1px solid #ccc', cursor: 'pointer' }} />
          ))}
        </Box>
        {/* Tipo de conexión */}
        <Select size="small" value={type} onChange={e => handleType(e.target.value)} sx={{ width: '100%' }}>
          {edgeTypes.map((t) => (
            <MenuItem key={t.key} value={t.key}>{t.label}</MenuItem>
          ))}
        </Select>
        {/* Grosor */}
        <Slider min={1} max={10} step={1} value={width} onChange={(_, v) => handleWidth(v)} valueLabelDisplay="auto" sx={{ width: '90%' }} />
      </Box>
    </Modal>
  );
}
