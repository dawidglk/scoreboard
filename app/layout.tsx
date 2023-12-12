
import * as React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ThemeRegistry from './components/ThemeRegistry/ThemeRegistry';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';





export const metadata = {
  title: 'Next.js App Router + Material UI v5',
  description: 'Next.js App Router + Material UI v5',
};

const DRAWER_WIDTH = 240;

const LINKS = [
  { text: 'Informacje', href: '/', icon: HomeIcon },
  { text: 'Wyniki', href: '/score', icon: ChecklistIcon },
];




export default function RootLayout({ children }: { children: React.ReactNode }) {

 
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
        <AppBar component="nav">
        <Toolbar sx={{display:"flex",justifyContent:'space-between'}}>
          <Box>
            <SportsTennisIcon/>
         
          </Box>
        </Toolbar>
      </AppBar>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: 'background.default',
              mt: ['48px', '56px', '64px'],
              p: 3,
            }}
          >
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}