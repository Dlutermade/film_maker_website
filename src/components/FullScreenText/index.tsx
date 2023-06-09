import { Center, Text } from "@chakra-ui/react";

type Props = {
  text: string[];
};

const FullScreenText = ({ text }: Props) => {
  return (
    <Center h="100vh">
      <Text
        fontSize="32px"
        lineHeight="40px"
        textAlign="center"
        fontWeight="bold"
        fontStyle="italic"
      >
        {text.map((item, idx) => (
          <span key={idx}>
            {item}
            <br />
          </span>
        ))}
      </Text>
    </Center>
  );
};

export default FullScreenText;
