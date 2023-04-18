import { chakra, HStack } from "@chakra-ui/react";

import _Image from "next/image";

import HorizontalBlock_img1 from "@/assets/HorizontalBlock-img1.png";
import HorizontalBlock_img2 from "@/assets/HorizontalBlock-img2.png";
import HorizontalBlock_img3 from "@/assets/HorizontalBlock-img3.png";
import HorizontalBlock_img4 from "@/assets/HorizontalBlock-img4.png";
import HorizontalBlock_img5 from "@/assets/HorizontalBlock-img5.png";
import { useRef } from "react";
import useWheel from "./hooks/useWheel";

const imgList = [
  HorizontalBlock_img1,
  HorizontalBlock_img2,
  HorizontalBlock_img3,
  HorizontalBlock_img4,
  HorizontalBlock_img5,
];

const ChakraImage = chakra(_Image);

const HorizontalBlock = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useWheel(containerRef);

  return (
    <HStack
      h="100vh"
      gap="30px"
      px="30px"
      justify="center"
      align="center"
      overflowX="hidden"
      ref={containerRef}
    >
      {imgList.map((imgSrc, idx) => (
        <ChakraImage
          width="400px"
          height="800px"
          key={idx}
          src={imgSrc}
          alt="scape"
        />
      ))}
    </HStack>
  );
};

export default HorizontalBlock;
