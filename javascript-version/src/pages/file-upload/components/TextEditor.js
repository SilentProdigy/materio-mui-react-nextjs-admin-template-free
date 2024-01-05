import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert';

import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

const TextEditor = ({ content, onContentChange, uploadedFileName, uploadedFile }) => {
  const [open, setOpen] = React.useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [open, setOpen]);

  useEffect(() => {
    // Fetch files when the component mounts
    fetchFiles();
  }, []);

  const fetchFiles = () => {
    // Fetch files from the server
    fetch('http://localhost:3001/api/files')
      .then(response => response.json())
      .then(data => {
        setUploadedFiles(data.files);
      })
      .catch(error => {
        console.error('Error fetching files:', error);
        // Handle errors
      });
  };


  const handleEditorChange = (e, editor) => {
    onContentChange(editor.getContent());
  };

  const handleSave = () => {
    // const blob = new Blob([content], { type: 'text/plain' });
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = uploadedFileName || 'editedFile.txt'; // Use the uploaded file name or a default name
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
    // URL.revokeObjectURL(url);

    if (uploadedFile) {
      const formData = new FormData();
      formData.append('file', uploadedFile);

      // Use your preferred method to send the file to the server
      // For example, using fetch:
      fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log('File uploaded successfully:', data);
          setOpen(true);
          setUploadedFiles(prevFiles => [...prevFiles, data.fileName]);
          // Handle any further actions after the file is uploaded
        })
        .catch(error => {
          console.error('Error uploading file:', error);
          // Handle errors
        });
    }
  };

  const handleFileButtonClick = (fileName) => {
    // Handle the click event for a specific file button
    console.log(`Button for file ${fileName} clicked!`);
    // Add your logic here, e.g., open the file, display details, etc.
  };

  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={4} md={2}>
          {uploadedFiles.length > 0 && (
            <div>
              <h4>Uploaded Files:</h4>
              {uploadedFiles.map((fileName, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  onClick={() => handleFileButtonClick(fileName)}
                  sx={{ margin: '4px' }}
                >
                  {fileName}
                </Button>
              ))}
            </div>
          )}
        </Grid>
        <Grid item xs={8} md={10}>
          <Editor
            initialValue={content}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help'
            }}
            onChange={handleEditorChange}
          />
          <Grid item xs={12} sx={{ textAlign: 'center' }} my={4}>
            <Button
              target='_blank'
              rel='noreferrer'
              variant='contained'
              onClick={handleSave}
            >
              Save File
            </Button>
          </Grid>
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              File uploaded successfully!
            </Alert>
          </Collapse>
        </Grid>
      </Grid>
    </div>
  );
};

export default TextEditor;