import { Box } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import "./Testbar.css";
import { CgLock, CgLockUnlock } from "react-icons/cg";
// import React from "react";
function Testbar() {
  // const { isPassed, setIsPassed } = React.useState(true);
  const isPassed = false;
  return (
    <div className="testbarWrap">
      <Box className="testbarBox">
        <Box>
          <h1 className="testcaseHeader">Test cases</h1>
        </Box>

        <Box className="testcaseBox">  
         {/* test case accordion */}
          <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <CgLockUnlock />
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    className="testcaseHead"
                  >
                    Test case 1
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Box mb={2}>
                  <h3 className="testcaseFieldHead">Input</h3>
                  <Box className="testcaseField">
                    <p>
                      N = 6
                      <br />
                      arr[] = 7 10 4 3 20 15
                      <br />K = 3
                    </p>
                  </Box>
                  <h3 className="testcaseFieldHead">Expected Output</h3>
                  <Box className="testcaseField">
                    <p>
                      N = 6
                      <br />
                      arr[] = 7 10 4 3 20 15
                      <br />K = 3
                    </p>
                  </Box>
                  <h3 className="testcaseFieldHead">Your Output</h3>
                  <Box className="testcaseField">
                    <p>
                      N = 6
                      <br />
                      arr[] = 7 10 4 3 20 15
                      <br />K = 3
                    </p>
                  </Box>
                </Box>
                {isPassed ? (
                  <Alert status="success">
                    <AlertIcon />
                    Test case passed!
                  </Alert>
                ) : (
                  <Alert status="error">
                    <AlertIcon />
                    Test case passed!
                  </Alert>
                )}
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <CgLock />

                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    className="testcaseHead"
                  >
                    Test case 1
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Box mb={2}>
                  <h3>Input</h3>
                  <Box className="testcaseField">
                    <p>
                      N = 6
                      <br />
                      arr[] = 7 10 4 3 20 15
                      <br />K = 3
                    </p>
                  </Box>
                  <h3>Expected Output</h3>
                  <Box className="testcaseField">
                    <p>
                      N = 6
                      <br />
                      arr[] = 7 10 4 3 20 15
                      <br />K = 3
                    </p>
                  </Box>
                  <h3>Your Output</h3>
                  <Box className="testcaseField">
                    <p>
                      N = 6
                      <br />
                      arr[] = 7 10 4 3 20 15
                      <br />K = 3
                    </p>
                  </Box>
                </Box>
                {isPassed ? (
                  <Alert status="success">
                    <AlertIcon />
                    Test case passed!
                  </Alert>
                ) : (
                  <Alert status="error">
                    <AlertIcon />
                    Test case passed!
                  </Alert>
                )}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Box>
    </div>
  );
}

export default Testbar;
