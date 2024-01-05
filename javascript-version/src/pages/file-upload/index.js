// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import TabInfo from 'src/views/account-settings/TabInfo'
import TabAccount from 'src/views/account-settings/TabAccount'
import TabSecurity from 'src/views/account-settings/TabSecurity'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { Button, Typography } from '@mui/material'

import TextEditor from './components/TextEditor'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const FileUpload = () => {
  // ** State
  const [value, setValue] = useState('account')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const [fileContent, setFileContent] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setFileContent(event.target.result);
      };

      reader.readAsText(file);

      setUploadedFile(file);
    }
  };

  const handleContentChange = (newContent) => {
    setFileContent(newContent);
  };

  return (
    <Card>
      {/* <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='account'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Account</TabName>
              </Box>
            }
          />
          <Tab
            value='security'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>Security</TabName>
              </Box>
            }
          />
          <Tab
            value='info'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InformationOutline />
                <TabName>Info</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='account'>
          <TabAccount />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='security'>
          <TabSecurity />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='info'>
          <TabInfo />
        </TabPanel>
      </TabContext> */}
      <Box padding={4}>
        <Typography fontWeight={"bold"}>FILE EDITOR</Typography>
        <div style={{ padding: '20px', border: '2px dashed #ccc', textAlign: 'center' }}>
            <input type="file" accept=".txt" onChange={handleFileChange} style={{ display: 'none' }} id="uploadInput" />
            <label htmlFor="uploadInput" style={{ cursor: 'pointer', display: 'block', padding: '10px', background: '#eee' }}>
            Click to upload a text file
            </label>
        </div>
        <TextEditor content={fileContent} onContentChange={handleContentChange} uploadedFile={uploadedFile} />
      </Box>
    </Card>
  )
}

export default FileUpload
