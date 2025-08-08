// Components/CustomNode/CustomNode.js
import { Handle, Position } from '@xyflow/react';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

// Este es el componente que renderizará cada nodo en el canvas.
const CustomNode = ({ id, data }) => {
  // Función para manejar los cambios en el campo de texto
  const handleValueChange = (event) => {
    // Llama a la función 'onChange' que pasamos desde App.js
    // Le enviamos el ID del nodo y el nuevo valor para actualizar el estado.
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
      
      {/* Etiqueta del nodo */}
      <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
        {data.label}
      </Typography>

      {/* RENDERIZADO CONDICIONAL: Mostramos el campo de texto solo para nodos de tipo 'input' */}
      {data.nodeType === 'input' && (
        <TextField
          label="Valor"
          variant="outlined"
          size="small"
          fullWidth
          value={data.value} // El valor está controlado por el estado en App.js
          onChange={handleValueChange} // Llama a la función para actualizar el estado
          onClick={(e) => e.stopPropagation()} // Evita que se arrastre el nodo al hacer clic en el input
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