"use client";

import theme from "@/theme";
import {
  Bookmark,
  Event,
  Group,
  Home,
  Menu as MenuIcon,
  OndemandVideo,
  Person,
  Diversity3,
  Message,
  PersonAdd,
  Storefront,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const menuItems = [
  { text: "Home", icon: <Home />, path: "/" },
  { text: "Profile", icon: <Person />, path: "/profile" },
  { text: "People", icon: <Group />, path: "/people" },
  { text: "Watch", icon: <OndemandVideo />, path: "/watch" },
  { text: "Marketplace", icon: <Storefront />, path: "/marketplace" },
  { text: "Invitations", icon: <PersonAdd />, path: "/invitations" },
  { text: "Friends", icon: <Diversity3 />, path: "/friends" },
  { text: "Conversations", icon: <Message />, path: "/conversations" },
  // { text: "Groups", icon: <Group />, path: "/groups" },
  // { text: "Events", icon: <Event />, path: "/events" },
];

export default function LeftSidebar() {
  const router = useRouter();
  const pathName = usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isOpenDrawerMobile, setIsOpenDrawerMobile] = useState(false);

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleToggleDrawerMobile = () => {
    setIsOpenDrawerMobile(!isOpenDrawerMobile);
  };

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ overflow: "auto" }}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton onClick={() => router.push(item.path)}>
              <ListItemIcon>
                {/* <Home color='primary' /> */}
                {React.cloneElement(item.icon, {
                  color: pathName === item.path ? "primary" : "",
                })}
                {/* {item.icon} */}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {hydrated && isMobile && (
        <Toolbar
          sx={{
            position: "fixed",
            top: 0,
            left: -10,
            zIndex: 1000000,
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleToggleDrawerMobile}
            sx={{ mr: 2, color: "white" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      )}

      {/* Mobile */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            borderRight: 0,
            mt: 8,
          },
        }}
        open={isOpenDrawerMobile}
        onClose={handleToggleDrawerMobile}
      >
        {drawer}
      </Drawer>

      {/* Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            borderRight: 0,
            mt: 8,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
}
