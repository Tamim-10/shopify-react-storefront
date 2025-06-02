import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Image, Text, Badge, Heading, Container } from '@chakra-ui/react';
import { ShopContext } from '../context/shopContext';
import Hero from '../components/Hero';

const Home = () => {
  const { fetchAllProducts, products } = useContext(ShopContext);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  if (!products || products.length === 0) {
    return (
      <Box textAlign="center" py={20}>
        <Text fontSize="xl" color="gray.500">
          Loading products...
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      {/* Hero Carousel */}
      <Hero products={products} />

      {/* Product Grid Section */}
      <Container maxW="7xl" py={10}>
        <Heading mb={6} fontSize="2xl" fontWeight="bold" textAlign="center">
          Featured Products
        </Heading>

        <Grid
          templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
          gap={8}
        >
          {products.map((product) => {
            const imageUrl = product.images.edges[0]?.node.url;
            const altText = product.images.edges[0]?.node.altText || product.title;
            const variant = product.variants?.edges[0]?.node;
            const price = variant?.price?.amount || variant?.priceV2?.amount;
            const currency = variant?.price?.currencyCode || variant?.priceV2?.currencyCode;

            return (
              <Link key={product.id} to={`/products/${product.handle}`}>
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  boxShadow="md"
                  bg="white"
                  _hover={{ transform: 'scale(1.03)', boxShadow: 'xl' }}
                  transition="all 0.3s ease"
                >
                  <Image
                    src={imageUrl}
                    alt={altText}
                    height="280px"
                    width="100%"
                    objectFit="cover"
                  />
                  <Box p={4}>
                    <Text fontWeight="semibold" fontSize="lg" mb={2} noOfLines={2}>
                      {product.title}
                    </Text>
                    {price && (
                      <Badge colorScheme="teal" fontSize="md">
                        {currency} {price}
                      </Badge>
                    )}
                  </Box>
                </Box>
              </Link>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;  