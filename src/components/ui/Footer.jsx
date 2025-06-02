import React from 'react';
import {
  Box,
  Flex,
  Text,
  Link,
  Stack,
  IconButton,
} from '@chakra-ui/react';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <Box bg="#1a202c" color="gray.200" mt={12}>
      <Box maxW="7xl" mx="auto" py={10} px={{ base: 4, md: 8 }}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'flex-start', md: 'center' }}
          gap={8}
          flexWrap="wrap"
        >
          {/* Logo / Brand */}
          <Box>
            <Text fontSize="xl" fontWeight="bold">Tamim Stores</Text>
            <Text fontSize="sm" color="gray.400">
              Elevate your lifestyle
            </Text>
          </Box>

          {/* Navigation Links */}
          <Stack direction={{ base: 'column', md: 'row' }} spacing={6}>
            <Link href="/" _hover={{ color: 'white' }}>Home</Link>
            <Link href="/products" _hover={{ color: 'white' }}>Shop</Link>
            <Link href="/about" _hover={{ color: 'white' }}>About</Link>
            <Link href="/contact" _hover={{ color: 'white' }}>Contact</Link>
          </Stack>

          {/* Social Media Icons */}
          <Stack direction="row" spacing={4}>
            <IconButton
              as="a"
              href="https://facebook.com"
              aria-label="Facebook"
              icon={<FaFacebook />}
              variant="ghost"
              color="gray.400"
              _hover={{ color: 'white' }}
            />
            <IconButton
              as="a"
              href="https://instagram.com"
              aria-label="Instagram"
              icon={<FaInstagram />}
              variant="ghost"
              color="gray.400"
              _hover={{ color: 'white' }}
            />
            <IconButton
              as="a"
              href="https://twitter.com"
              aria-label="Twitter"
              icon={<FaTwitter />}
              variant="ghost"
              color="gray.400"
              _hover={{ color: 'white' }}
            />
            <IconButton
              as="a"
              href="https://linkedin.com"
              aria-label="LinkedIn"
              icon={<FaLinkedin />}
              variant="ghost"
              color="gray.400"
              _hover={{ color: 'white' }}
            />
          </Stack>
        </Flex>

        {/* Footer Bottom */}
        <Box mt={10} textAlign="center">
          <Text fontSize="sm" color="gray.500">
            &copy; {new Date().getFullYear()} Tamim Stores. All rights reserved.
          </Text>
          <Stack direction="row" justify="center" mt={2} spacing={4}>
            <Link href="/privacy" fontSize="sm" _hover={{ color: 'white' }}>Privacy Policy</Link>
            <Link href="/terms" fontSize="sm" _hover={{ color: 'white' }}>Terms of Service</Link>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;