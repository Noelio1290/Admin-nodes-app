// Components/CustomNode/CustomNode.js
import { Handle, Position } from '@xyflow/react';
import { Box, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

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

  return (
    <Box
      sx={{
        border: '1px solid #1a192b',
        borderRadius: '3px',
        backgroundColor: 'white',
        width: 170, // Aumentamos un poco el ancho para el campo de texto
        textAlign: 'center',
        position: 'relative',
        padding: '10px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      }}
    >
      {/* Botón de borrado (sin cambios) */}
      <IconButton
        aria-label="delete"
        size="small"
        sx={{
          position: 'absolute',
          top: -12,
          right: -12,
          backgroundColor: 'white',
          border: '1px solid #1a192b',
          '&:hover': {
            backgroundColor: '#eee',
          },
        }}
        onClick={() => data.onDelete(id)}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
      
      {/* Puntos de conexión (sin cambios) */}
      <Handle type="target" position={Position.Top} id="a" />
      
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
            '& .MuiInputBase-input': {
              padding: '8px',
            },
          }}
        />
      )}
      
      <Handle type="source" position={Position.Bottom} id="b" />
    </Box>
  );
};

export default React.memo(CustomNode);