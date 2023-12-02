import { Box, Flex } from "@chakra-ui/react"
import Link from "next/link"

export const Header = () => {
    return (
        <Box backgroundColor={"gray"} height={"5vh"}>
            <Flex gap={6} height={"100%"} alignItems={"center"}>
                <Box>
                    <h1>Book Manager</h1>
                </Box>
                <Box>
                    <Link href="/">Home</Link>
                </Box>
                <Box>
                    <Link href="/about">About</Link>
                </Box>
            </Flex>
        </Box>
    )
}