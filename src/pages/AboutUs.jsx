import React, { useContext } from "react";
import { ShopContext } from "@/context/shopContext";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const { aboutContent } = useContext(ShopContext);
  const navigate = useNavigate();

  console.log(aboutContent);

  return (
    <Box p="6">
      <Button mb="4" onClick={() => navigate(-1)}>
        ← Back
      </Button>
      <Heading mb="4">About Us</Heading>
      <Text dangerouslySetInnerHTML={{ __html: aboutContent }} />
    </Box>
  );
};

export default AboutUs;