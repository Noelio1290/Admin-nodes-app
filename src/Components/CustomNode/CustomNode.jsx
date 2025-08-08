import { Handle, Position } from '@xyflow/react';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

// Este es el componente que renderizará cada nodo en el canvas.
const CustomNode = ({ id, data }) => {
  return (
    <Box
      sx={{
        border: '1px solid #1a192b',
        borderRadius: '3px',
        backgroundColor: 'white',
        width: 150,
        textAlign: 'center',
        position: 'relative', // Necesario para posicionar el botón de borrado
        padding: '10px',
      }}
    >
      {/* Botón de borrado posicionado en la esquina superior derecha */}
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
        onClick={() => data.onDelete(id)} // Llama a la función onDelete pasada en los datos
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
      
      {/* Estos son los 'handles' o puntos de conexión del nodo */}
      <Handle type="target" position={Position.Top} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </Box>
  );
};

export default React.memo(CustomNode);
