import { gql } from "@apollo/client";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import graphqlClient from "~/api/client";

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
      <div>
        {posts.map((post: any) => (
          <Link key={post.id} to={`/${post.attributes.slug}`}>
            <h3>{post.attributes.title}</h3>
            <p>{post.attributes.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}