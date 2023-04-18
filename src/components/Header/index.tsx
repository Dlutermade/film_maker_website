import { Center, Heading } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import useScrollHidden from "./hooks/useScrollHidden";

const Header = () => {
  const { hidden } = useScrollHidden(300);

  return (
    <AnimatePresence>
      {!hidden && (
        <Center
          as={motion.header}
          pos="sticky"
          top="0"
          left="0"
          h="96px"
          initial={{ y: "-96px", opacity: 0 }}
          animate={{ y: "0px", opacity: 1 }}
          exit={{ y: "-96px", opacity: 0 }}
        >
          <Heading fontSize="40px" fontWeight="bold" fontStyle="italic">
            Film Maker
          </Heading>
        </Center>
      )}
    </AnimatePresence>
  );
};

export default Header;
