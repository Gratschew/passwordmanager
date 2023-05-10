import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import KeySafeLogo from "./KeySafeLogo.png";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import { login } from "../Redux/reducers/AuthReducer";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../Redux/reducers/ServiceReducer";
import { createService } from "../Redux/reducers/ServiceReducer";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Input,
  IconButton,
  TableContainer,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ServiceRow from "./ServiceRow";
import AddServiceRow from "./addServiceRow";

const Home = ({}) => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const services = useSelector((state) => state.service);

  //TESTI
  const handleSaveService = ({ serviceName, username, password }) => {
    // Save the service data to your backend or do something else with it
    dispatch(createService({ serviceName, username, password }));
  };

  useEffect(() => {
    dispatch(getServices());
  }, []);

  if (services.loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "0px solid #ccc",
          boxShadow: "0px 2px 20px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
          padding: "24px",
        }}
      >
        <Typography variant="h6">Add Service</Typography>
        <AddServiceRow onSave={handleSaveService} />
        <Typography variant="h6">Services</Typography>
        <Box sx={{ mt: 2, mb: 2, width: "80%", margin: "0 auto" }}>
          <Divider sx={{ mt: 2, mb: 2 }} />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Service Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Username
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Password
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {services.data.map((service) => (
                  <ServiceRow service={service} key={service._id}></ServiceRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
