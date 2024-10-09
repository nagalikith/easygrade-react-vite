// import Editor from "../components/Editor/Editor";
import Footer from "../components/Footer/Footer";
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
<Sidebar/>
<div className="editorWrapper">
<div className="editorContainer">
<Editor/>
</div>
<div className="testbarContainer">
<Testbar/>

</div>
</div>
<Footer/>
    </div>
  );
}

export default Home;
