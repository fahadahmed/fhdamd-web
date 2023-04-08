import { gql } from "@apollo/client";
import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import graphqlClient from "~/api/client";
import { Card, cardLinks } from "~/components";

export const links: LinksFunction = () => {
  return [...cardLinks()]
}

export const loader = async ({ request }: LoaderArgs) => {
  const getLatestIssue = gql`
    query {
      issues (filters: { latest: { eq: true }}) {
        data {
          id
          attributes {
            name
            number
            description
            posts {
              data {
                id
                attributes {
                  title
                  summary
                  slug
                  Order
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
                      id
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
        }
      }
    }
  `;
  const res = await graphqlClient(request).query({ query: getLatestIssue });

  return json({ latestIssue: res.data.issues.data[0] });
}

export default function LatestIssue() {
  const { latestIssue } = useLoaderData();
  const posts = latestIssue.attributes.posts.data;
  return (
    <div className="issue-container" style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <div className="issue-title">
        <h1>{latestIssue.attributes.name}</h1>
      </div>
      <div className="posts-container" style={{ grid: latestIssue.attributes.description }}>
        {posts.map((post: any) => (
          // <div key={post.id} className="post" style={{ gridArea: `A${post.attributes.Order}` }}>
          //   <Link key={post.id} to={`/${post.attributes.slug}`}>
          //     <h3>{post.attributes.title}</h3>
          //     <p>{post.attributes.summary}</p>
          //   </Link>
          // </div>
          <div key={post.id} style={{ gridArea: `A${post.attributes.Order}`, display: 'grid' }}>
            <Card post={post} />
          </div>
        ))}
      </div>
    </div>
  )
}