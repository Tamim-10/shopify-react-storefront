import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/shopContext';
import {
  Box,
  Button,
  Grid,
  Image,
  Heading,
  Text,
  Flex,
  Skeleton,
} from '@chakra-ui/react';

const ProductPage = () => {
  const { fetchProductWithHandle, product, addItemToCheckout } = useContext(ShopContext);
  const { handle } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (handle) {
      fetchProductWithHandle(handle);
    }
  }, [handle]);

  if (!product || Object.keys(product).length === 0) {
    return <Skeleton height="80vh" />;
  }

  const variant = product.variants.edges[0].node;

  return (
    <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }} py={{ base: 8, md: 12 }}>
      <Button
        mb={6}
        onClick={() => navigate('/')}
        colorScheme="gray"
        variant="outline"
        size="sm"
      >
        ← Back to Home
      </Button>

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={{ base: 10, md: 16 }}
        alignItems="center"
      >
        {/* Product Image */}
        <Box textAlign="center">
          <Image
            src={product.images.edges[0].node.originalSrc}
            alt={product.title}
            borderRadius="lg"
            boxShadow="lg"
            maxW={{ base: "100%", sm: "400px", md: "500px" }}
            mx="auto"
            _hover={{ transform: "scale(1.03)", transition: "all 0.3s ease" }}
          />
        </Box>

        {/* Product Info */}
        <Flex direction="column" justify="center" gap={6}>
          <Heading fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} color="gray.800">
            {product.title}
          </Heading>

          <Text fontSize={{ base: "lg", md: "xl" }} color="gray.700" fontWeight="semibold">
            {variant.price.currencyCode} {variant.price.amount}
          </Text>

          <Text fontSize={{ base: "sm", md: "md" }} color="gray.600" lineHeight="1.8">
            {product.description}
          </Text>

          <Button
            size="lg"
            bg="gray.800"
            color="white"
            width={{ base: "full", sm: "auto" }}
            _hover={{ bg: "gray.700" }}
            _active={{ bg: "gray.900" }}
            borderRadius="md"
            boxShadow="md"
            onClick={() => addItemToCheckout(variant.id, 1)}
          >
            Add to Cart
          </Button>
        </Flex>
      </Grid>
    </Box>
  );
};

export default ProductPage;