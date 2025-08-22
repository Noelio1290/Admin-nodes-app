// Components/CustomNode/CustomNode.js
import { Handle, Position } from '@xyflow/react';
import { Box, IconButton, TextField, Popover, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import NoteIcon from '@mui/icons-material/Note';
import CloseIcon from '@mui/icons-material/Close';
import PaletteIcon from '@mui/icons-material/Palette';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ImageIcon from '@mui/icons-material/Image';
import React, { useState } from 'react';

// Este es el componente que renderizará cada nodo en el canvas...
const CustomNode = ({ id, data }) => {
  // Permite editar el label del nodo
  const handleLabelChange = (event) => {
    data.onChange(id, { label: event.target.value });
  };

  // Permite editar el valor (solo para nodos tipo 'input')
  const handleValueChange = (event) => {
    data.onChange(id, { value: event.target.value });
  };

  const COLOR_PALETTE = [
    '#ffffff', '#ff7300ff', '#b92b07ff', '#1feb58ff', '#1a6a3bff',
    '#8338ec', '#ff0000ff', '#0d06d6ff', '#ffbe0b', '#00ffffff'
  ];

  // Estado para mostrar/ocultar paleta de colores
  const [colorAnchor, setColorAnchor] = useState(null);
  // Estado para mostrar/ocultar menú de icono/imagen
  const [iconMenuAnchor, setIconMenuAnchor] = useState(null);

  // Maneja selección de color
  const handleColorClick = (event) => {
    setColorAnchor(event.currentTarget);
  };
  const handleColorSelect = (color) => {
    data.onChange(id, { color });
    setColorAnchor(null);
  };

  // Maneja menú de icono/imagen
  const handleIconMenuClick = (event) => {
    setIconMenuAnchor(event.currentTarget);
  };
  const handleIconMenuClose = () => {
    setIconMenuAnchor(null);
  };

  // Maneja selección de icono (emoji)
  const handleIconSelect = (event) => {
    data.onChange(id, { icon: event.target.value, image: undefined });
    setIconMenuAnchor(null);
  };

  // Maneja selección de imagen
  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        data.onChange(id, { image: ev.target.result, icon: undefined });
        setIconMenuAnchor(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Estado para mostrar/ocultar el dialogo de nota
  const [noteOpen, setNoteOpen] = useState(false);
  const [noteDraft, setNoteDraft] = useState(data.note || '');

  const handleNoteOpen = () => {
    setNoteDraft(data.note || '');
    setNoteOpen(true);
  };
  const handleNoteClose = () => setNoteOpen(false);
  const handleNoteSave = () => {
    data.onChange(id, { note: noteDraft });
    setNoteOpen(false);
  };

  return (
    <Box
      sx={{
        border: data.highlight ? '2.5px solid #1976d2' : '1px solid #1a192b',
        borderRadius: '3px',
        backgroundColor: data.color || 'white',
        width: 170,
        textAlign: 'center',
        position: 'relative',
        padding: '10px',
        boxShadow: data.highlight ? '0 0 10px #1976d2' : '0 2px 5px rgba(0,0,0,0.1)',
        transition: 'box-shadow 0.2s, border 0.2s',
      }}
    >
      {/* Botón de nota/descripcion (esquina inferior izquierda) */}
      <IconButton
        aria-label="note"
        size="small"
        sx={{
          position: 'absolute',
          bottom: -12,
          left: -12,
          backgroundColor: data.note ? '#fffde7' : 'white',
          border: '1px solid #1a192b',
          '&:hover': { backgroundColor: '#fffde7' },
          zIndex: 2,
        }}
        onClick={handleNoteOpen}
      >
        <NoteIcon fontSize="inherit" color={data.note ? 'warning' : 'action'} />
      </IconButton>

      {/* Dialogo para editar nota */}
      <Dialog open={noteOpen} onClose={handleNoteClose} maxWidth="xs" fullWidth>
        <DialogTitle>Nota o descripción</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            minRows={4}
            fullWidth
            value={noteDraft}
            onChange={e => setNoteDraft(e.target.value)}
            placeholder="Agrega una nota o descripción para este nodo..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNoteClose}>Cancelar</Button>
          <Button onClick={handleNoteSave} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
      {/* Botón de paleta de colores (esquina superior izquierda) */}
      <IconButton
        aria-label="color"
        size="small"
        sx={{
          position: 'absolute',
          top: -12,
          left: -12,
          backgroundColor: 'white',
          border: '1px solid #1a192b',
          '&:hover': { backgroundColor: '#eee' },
          zIndex: 2,
        }}
        onClick={handleColorClick}
      >
        <PaletteIcon fontSize="inherit" />
      </IconButton>
      <Popover
        open={Boolean(colorAnchor)}
        anchorEl={colorAnchor}
        onClose={() => setColorAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{ sx: { p: 1, display: 'flex', gap: 1 } }}
      >
        {COLOR_PALETTE.map((color) => (
          <Box
            key={color}
            onClick={() => handleColorSelect(color)}
            sx={{
              width: 24, height: 24, borderRadius: '50%',
              backgroundColor: color,
              border: data.color === color ? '2px solid #1976d2' : '1px solid #aaa',
              cursor: 'pointer',
              transition: 'border 0.2s',
            }}
          />
        ))}
      </Popover>

      {/* Botón de icono/imagen (esquina superior derecha) */}
      <IconButton
        aria-label="icon"
        size="small"
        sx={{
          position: 'absolute',
          top: -12,
          right: -12,
          backgroundColor: 'white',
          border: '1px solid #1a192b',
          '&:hover': { backgroundColor: '#eee' },
          zIndex: 2,
        }}
        onClick={handleIconMenuClick}
      >
        <InsertEmoticonIcon fontSize="inherit" />
      </IconButton>
      <Popover
        open={Boolean(iconMenuAnchor)}
        anchorEl={iconMenuAnchor}
        onClose={handleIconMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { p: 2, display: 'flex', flexDirection: 'column', gap: 1 } }}
      >
        <Tooltip title="Elegir emoji">
          <TextField
            size="small"
            placeholder="Emoji"
            value={data.icon || ''}
            onChange={handleIconSelect}
            inputProps={{ maxLength: 2, style: { width: 40, textAlign: 'center', fontSize: 22 } }}
            sx={{ mb: 1 }}
          />
        </Tooltip>
        <Tooltip title="Subir imagen">
          <IconButton component="label" size="small">
            <ImageIcon />
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageSelect}
            />
          </IconButton>
        </Tooltip>
      </Popover>

      {/* Botón de cerrar (esquina inferior derecha) */}
      <IconButton
        aria-label="delete"
        size="small"
        sx={{
          position: 'absolute',
          bottom: -12,
          right: -12,
          backgroundColor: 'white',
          border: '1px solid #1a192b',
          '&:hover': { backgroundColor: '#eee' },
          zIndex: 2,
        }}
        onClick={() => data.onDelete(id)}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>

      <Handle type="target" position={Position.Top} id="a" />

      {/* Mostrar imagen o icono */}
      {data.image ? (
        <img
          src={data.image}
          alt="icon"
          style={{ width: 32, height: 32, marginBottom: 4, objectFit: 'cover', borderRadius: 6 }}
        />
      ) : data.icon ? (
        <span style={{ fontSize: 28, marginBottom: 4, display: 'block' }}>{data.icon}</span>
      ) : null}

      {/* Campo editable para el label */}
      <TextField
        variant="standard"
        value={data.label}
        onChange={handleLabelChange}
        fullWidth
        inputProps={{
          style: { textAlign: 'center', fontWeight: 'bold', fontSize: 15 },
        }}
        sx={{ marginBottom: 1 }}
        onClick={e => e.stopPropagation()}
      />

      {/* Campo de valor solo para nodos tipo 'input' */}
      {data.nodeType === 'input' && (
        <TextField
          label="Valor"
          variant="outlined"
          size="small"
          fullWidth
          value={data.value}
          onChange={handleValueChange}
          onClick={e => e.stopPropagation()}
          sx={{
            marginTop: '4px',
            '& .MuiInputBase-input': { padding: '8px' },
          }}
        />
      )}

      <Handle type="source" position={Position.Bottom} id="b" />
    </Box>
  );
};

export default React.memo(CustomNode);