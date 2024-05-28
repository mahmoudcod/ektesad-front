import Vue from 'vue';
import { ApolloLink, execute, makePromise, split } from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { onError } from 'apollo-link-error';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

export default ({ app, store }) => {
  const uri = process.env.GRAPH_BASE;
  const batchLink = new BatchHttpLink({ uri });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }
    if (networkError) console.error(`[Network error]: ${networkError}`);
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext();
    return forward(operation);
  });
  // Http link
  const httpLink = errorLink.concat(authMiddleware.concat(batchLink));

  // WS link
  // const wsLink = process.browser
  //   ? new WebSocketLink({
  //       uri: process.env.SUBSCRIPTION_BASE,
  //       options: {
  //         reconnect: true
  //       }
  //     })
  //   : null;

  // const link = process.browser
  //   ? split(
  //       ({ query }) => {
  //         const { kind, operation } = getMainDefinition(query);
  //         return kind === 'OperationDefinition' && operation === 'subscription';
  //       },
  //       wsLink,
  //       httpLink
  //     )
  //   : httpLink;

  const client = {
    query({ query, variables = {} } = {}) {
      return makePromise(execute(httpLink, { query, variables }));
    },
    mutate({ mutation, variables = {} } = {}) {
      return makePromise(execute(httpLink, { query: mutation, variables }));
    }
    // subscripe({ subscription, variables = {} } = {}) {
    //   return execute(link, { query: subscription, variables });
    // }
  };

  Vue.prototype.$client = client;
  app.$client = client;
  Vue.$client = client;
};
