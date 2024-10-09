import "./Editor.css";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { githubDarkInit } from "@uiw/codemirror-theme-github";
import React from "react";
import { Box, Button, Select } from "@chakra-ui/react";
function Editor() {
  // eslint-disable-next-line no-unused-vars
  const onChange = React.useCallback((value, viewUpdate) => {
    console.log("value:", value);
  }, []);

  return (
    <div className="editorWrap">
      <Box className="editorBox" pb={4}>
        <Box className="editorHeader">
          <p className="editorAssignmentName">Assignment Name</p>

          <div className="editorLanguageSelector">
            <Select placeholder="choose a language">
              <option value="option1">C++</option>
              <option value="option2">Java</option>
              <option value="option3">Javascript</option>
              <option value="option3">Python</option>
            </Select>
          </div>
        </Box>
        <Box>
          <CodeMirror
            className="editorConsole"
            value="console.log('hello world!');"
            height="80vh"
            extensions={[javascript({ jsx: true })]}
            onChange={onChange}
            theme={githubDarkInit({
              settings: {
                caret: "#c6c6c6",
                fontFamily: "monospace",
              },
            })}
          />
        </Box>
        <Box className="editorFooter">
          <div>
            <input type="file" id="uploadFileBtn" hidden />
            <label htmlFor="uploadFileBtn" id="uploadFileLabel">
              Choose File
            </label>
          </div>
          <Button className="assignmentSubmitBtn">Submit</Button>
        </Box>
      </Box>
    </div>
  );
}

export default Editor;
