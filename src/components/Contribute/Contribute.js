import { GridItem, Heading } from '@chakra-ui/layout';
import { ExternalLinkIcon } from '@chakra-ui/icons'
import React from 'react'
import { Link, Divider } from "@chakra-ui/react"

function Contribute() {
    return (
        <GridItem
        colStart={[1, null, null, 2, null, null]}
        colSpan={[3, null, null, 1, null, null]}
        p={6}
      >
        <div>
        <Heading as="h1" mb={6}>
        Project Files and Contribute to Project
            </Heading>
        <Divider orientation="horizontal" />
            
            <p style={{
                margin: "10px",
            }}>
                You can download full project from <Link href="https://github.com/mertozler/MusicParty" isExternal>
                this  <ExternalLinkIcon mx="2px"/>
                </Link> github page.
                Also you can contribute to this project.
            </p>
        </div>
        </GridItem>

    )
}

export default Contribute;