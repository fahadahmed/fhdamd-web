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
  const getPost = gql`
    query ($slug: String) {
      posts (filters: { slug: { eq: $slug }}) {
        data {
          id
          attributes {
            title
            summary
            content
            coverImage {
              data {
                id
                attributes {
                  url
                }
              }
            }
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
  return json({ post: res.data.posts.data[0] });
}
export default function Index() {
  const { post } = useLoaderData();
  const tags = post.attributes.tags.data;
  console.log(post)
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '8fr 4fr', gap: '1rem', padding: '2rem' }}>
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4", background: "#fff" }}>
        <img src={post.attributes.coverImage?.data?.attributes?.url} alt="" width="100%" />
        <div style={{ padding: "0 1rem 1rem 1rem" }}>
          <h1 style={{ marginTop: "0" }}>{post.attributes.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: marked(post.attributes.content) }} />
        </div>

      </div>
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4", width: "100%" }}>
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