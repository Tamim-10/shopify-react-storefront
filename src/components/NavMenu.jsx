import React, { useContext } from "react";
import { ShopContext } from "@/context/shopContext";
import {
  Box,
  Button,
  CloseButton,
  Drawer,
  Portal,
  Flex,
  Text,
  VStack,
  Link,
} from "@chakra-ui/react";

const NavMenu = () => {
  const { isMenuOpen, closeMenu } = useContext(ShopContext);

  return (
    <Drawer.Root open={isMenuOpen} onClose={closeMenu} placement="left">
      <Portal>
        <Drawer.Backdrop onClick={closeMenu} />
        <Drawer.Positioner>
          <Drawer.Content
            bg="white"
            maxW="300px"
            h="100vh"
            boxShadow="xl"
            borderRightRadius="md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <Drawer.CloseTrigger asChild>
              <CloseButton
                size="sm"
                onClick={closeMenu}
                position="absolute"
                top="4"
                right="4"
              />
            </Drawer.CloseTrigger>

            {/* Header */}
            <Drawer.Header borderBottomWidth="1px" py={4}>
              <Text fontSize="xl" fontWeight="bold" color="gray.700">
                Menu
              </Text>
            </Drawer.Header>

            {/* Body */}
            <Drawer.Body>
              <VStack align="start" spacing={5} mt={4}>
                <Link
                  href="/about-us"
                  fontSize="md"
                  fontWeight="medium"
                  color="gray.600"
                  _hover={{ color: "blue.500", textDecoration: "underline" }}
                >
                  About Us
                </Link>
                <Link
                  href="/"
                  fontSize="md"
                  fontWeight="medium"
                  color="gray.600"
                  _hover={{ color: "blue.500", textDecoration: "underline" }}
                >
                  Learn More
                </Link>
                {/* Add more menu items as needed */}
              </VStack>
            </Drawer.Body>

            {/* Footer */}
            <Drawer.Footer borderTopWidth="1px" pt={3} pb={4} justifyContent="center">
              <Text fontSize="xs" color="gray.500" textAlign="center">
                © {new Date().getFullYear()} tamimstores.myshopify.com
              </Text>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default NavMenu;