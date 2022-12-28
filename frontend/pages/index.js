import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { createClient } from "next-sanity";

const inter = Inter({ subsets: ['latin'] })

export default function Home({ blogs, profile}) {
  const client = createClient({
    projectId: "p54nld84",
    dataset: "production",
    useCdn: false
  });
  console.log(blogs)
  return (
    <div>

    </div>
      
  );
}
export async function getServerSideProps(context) {
  const client = createClient({
    projectId: "p54nld84",
    dataset: "production",
    useCdn: false
  });
  const query = `*[_type == "post"]`;
  const blogs = await client.fetch(query);
  console.log(blogs)
  
  const profileQuery = `*[_type == "post"]`;
  const profile = await client.fetch(profileQuery);
  
  return {
    props: {
      blogs,
      profile
    }
  }
}