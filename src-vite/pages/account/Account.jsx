import { Button } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Account.css";
function Account() {
  return (
    <div className="accountContainer">
      <Sidebar />

      <div className="accountWrapper">  
        <div className="accountLogoutWrapper">
          <Button
            className="accountLogoutBtn"
            colorScheme="red"
            variant="solid"
          >
            LogOut
          </Button>
        </div>
        <h1 className="accountTitle">Account Details</h1>
        <div className="accountInfoWrapper">
          <div className="accountInfo">
            <h2 className="accountInfoTitle">userName</h2>
            <h3 className="accountInfoData">John Doe</h3>
          </div>
          <div className="accountInfo">
            <h2 className="accountInfoTitle">Email</h2>
            <h3 className="accountInfoData">Johndoe@gmail.com</h3>
          </div>
          <div className="accountInfo">
            <h2 className="accountInfoTitle">Join date</h2>
            <h3 className="accountInfoData">08/09/23 12:34PM</h3>
          </div>
        </div>

        <div className="accountAccessibilityButtons">
          <Button
            className="accountAccessBtn accountAccessibilityChangeEmail"
            colorScheme="green"
            variant="solid"
          >
            Change Email
          </Button>
          <Button
            className="accountAccessBtn accountAccessibilityChangePassword"
            colorScheme="green"
            variant="solid"
          >
            Change Password
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Account;
