import { gql } from "@apollo/client";
import { marked } from 'marked';
import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import graphqlClient from "~/api/client";
import Tag from "~/components/Tag";
import { tagLinks } from "~/components/Tag/Tag";

export const links: LinksFunction = () => {
  return [...tagLinks()]
}
export const loader = async ({ params, request }: LoaderArgs) => {
  const { slug } = params;
  console.log(slug)
  const getPost = gql`
    query ($slug: String) {
      posts (filters: { slug: { eq: $slug }}) {
        data {
          id
          attributes {
            title
            summary
            content
            tags {
              data {
                attributes {
                  title
                  slug
                }
              }
            }
          }
        }
      }
    }
  `;

  const res = await graphqlClient(request).query({
    query: getPost, variables: {
      slug
    }
  });

  console.log(res.data.posts.data[0])


  return json({ post: res.data.posts.data[0] });
}
export default function Index() {
  const { post } = useLoaderData();
  const tags = post.attributes.tags.data;
  console.log(post)
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '8fr 4fr', gap: '2rem', padding: '2rem', overflowY: 'scroll' }}>
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4", marginTop: '4rem', background: "#fff", padding: "1rem" }}>
        <h1>{post.attributes.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: marked(post.attributes.content) }} />
      </div>
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4", width: "100%", marginTop: '4rem' }}>
        <div>
          <h4>Table of Contents</h4>
        </div>
        <hr />
        <div>
          <h4>Categories</h4>
          {tags.map((tag: any, index: number) => <Tag key={index} tag={tag} />)}
        </div>
        <hr />
        <div>
          <h4>More from this issue</h4>
        </div>
        <hr />
        <div>
          <h4>Share at Socials</h4>
        </div>
      </div>
    </div>
  )
}