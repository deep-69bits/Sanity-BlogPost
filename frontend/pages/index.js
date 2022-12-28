import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import PortableText from "react-portable-text";
const inter = Inter({ subsets: ["latin"] });

export default function Home({ blogs, profile }) {
  const client = createClient({
    projectId: "p54nld84",
    dataset: "production",
    useCdn: false,
  });
  const builder = imageUrlBuilder(client);
  function urlFor(source) {
    return builder.image(source);
  }
  console.log(blogs);
  return (
    <div>

      {blogs.map((item) => {
  
        return (
           
          <div key={item.slug} className="shadow-2xl ml-10 mt-10 rounded-2xl p-2 cursor-pointer hover:scale-105 transition  inline-block w-[400px] ">
            <h1 className="font-bold text-2xl mt-2 mb-3">{item.title}</h1>
            <img className="h-[200px] w-[400px]"  src={urlFor(item.mainImage).width(400).url()} />
           <div className="mt-3 mb-2">
          
            {profile.map((X) => {
              if (item.author._ref == X._id) {
                return (
                  <div>
                  <img className="inline-block rounded-full " src={urlFor(X.image).width(50).url()} />
                  <h2 className="inline-block font-semibold">{X.name}</h2>
                  </div>
                );
              }
            })}
            </div>
            <PortableText
            content={item.content}
            serializers={{
              h1: (props) => <h1 style={{ color: "red" }} {...props} />,
              li: ({ children }) => (
                <li className="special-list-item">{children}</li>
                ),
                someCustomType: item.content,
              }}
            />

          </div>
        );
      })}
    </div>
  );
}
export async function getServerSideProps(context) {
  const client = createClient({
    projectId: "p54nld84",
    dataset: "production",
    useCdn: false,
  });
  const query = `*[_type == "post"]`;
  const profileQuery = `*[_type == "author"]`;
  const profile = await client.fetch(profileQuery);
  const blogs = await client.fetch(query);
  console.log(blogs.author);
  console.log(blogs.profile);

  return {
    props: {
      blogs,
      profile,
    },
  };
}
