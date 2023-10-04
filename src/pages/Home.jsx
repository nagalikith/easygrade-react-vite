// import Editor from "../components/Editor/Editor";
// import Footer from "../components/Footer/Footer";
// import Sidebar from "../components/Sidebar/Sidebar";
// import Testbar from "../components/Testbar/Testbar";
import Editor from "../components/Editor/Editor";
import Sidebar from "../components/Sidebar/Sidebar";
import Testbar from "../components/Testbar/Testbar";
import "./Home.css";
// import { Grid, GridItem } from "@chakra-ui/react";
function Home() {
  return (
    <div className="container">
      {/* <Grid
        templateAreas={`"editor editor editor testbar"
                  "editor editor editor testbar"
                  "editor editor editor testbar"
                  "editor editor editor testbar"
                  "editor editor editor testbar"
                  "footer footer footer footer"`}
        gridTemplateRows={"6 1fr "}
        gridTemplateColumns={"4 1fr"}
        gap="0"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem w="80vw" h="90vh"  bg="orange.300" area={"editor"}>
          <Sidebar />
          editor
        </GridItem>
        <GridItem w="20vw" h="90vh" bg="pink.300" area={"testbar"}>
          testbar
        </GridItem>

        <GridItem w="100vw" h="10vh"  bg="blue.300" area={"footer"}>
          <Footer/>
        </GridItem>
      </Grid> */}
<Sidebar/>
<div className="editorWrapper">
<div className="editorContainer">
<Editor/>
</div>
<div className="testbarContainer">
<Testbar/>

</div>
</div>
{/* <Footer/> */}

      {/* <Sidebar/>
      <div className="editorContainer"> <Editor/></div>
      <div className="testbarContainer"><Testbar/> </div>
      <div className="footerContainer"> <Footer/></div> */}
    </div>
  );
}

export default Home;
