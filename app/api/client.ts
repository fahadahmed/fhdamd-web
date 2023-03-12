import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client';

const graphqlClient = (request: Request) => {
  const link = createHttpLink({
    uri: process.env.GRAPHQL_URL,
    credentials: 'same-origin',
    // @ts-ignore
    headers: {
      ...request.headers,
      authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
    },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    ssrMode: true,
    // link: from([errorLink, link]),
    link: from([link]),
  });
};

export default graphqlClient;
