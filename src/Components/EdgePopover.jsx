import React, { useState } from 'react';
import { Popover, IconButton, Box, Slider, MenuItem, Select, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PaletteIcon from '@mui/icons-material/Palette';
import LineWeightIcon from '@mui/icons-material/LineWeight';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const edgeTypes = [
  { key: 'default', label: 'Default' },
  { key: 'straight', label: 'Recta' },
  { key: 'arrow', label: 'Flecha' },
  { key: 'step', label: 'Step' },
  { key: 'smoothstep', label: 'Smoothstep' },
  { key: 'bezier', label: 'Animado' },
];

const edgeColors = [
  '#6ec6ff', '#a5d6a7', '#ffb74d', '#ffd54f', '#ff8a65', '#ba68c8', '#f06292', '#4dd0e1', '#81c784', '#fff176', '#90caf9', '#ff5252', '#ffd180', '#b2ff59', '#69f0ae', '#222222'
];


export default function EdgePopover({ anchorEl, open, onClose, edge, onDelete, onColor, onType, onWidth }) {
  const [color, setColor] = useState(edge?.style?.stroke || '#222222');
  const [type, setType] = useState(edge?.type || 'default');
  const [width, setWidth] = useState(edge?.style?.strokeWidth || 2);
  const [colorAnchor, setColorAnchor] = useState(null);
  const [typeAnchor, setTypeAnchor] = useState(null);
  const [widthAnchor, setWidthAnchor] = useState(null);

  const handleColor = (c) => {
    setColor(c);
    onColor(c);
    setColorAnchor(null);
  };
  const handleType = (t) => {
    setType(t);
    onType(t);
    setTypeAnchor(null);
  };
  const handleWidth = (e, v) => {
    setWidth(v);
    onWidth(v);
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      PaperProps={{ sx: { p: 0.5, minWidth: 100, maxWidth: 160, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, borderRadius: 2 } }}
    >
      <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', justifyContent: 'center' }}>
        <Tooltip title="Eliminar">
          <IconButton color="error" onClick={onDelete} size="small" sx={{ p: 0.5 }}><DeleteIcon fontSize="small" /></IconButton>
        </Tooltip>
        <Tooltip title="Color">
          <IconButton size="small" sx={{ p: 0.5 }} onClick={e => setColorAnchor(e.currentTarget)}>
            <PaletteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Tipo">
          <IconButton size="small" sx={{ p: 0.5 }} onClick={e => setTypeAnchor(e.currentTarget)}>
            <SwapHorizIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Grosor">
          <IconButton size="small" sx={{ p: 0.5 }} onClick={e => setWidthAnchor(e.currentTarget)}>
            <LineWeightIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Popover de color */}
      <Popover
        open={Boolean(colorAnchor)}
        anchorEl={colorAnchor}
        onClose={() => setColorAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        PaperProps={{ sx: { p: 0.5, display: 'flex', flexWrap: 'wrap', gap: 0.5, borderRadius: 2, minWidth: 90, maxWidth: 120 } }}
      >
        {edgeColors.map((c) => (
          <Box key={c} onClick={() => handleColor(c)} sx={{ width: 18, height: 18, borderRadius: '50%', background: c, border: color === c ? '2px solid #1976d2' : '1px solid #ccc', cursor: 'pointer' }} />
        ))}
      </Popover>

      {/* Popover de tipo */}
      <Popover
        open={Boolean(typeAnchor)}
        anchorEl={typeAnchor}
        onClose={() => setTypeAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        PaperProps={{ sx: { p: 0.5, borderRadius: 2, minWidth: 90, maxWidth: 120 } }}
      >
        <Select
          value={type}
          onChange={e => handleType(e.target.value)}
          size="small"
          sx={{ fontSize: '0.85rem', width: '100%' }}
          MenuProps={{ PaperProps: { sx: { maxHeight: 180 } } }}
        >
          {edgeTypes.map((t) => (
            <MenuItem key={t.key} value={t.key} sx={{ fontSize: '0.85rem', p: 0.5 }}>{t.label}</MenuItem>
          ))}
        </Select>
      </Popover>

      {/* Popover de grosor */}
      <Popover
        open={Boolean(widthAnchor)}
        anchorEl={widthAnchor}
        onClose={() => setWidthAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        PaperProps={{ sx: { p: 0.5, borderRadius: 2, minWidth: 90, maxWidth: 120 } }}
      >
        <Slider min={1} max={10} step={1} value={width} onChange={handleWidth} size="small" sx={{ width: 80, mx: 1 }} />
      </Popover>
    </Popover>
  );
}
