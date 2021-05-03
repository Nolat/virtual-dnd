import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Box, Stack } from "@chakra-ui/layout";
import { GetServerSideProps } from "next";
import { ClientSafeProvider, getProviders, signIn } from "next-auth/client";
import { FaGoogle } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";

const SignIn: React.FC<SignInProps> = ({ providers }) => {
  return (
    <Box height="100vh">
      <Stack justifyContent="center" alignItems="center" height="100vh" spacing={4}>
        {Object.values(providers).map((provider) => (
          <Box key={provider.name}>
            <Button onClick={() => signIn(provider.id, { callbackUrl: "http://localhost:3000" })}>
              <ProviderIcon name={provider.name} />
              Sign in with {provider.name}
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

const ProviderIcon = ({ name }) => {
  switch (name) {
    case "GitHub":
      return <Icon as={FiGithub} mr={2} />;

    case "Google":
      return <Icon as={FaGoogle} mr={2} />;

    default:
      return <></>;
  }
};

export default SignIn;

export const getServerSideProps: GetServerSideProps<SignInProps> = async () => {
  const providers = await getProviders();

  return {
    props: { providers }
  };
};

interface SignInProps {
  providers: Record<string, ClientSafeProvider>;
}
