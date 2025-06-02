import React from 'react';  
import { Link } from 'react-router-dom';
import { Box, Image, Text, Badge } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Hero = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text fontSize="lg" color="gray.500">
          Loading...
        </Text>
      </Box>
    );
  }

  return (
    <Box
      maxW="1200px"
      mx="auto"
      py={10}
      px={{ base: 4, md: 6 }}
      position="relative"
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        breakpoints={{
          480: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        style={{ paddingBottom: 50 }}
      >
        {products.map((product) => {
          const imageUrl = product.images.edges[0]?.node.url;
          const price =
            product.variants?.edges[0]?.node.price?.amount ?? null;
          const currency =
            product.variants?.edges[0]?.node.price?.currencyCode ?? '';
          return (
            <SwiperSlide
              key={product.id}
              style={{ display: 'flex', justifyContent: 'center', flexShrink: 0 }}
            >
              <Link to={`/products/${product.handle}`}>
                <Box
                  role="group"
                  cursor="pointer"
                  borderRadius="xl"
                  overflow="hidden"
                  boxShadow="md"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: 'scale(1.05)',
                    boxShadow: 'xl',
                  }}
                  bg="white"
                  maxW={{ base: '100%', md: '300px' }}
                  width="100%"
                  display="flex"
                  flexDirection="column"
                  minHeight="420px"
                >
                  <Box
                    position="relative"
                    overflow="hidden"
                    height={{ base: '250px', md: '300px' }}
                    flexShrink={0}
                  >
                    <Image
                      src={imageUrl}
                      alt={product.title}
                      objectFit="cover"
                      width="100%"
                      height="100%"
                      transition="transform 0.4s ease"
                      _groupHover={{ transform: 'scale(1.1)' }}
                      loading="lazy"
                      borderTopRadius="xl"
                    />
                  </Box>

                  <Box p={4} bg="gray.50" flexGrow={1} display="flex" flexDirection="column" justifyContent="space-between">
                    <Text
                      fontWeight="bold"
                      fontSize="lg"
                      isTruncated
                      mb={2}
                      color="gray.800"
                    >
                      {product.title}
                    </Text>
                    {price && (
                      <Badge
                        colorScheme="teal"
                        fontSize="md"
                        fontWeight="semibold"
                        alignSelf="flex-start"
                        px={3}
                        py={1}
                        borderRadius="md"
                      >
                        {currency} {price}
                      </Badge>
                    )}
                  </Box>
                </Box>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default Hero;