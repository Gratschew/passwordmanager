import * as React from "react";
import { useState, useEffect } from "react";
import { login } from "../Redux/reducers/AuthReducer";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../Redux/reducers/ServiceReducer";
import FileCopyIcon from "@mui/icons-material/FileCopy";
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

const ServiceRow = ({ service }) => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const services = useSelector((state) => state.service);

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
      </TableCell>
    </TableRow>
  );
};

export default ServiceRow;
