import React, { useState } from 'react';
import {
  Modal,
  Backdrop,
  Fade,
  TextField,
  Button,
  makeStyles,
  IconButton
} from '@material-ui/core';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ModifyRowModalComponent = ({ open,handleSave, handleClose, service }) => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const [serviceName, setServiceName] = useState(service.serviceName);
  const [username, setUsername] = useState(service.username);
  const [password, setPassword] = useState(service.password);

  const handleSaveClick = () => {
    handleSave(serviceName, username,password);

  };

  const handleCancel = () => {
    handleClose();
  };

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
          <IconButton onClick={handleSaveClick}>Save</IconButton>
          <IconButton onClick={handleCancel}>Cancel</IconButton>
        </div>
      </Fade>
    </Modal>
  );
};

export default ModifyRowModalComponent;