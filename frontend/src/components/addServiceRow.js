import React, { useState } from 'react';
import Button from "@mui/material/Button";
import  {IconButton}  from "@mui/material";
import { TextField, TableCell, Input } from '@mui/material';
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
        style={{ marginRight: '8px' }}
      />
      <TextField
        label="Username"
        variant="outlined"
        size="small"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginRight: '8px' }}
      />
      <TextField
        label="Password"
        variant="outlined"
        size="small"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginRight: '8px' }}
      />

      <IconButton onClick={toggleShowPassword}>
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>

      <Button variant="contained" color="primary" onClick={handleSave}>
        +
      </Button>
    </div>
  );
};

export default AddServiceRow;