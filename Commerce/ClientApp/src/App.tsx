import { Box } from "@mui/material";
import { Outlet, useNavigation } from "react-router-dom";
import Header from "./layout/Header";
import NavBar from "./layout/NavBar";

function App() {
  const navigation = useNavigation();

  return (
   <>
      <Header />
      <Box display="flex">
        <Box mr="2rem" mt="1rem">
          <NavBar />
        </Box>
        <Box mt="1rem" width="100%" mr="2rem">
          {navigation.state !== "loading" ? <Outlet /> : <div>Loading</div>}
        </Box>
      </Box>
      </>
  );
}

export default App;
