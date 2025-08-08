import React from 'react';
import { Box, Typography } from '@mui/material';

const nodeTypes = ['default', 'input', 'output', 'group'];

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Box 
        sx={{ 
            display:"flex",
            borderRight:"1px solid #ddd",
            flexFlow:"column",
            alignItems:"center",
            paddingTop: "15px", 
            width:"250px",
            backgroundColor: '#f7f7f7'
        }}
    >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Nodos
        </Typography>
        {nodeTypes.map((type) => (
            <Box
                key={type}
                onDragStart={(e) => onDragStart(e, type)}
                draggable
                sx={{
                  display:"flex",
                  alignItems:"center",
                  justifyContent: "center",
                  height:"40px",
                  width:'85%',
                  marginBottom:"10px",
                  border: '1px solid #1a192b',
                  borderRadius: '3px',
                  backgroundColor: 'white',
                  cursor: 'grab',
                  '&:active': {
                    cursor: 'grabbing',
                  },
                }}
            >
                Nodo {type}
            </Box>
        ))}
    </Box>
  );
};

export default Sidebar;
