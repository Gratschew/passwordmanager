import * as React from "react";
import { useState, useEffect } from "react";
import { login } from "../Redux/reducers/AuthReducer";
import { useDispatch, useSelector } from "react-redux";
import { getServices, ModifyService } from "../Redux/reducers/ServiceReducer";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import EditIcon from '@mui/icons-material/Edit';
import ModifyRowModalComponent from "./modifyServiceRowModal";
import DeleteIcon from '@mui/icons-material/Delete';

import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Input,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DeleteService } from "../Redux/reducers/ServiceReducer";


const ServiceRow = ({ service }) => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const services = useSelector((state) => state.service);


  const [modifyModalOpen, setModifyModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleOpenModifyModal = () =>{
    setModifyModalOpen(true);
  }

  const handleDeleteServiceRow = ()=>{
    dispatch(DeleteService(service._id))
  }

  const handleSave = (serviceName, username,password) => {
    setModifyModalOpen(false);
    const id = service._id;
    dispatch(ModifyService({id,serviceName,username,password }))
  }

  const handleClose = () =>{
    setModifyModalOpen(false);
  }

  return (
    <TableRow
      key={service._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>{service.serviceName}</TableCell>
      <TableCell>{service.username}</TableCell>
      <TableCell>
        <Input
          disabled
          type={showPassword ? "text" : "password"}
          value={service.password}
        />
        <IconButton onClick={toggleShowPassword}>
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
        <IconButton>
          <FileCopyIcon />
        </IconButton>
        <IconButton onClick={handleOpenModifyModal}>
          <EditIcon />
        </IconButton>
        <ModifyRowModalComponent open ={modifyModalOpen} handleSave = {handleSave} handleClose = {handleClose} service = {service}/>
        <IconButton onClick={handleDeleteServiceRow} >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ServiceRow;
