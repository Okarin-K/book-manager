import Head from 'next/head'
import { Inter } from 'next/font/google'
import { Box, Button, Flex, Heading, Input, Image, Grid, GridItem } from '@chakra-ui/react'
import Link from 'next/link'
import useSWR from 'swr'
import { type } from 'os'
import { useState } from 'react'

type GoogleBook = {
  id: string,
  volumeInfo: {
    title: string,
    authors: string[],
    publishDate: string,
    industryIdentifiers: {
      type: "ISBN_10" | "ISBN_13",
      identifier: string
    }[],
    pageCount: number,
    imageLinks?: {
      smallThumbnail: string,
      thumbnail: string
    },
    language: string,
    previewLink: string,
  }
}

export default function Home() {
  const [url, setUrl] = useState<string>("https://www.googleapis.com/books/v1/volumes?q=%E3%81%AF%E3%82%89%E3%81%BA%E3%81%93%E3%81%82%E3%81%8A%E3%82%80%E3%81%97&maxResults=10")
  const {data, error, isLoading} = useSWR(url, 
    async (url) => {
      const res = await fetch(url)
      const data = await res.json()
      return data
    }
  );

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box width={"400px"} m={"24px auto"}>
          <Flex gap={"2"}>
            <Input onChange={(e) => {
              setUrl(`https://www.googleapis.com/books/v1/volumes?q=${encodeURI(e.target.value)}&maxResults=20`)
            }} placeholder='鬼滅の刃'></Input>
          </Flex>
        </Box>
        <Grid templateColumns='repeat(5, 1fr)' gap={6}>
            {isLoading && <div>loading...</div>}
            {error && <div>error...</div>}
            {data && data.items.map((item: GoogleBook) => {
              return (
                <GridItem key={item.id}>
                  <Heading size={"xs"}>{item.volumeInfo.title}</Heading>
                  <Link href={item.volumeInfo.previewLink} target='_blank'>
                    <Image src={item.volumeInfo.imageLinks?.thumbnail ?? ""} />
                  </Link>
                </GridItem>
              )
            })}
        </Grid>
      </main>
    </>
  )
}
