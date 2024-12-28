import React, { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the desired Quill theme styles

const RichTextEditor = ({ input, setInput }) => {
  const quillRef = useRef(null);

  // Handle content change
  const handleChange = (content) => {
    setInput({ ...input, description: content });
  };
 

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={input.description}
      onChange={handleChange}
    />
  );
};

export default RichTextEditor;
