import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import "./Header.scss"
function Header() {
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const Log_out = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("course")
    localStorage.removeItem("Admin")
    window.location.reload()
  }
  const user = localStorage.getItem("token")
  const owner = localStorage.getItem("Admin")
  return (
    <>
      <header>
        <nav className="navbar navbar-expand">
          <a className="navbar-brand"><img className="" src="https://cdn-icons-png.flaticon.com/512/1432/1432527.png" height={30} width={30} alt={""} /></a>
          <ul className="navbar-nav">
            <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="/services">Services</a></li>
            <li className="nav-item"><a className="nav-link" href="/about">About</a></li>
            <li className="nav-item"><a className="nav-link" href="/contact">Contact</a></li>
          </ul>
          {
            localStorage.length > 0 &&
            <>
              <Box className='header-Box' style={{ width: 'max-content' }} sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <Avatar alt="Remy Sharp" sx={{ width: 30, height: 30 }} src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" />
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                {
                  owner &&
                  <div>
                    <MenuItem onClick={()=> window.location = '/admin'}>
                      <Avatar /> Admin
                    </MenuItem>
                    <Divider />
                  </div>
                }
                {
                  user &&
                  <div>
                    <MenuItem onClick={()=> window.location = '/cards'}>
                      <Avatar /> User
                    </MenuItem>
                    <Divider />
                  </div>
                }
                <MenuItem onClick={Log_out}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          }
        </nav>
      </header>
    </>
  );
}

export default Header;