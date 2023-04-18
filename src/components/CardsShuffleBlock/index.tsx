import { Box, chakra } from "@chakra-ui/react";
import _Image from "next/image";
import img1 from "@/assets/img1.png";
import img2 from "@/assets/img2.png";
import { motion } from "framer-motion";
import { useState } from "react";

const ChakraImage = chakra(_Image);
const Image = motion(ChakraImage);

const CardsShuffleBlock = () => {
  const [lastOnTop, setLastOnTop] = useState(true);

  return (
    <Box
      pos="relative"
      h="607px"
      w="1216px"
      mx="auto"
      mt="127px"
      sx={{ transformStyle: "preserve-3d" }}
    >
      <Image
        onClick={() => setLastOnTop((prev) => !prev)}
        src={img1}
        alt="image page"
        pos="absolute"
        whileHover={{ scale: 1.1 }}
        animate={
          lastOnTop
            ? {
                translateX: ["0px", "-250px", "-250px", "-180px", "0px"],
                translateZ: ["30px", "30px", "30px", "0px", "0px"],
                skewX: ["0deg", "0deg", "10deg", "10deg", "0deg"],
              }
            : {
                translateX: ["0px", "-250px", "-250px", "-160px", "0px"],
                translateZ: ["0px", "0px", "0px", "250px", "250px"],
              }
        }
        transition={{ duration: 1, times: [0, 0.3, 0.5, 0.7, 1] }}
      />
      <Image
        onClick={() => setLastOnTop((prev) => !prev)}
        src={img2}
        alt="image page"
        pos="absolute"
        bottom="0"
        right="0"
        whileHover={{ scale: 1.1 }}
        animate={
          lastOnTop
            ? {
                translateX: ["0px", "250px", "250px", "180px", "0px"],
                translateZ: ["0px", "0px", "0px", "30px", "30px"],
              }
            : {
                translateX: ["0px", "250px", "250px", "160px", "0px"],
                translateZ: ["30px", "30px", "30px", "0px", "0px"],
                skewX: ["0deg", "0deg", "-15deg", "-15deg", "0deg"],
              }
        }
        transition={{ duration: 1, times: [0, 0.3, 0.5, 0.7, 1] }}
      />
    </Box>
  );
};

export default CardsShuffleBlock;
