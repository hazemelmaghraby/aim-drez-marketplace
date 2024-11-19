import React from 'react';
import { Button, Box, Text } from '@chakra-ui/react';

const Chakra = () => {
    return (
        <>
            <Box p={5}>
                <Text fontSize="xl" mb={4}>
                    Welcome to Chakra UI with Vite!
                </Text>
                <Button colorScheme="teal">Click Me</Button>
            </Box>
        </>)
}

export default Chakra;