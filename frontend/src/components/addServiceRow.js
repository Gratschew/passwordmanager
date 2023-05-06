import React, { useState } from 'react';
import Button from "@mui/material/Button";
import  {IconButton}  from "@mui/material";
import { TextField, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
//{ onSave }
const AddServiceRow = ({ onSave }) => {
  const [serviceName, setServiceName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSave = () => {
    onSave({ serviceName, username, password });
    console.log("Save");
    setServiceName('');
    setUsername('');
    setPassword('');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
      <TextField
        label="Service Name"
        variant="outlined"
        size="small"
        value={serviceName}
        onChange={(e) => setServiceName(e.target.value)}
        style={{ marginRight: '8px', flex: 1 }}
      />
      <TextField
        label="Username"
        variant="outlined"
        size="small"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginRight: '8px', flex: 1 }}
      />
      <TextField
        id="password"
        label="Password"
        size="small"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginRight: '8px', flex: 1 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={toggleShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
        
        />
      <Button variant="contained" color="primary" onClick={handleSave} disabled={serviceName == ""|| username =="" || password=="" }>
        +
      </Button>
    </div>
  );
};

export default AddServiceRow;