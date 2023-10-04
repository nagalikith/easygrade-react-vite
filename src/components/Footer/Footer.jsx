
import { Button } from "@chakra-ui/react"
import { LuPlus,LuBookCopy } from "react-icons/lu"
import{CgSync} from "react-icons/cg"
import "./Footer.css"

function Footer() {
  return (
    <div className="footerWrap">
      <div>
      <Button className="footerBtn" leftIcon={<LuPlus color="black" fontSize={20}/>}  variant='solid'>
    Create Assignment
  </Button>
  <Button className="footerBtn" leftIcon={<LuBookCopy color="black" fontSize={20} />}  variant='solid'>Duplicate Assignment</Button>
      </div>
      <div>
      <Button className="footerBtn" leftIcon={<CgSync color="black" fontSize={20} />}  variant='solid'>Sync</Button>
      </div>
     
    </div>
  )
}

export default Footer