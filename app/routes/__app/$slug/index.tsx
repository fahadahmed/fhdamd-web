import { gql } from "@apollo/client";
import { marked } from 'marked';
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import graphqlClient from "~/api/client";

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

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4", width: "100%" }}>
      <h1>{post.attributes.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: marked(post.attributes.content) }} />
    </div>
  )
}