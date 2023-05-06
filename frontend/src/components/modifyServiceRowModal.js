import React, { useState } from 'react';
import {
  Modal,
  Fade,
  TextField,
  Button,
  IconButton,
  InputAdornment
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { Visibility, VisibilityOff } from "@mui/icons-material";

const styles = {
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: '#FFF',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
    borderRadius: '5px',
    padding: '30px',
    outline: 'none'
  }
};

const ModifyRowModalComponent = ({ open, handleSave, handleClose, service }) => {
  const [serviceName, setServiceName] = useState(service.serviceName);
  const [username, setUsername] = useState(service.username);
  const [password, setPassword] = useState(service.password);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSaveClick = () => {
    handleSave(serviceName, username,password);

  };

  const handleCancel = () => {
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      style={styles.modal}
    >
      <Fade in={open}>
        <div style={styles.paper}>
          <h2 id="modal-title">Modify service info</h2>
          <form noValidate autoComplete="off">
            <TextField
              id="serviceName"
              label="Service Name"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
            />
            <TextField
              id="username"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          </form>
          <Button onClick={handleSaveClick} variant="contained" color="primary">Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default ModifyRowModalComponent;
