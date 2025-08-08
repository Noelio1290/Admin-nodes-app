import { ReactFlowProvider } from "@xyflow/react";
import { Box } from "@mui/material";
import Sidebar from "./Components/Sidebar/Sidebar";
import FlowCanvas from "./Components/FlowCanvas/FlowCanvas";

const App = () => {
  return (
    <ReactFlowProvider>
      <Box 
        sx={{
          display: "flex",
          flexFlow: "row",
          height: "100vh"
        }}
      >
        <Sidebar />
        <FlowCanvas />
      </Box>
    </ReactFlowProvider>
  );
}

export default App;