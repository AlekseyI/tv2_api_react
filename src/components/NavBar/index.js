import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Button, Container, IconButton, Link, MenuItem, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_LOGGED_IN, logout, selectUser } from "../../store/userReducer";
import Menu from "@mui/material/Menu";
import { Home, Menu as MenuIcon } from "@mui/icons-material";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const NavLinks = styled.div`
  ${(props) =>
          props.maxWidthHide &&
          css`
            @media (max-width: ${props.maxWidthHide}px) {
              display: none;
            }
          `}
  ${(props) =>
          props.minWidthHide &&
          css`
            @media (min-width: ${props.minWidthHide}px) {
              display: none;
            }
          `}
`;

NavLinks.propTypes = {
  maxWidthHide: PropTypes.string,
  minWidthHide: PropTypes.string
};

const NavBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const userState = useSelector(selectUser);

  const showLinks = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const hideLinks = () => {
    setAnchorEl(null);
  };

  const goTo = (path, isCloseLinks = false, isReplace = false) => {
    navigate(path, { replace: isReplace });
    if (isCloseLinks) {
      setAnchorEl(null);
    }
  };

  const onLogout = (isCloseLinks = false) => {
    dispatch(logout()).finally(() => goTo("/login", isCloseLinks, true));
  };

  return (
    <AppBar position="sticky">
      <Container sx={{ flexGrow: 1 }}>
        <Toolbar>
          <Link href="/" nderline="none">
            <IconButton
              edge="start"
              aria-label="menu"
              color="warning"
            >
              <Home fontSize="large" />
            </IconButton>
          </Link>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            TV2
          </Typography>
          <NavLinks maxWidthHide="730">
            {userState.authenticationState === AUTH_LOGGED_IN ? (
              <>
                <Link href="/account" underline="none" color="white" style={{ marginLeft: 10 }}>
                  <Button
                    color="inherit"
                    variant="outlined"
                  >
                    Account
                  </Button>
                </Link>
                <Link href="/channels" underline="none" color="white" style={{ marginLeft: 10 }}>
                  <Button
                    color="inherit"
                    variant="outlined"
                  >
                    Channels
                  </Button>
                </Link>
                <Link href="/movies" underline="none" color="white" style={{ marginLeft: 10 }}>
                  <Button
                    color="inherit"
                    variant="outlined"
                  >
                    Movies
                  </Button>
                </Link>
                <Link href="/settings" underline="none" color="white" style={{ marginLeft: 10 }}>
                  <Button
                    color="inherit"
                    variant="outlined"
                  >
                    Settings
                  </Button>
                </Link>
                <Button
                  color="inherit"
                  variant="outlined"
                  style={{ marginLeft: 10 }}
                  onClick={() => onLogout()}
                >
                  Logout
                </Button>
              </>
            ) : null}
          </NavLinks>
          <NavLinks minWidthHide="731">
            <IconButton
              edge="start"
              aria-label="menu"
              color="inherit"
              onClick={showLinks}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
            {userState.authenticationState === AUTH_LOGGED_IN ? (
              <Menu
                anchorEl={anchorEl}
                open={anchorEl !== null}
                onClose={hideLinks}
              >
                <MenuItem onClick={() => setAnchorEl(null) }>
                  <Link href="/account">
                  Account
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => setAnchorEl(null) }>
                  <Link href="/channels">
                  Channels
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>
                  <Link href="/movies">
                  Movies
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>
                  <Link href="/settings">
                  Settings
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => onLogout(true)}>Logout</MenuItem>
              </Menu>
            ) : (
              <Menu
                anchorEl={anchorEl}
                open={anchorEl !== null}
                onClose={hideLinks}
              />
            )}
          </NavLinks>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;