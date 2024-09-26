import React, { useContext } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Button,
  ChakraProvider,
  Portal,
} from "@chakra-ui/react";
import { user_dumy } from "../assets";
import { AuthContext } from "../contexts";
import { useNavigate } from "react-router-dom"; // Si usas react-router-dom

export const AvatarDropdown = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate(); // Usamos navigate para la redirección

  const handleMenuClick = () => {
    if (!isAuthenticated) {
      // Redirige a /auth si no está autenticado
      navigate("/auth");
    }
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded="full"
        variant="link"
        cursor="pointer"
        onClick={handleMenuClick} // Comprobamos autenticación al hacer clic
      >
        <Avatar size="md" src={user_dumy} />
      </MenuButton>
      {isAuthenticated && (
        // Si está autenticado, mostramos el menú desplegable
        <Portal>
          <MenuList>
            <MenuItem as="a" href="#">
              Profile
            </MenuItem>
            <MenuItem as="a" href="/calendars">
              Calendars
            </MenuItem>
            <MenuItem as="a" href="#">
              Settings
            </MenuItem>
            <MenuItem as="a" href="#">
              Logout
            </MenuItem>
          </MenuList>
        </Portal>
      )}
    </Menu>
  );
};
