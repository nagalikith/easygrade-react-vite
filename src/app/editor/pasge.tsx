import "./Editor.css";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { githubDarkInit } from "@uiw/codemirror-theme-github";
import React, { useCallback, useState } from "react";
import { Box, Button, Select, Input } from '@/app/components/ui';

const Editor = React.memo(() => {
  const [code, setCode] = useState("console.log('hello world!');");
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");

  const handleCodeChange = useCallback((value: string) => {
    setCode(value);
  }, []);

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const addComment = () => {
    if (newComment.trim()) {
      setComments((prevComments) => [...prevComments, newComment.trim()]);
      setNewComment(""); // Clear the input field
    }
  };

  return (
    <div className="editorWrap">
      <Box className="editorBox" pb={4}>
        <Box className="editorHeader">
          <p className="editorAssignmentName">Assignment Name</p>
          <div className="editorLanguageSelector">
            <Select placeholder="Choose a language" variant="outline" size="sm">
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
            </Select>
          </div>
        </Box>
        <Box>
          <CodeMirror
            className="editorConsole"
            value={code}
            height="80vh"
            extensions={[javascript({ jsx: true })]}
            onChange={handleCodeChange}
            theme={githubDarkInit({
              settings: {
                caret: "#c6c6c6",
                fontFamily: "monospace",
              },
            })}
          />
        </Box>
        <Box className="editorFooter" display="flex" justifyContent="space-between" alignItems="center" mt={4}>
          <label htmlFor="uploadFileBtn" className="uploadFileLabel">
            <input type="file" id="uploadFileBtn" hidden />
            Choose File
          </label>
          <Button className="assignmentSubmitBtn" size="sm" colorScheme="blue">
            Submit
          </Button>
        </Box>
        <Box mt={4}>
          <Input
            placeholder="Add a comment..."
            value={newComment}
            onChange={handleCommentChange}
            size="sm"
          />
          <Button onClick={addComment} size="sm" colorScheme="teal" ml={2}>
            Add Comment
          </Button>
        </Box>
        <Box mt={4}>
          <h4>Comments:</h4>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </Box>
      </Box>
    </div>
  );
});

export default Editor;
