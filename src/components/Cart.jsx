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
  Image,
  HStack,
} from "@chakra-ui/react";

const Cart = () => {
  const {
    isCartOpen,
    closeCart,
    checkout,
    removeLineItem,
    updateLineItemQuantity,
  } = useContext(ShopContext);

  const drawerBg = "white";
  const textColor = "gray.700";

  return (
    <Drawer.Root open={isCartOpen} onClose={closeCart}>
      <Portal>
        <Drawer.Backdrop onClick={closeCart} />
        <Drawer.Positioner>
          <Drawer.Content
            bg={drawerBg}
            borderLeftRadius="lg"
            boxShadow="2xl"
            maxW="400px"
            onClick={(e) => e.stopPropagation()}
          >
            <Drawer.Header borderBottomWidth="1px">
              <Text fontSize="lg" fontWeight="bold" color={textColor}>
                Your Shopping Cart
              </Text>
            </Drawer.Header>

            <Drawer.Body>
              {checkout?.lines?.edges?.length > 0 ? (
                <Box display="flex" flexDirection="column" gap="4">
                  {checkout.lines.edges.map((item) => {
                    const { node } = item;
                    const { id: lineId, quantity, merchandise } = node;

                    return (
                      <Flex
                        key={lineId}
                        borderWidth="1px"
                        borderRadius="md"
                        p="3"
                        gap="3"
                        align="center"
                        boxShadow="sm"
                      >
                        <CloseButton
                          size="sm"
                          onClick={() => removeLineItem(lineId)}
                          color="gray.500"
                        />
                        <Image
                          src={merchandise.image?.url}
                          boxSize="60px"
                          objectFit="cover"
                          borderRadius="md"
                          alt={merchandise.product?.title || "Product Image"}
                        />
                        <Box flex="1">
                          <Text fontWeight="semibold" fontSize="sm" color={textColor}>
                            {merchandise.product?.title || "Product"}
                          </Text>
                          {merchandise?.price ? (
                            <Text fontSize="xs" color="gray.500">
                              {merchandise.price.currencyCode} {merchandise.price.amount}
                            </Text>
                          ) : (
                            <Text fontSize="xs" color="red.400">Price unavailable</Text>
                          )}

                          <HStack spacing={2} mt={1}>
                            <Button
                              size="xs"
                              onClick={() => {
                                if (quantity > 1) {
                                  updateLineItemQuantity(lineId, quantity - 1);
                                }
                              }}
                            >
                              -
                            </Button>
                            <Text fontSize="sm">{quantity}</Text>
                            <Button
                              size="xs"
                              onClick={() => updateLineItemQuantity(lineId, quantity + 1)}
                            >
                              +
                            </Button>
                          </HStack>
                        </Box>
                      </Flex>
                    );
                  })}
                </Box>
              ) : (
                <Box textAlign="center" mt="6">
                  <Text color="gray.500" fontSize="md">
                    Your cart is empty
                  </Text>
                </Box>
              )}
            </Drawer.Body>

            {checkout?.lines?.edges?.length > 0 && (
              <Drawer.Footer borderTopWidth="1px" mt="4">
                <Button
                  as="a"
                  href={checkout.checkoutUrl}
                  bg="black"
                  color="white"
                  _hover={{ bg: "gray.700" }}
                  w="full"
                  fontWeight="bold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Proceed to Checkout
                </Button>
              </Drawer.Footer>
            )}

            <Drawer.CloseTrigger asChild>
              <CloseButton
                size="sm"
                onClick={closeCart}
                position="absolute"
                top="3"
                right="3"
              />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default Cart;