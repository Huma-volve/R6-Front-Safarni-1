import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Avatar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import Logo from '../assets/logo.png'
import type { NavbarProps, NavItem } from '../../types/sylvia/types';


const defaultLinks: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Favorite', to: '/favorite' },
  { label: 'Compare', to: '/compare' },
  { label: 'maps', to: '/maps' },
];

export default function Navbar({ links = defaultLinks, user = null, onSearch }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  
  return (
    <header className="w-full bg-white fixed left-0 top-0">
      <div className="max-w-6xl mx-auto p-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16">

          <div className="flex items-center gap-5 justify-start max-sm:justify-center">

            {/* Mobile menu button */}
             <IconButton aria-label="open menu" 
             onClick={() => setMobileOpen(true)} 
             className="md:hidden" 
             size="large">
              <MenuIcon />
            </IconButton>


            <NavLink to="/" className="flex flex-col items-center justify-center gap-1 no-underline">
            
              <img src={Logo} alt="Logo" className="w-8 h-8 rounded-full" />
              <span className="text-sky-600 font-semibold text-sm">Safarni</span>
            </NavLink>
          </div>
          <div className='nav-container'>
            <nav className="hidden md:flex justify-center">
              <ul className="flex gap-6">
                {links.map((l) => (
                  <li key={l.to}>
                    <NavLink
                      to={l.to}
                      className={({ isActive }) =>
                        `text-md ${isActive ? 'text font-bold text-black' : 'font-semibold text-black hover:text-sky-600'} no-underline`
                    }
                    >
                      {l.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>


            </div>

          <div className="flex items-center gap-2  justify-end max-sm:justify-center">
            <IconButton aria-label="search" onClick={() => setSearchOpen((s) => !s)} size="large">
              <SearchIcon />
            </IconButton>

            <IconButton aria-label="filters" size="large">
              <FilterListIcon />
            </IconButton>


            

              {/* avatar */}
            <div className="ml-1">
              {user?.avatarUrl ? (
                <Avatar alt={user.name} src={user.avatarUrl} sx={{ width: 32, height: 32 }} />
              ) : (
                <Avatar sx={{ width: 32, height: 32 }}>{user?.name ? user.name[0] : 'U'}</Avatar>
              )}
            </div>
          </div>



          
        </div>
      </div>


      <Drawer anchor="left" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box className="w-64" role="presentation">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2">
            
              <img src={Logo} alt="Logo" className="w-8 h-8 rounded-full" />
              <span className="text-sky-600 font-semibold">Safarni</span>
            </div>
            <IconButton onClick={() => setMobileOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div>

          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => { setSearchOpen(true); setMobileOpen(false); }}>
                <ListItemText primary="Search" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Filters" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </header>
  );
}