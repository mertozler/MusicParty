import React from 'react';
import { GridItem, Box, Flex, Text, Divider } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

const Nav = () => {
  const { user, logout } = useAuth();

  return (
    <GridItem colStart={1} colSpan={3} p={3}>
      <Flex>
        {user && (
          <>
            <Link to="/">
              <Text fontSize="md" mr={8}>
                Rooms
              </Text>
            </Link>
            <Link to="/create-room">
              <Text fontSize="md" mr={8}>
                Create Room
              </Text>
            </Link>
            <Link to="/contribute">
              <Text fontSize="md" mr={8}>
                Contribute
              </Text>
            </Link>
            <Box as="button" 
            onClick={logout}
            style = {{
              position: "absolute",
              right: "20px",
            }}
            >
              <Text fontSize="md" mr={8}>
                Logout
              </Text>
            </Box>
          </>
        )}
        {!user && (
          <Link to="/login">
            <Text fontSize="md" mr={8}>
              Login
            </Text>
          </Link>
        )}
      </Flex>
      <Divider orientation="horizontal" />

    </GridItem>
  );
};

export default Nav;
