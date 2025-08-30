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

  const handleColor = (c) => {
    setColor(c);
    onColor(c);
  };
  const handleType = (t) => {
    setType(t);
    onType(t);
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
          <Box sx={{ position: 'relative' }}>
            <IconButton size="small" sx={{ p: 0.5 }}>
              <PaletteIcon fontSize="small" />
            </IconButton>
            <Box sx={{ position: 'absolute', top: 28, left: 0, display: 'flex', flexWrap: 'wrap', gap: 0.5, bgcolor: 'background.paper', p: 0.5, borderRadius: 1, boxShadow: 2, zIndex: 10 }}>
              {edgeColors.map((c) => (
                <Box key={c} onClick={() => handleColor(c)} sx={{ width: 14, height: 14, borderRadius: '50%', background: c, border: color === c ? '2px solid #1976d2' : '1px solid #ccc', cursor: 'pointer' }} />
              ))}
            </Box>
          </Box>
        </Tooltip>
        <Tooltip title="Tipo">
          <Box sx={{ position: 'relative' }}>
            <IconButton size="small" sx={{ p: 0.5 }}>
              <SwapHorizIcon fontSize="small" />
            </IconButton>
            <Select
              value={type}
              onChange={e => handleType(e.target.value)}
              size="small"
              sx={{ position: 'absolute', top: 28, left: 0, minWidth: 70, fontSize: '0.8rem', bgcolor: 'background.paper', borderRadius: 1, boxShadow: 2, zIndex: 10, p: 0 }}
              MenuProps={{ PaperProps: { sx: { maxHeight: 180 } } }}
            >
              {edgeTypes.map((t) => (
                <MenuItem key={t.key} value={t.key} sx={{ fontSize: '0.85rem', p: 0.5 }}>{t.label}</MenuItem>
              ))}
            </Select>
          </Box>
        </Tooltip>
        <Tooltip title="Grosor">
          <Box sx={{ position: 'relative' }}>
            <IconButton size="small" sx={{ p: 0.5 }}>
              <LineWeightIcon fontSize="small" />
            </IconButton>
            <Box sx={{ position: 'absolute', top: 28, left: 0, width: 60, bgcolor: 'background.paper', p: 0.5, borderRadius: 1, boxShadow: 2, zIndex: 10 }}>
              <Slider min={1} max={10} step={1} value={width} onChange={handleWidth} size="small" sx={{ height: 18 }} />
            </Box>
          </Box>
        </Tooltip>
      </Box>
    </Popover>
  );
}
