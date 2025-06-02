import React, { useContext } from "react";  
import { Box, Flex, Image, Icon, Badge } from "@chakra-ui/react";
import { ShopContext } from "@/context/shopContext";
import { MdMenu, MdShoppingBasket } from "react-icons/md";
import logo from "../assets/logo.png";

const NavBar = () => {
  const { openCart, openMenu, checkout } = useContext(ShopContext);

  const itemCount = checkout?.lines?.edges?.length || 0;

  return (
    <Flex
      background="#3C4C5D"
      flexDir="row"
      justifyContent="space-between"
      alignItems="center"
      p="1rem"
    >
      <Icon
        fill="white"
        cursor="pointer"
        as={MdMenu}
        h={30}
        w={30}
        onClick={() => openMenu()}
      />
      <Image src={logo} cursor="pointer" h="50px" w="50px" alt="Logo" />
      <Box position="relative">
        <Icon
          fill="white"
          cursor="pointer"
          as={MdShoppingBasket}
          h={30}
          w={30}
          onClick={() => openCart()}
        />
        {itemCount > 0 && (
          <Badge
            colorScheme="red"
            borderRadius="full"
            position="absolute"
            top="-1"
            right="-1"
            fontSize="0.7em"
          >
            {itemCount}
          </Badge>
        )}
      </Box>
    </Flex>
  );
};

export default NavBar;