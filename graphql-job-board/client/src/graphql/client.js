import {
    ApolloClient,
    ApolloLink,
    HttpLink,
    InMemoryCache,
} from 'apollo-boost';
import { getAccessToken, isLoggedIn } from '../auth';

const endpointURL = 'http://localhost:9000/graphql';

const authLink = new ApolloLink((operation, forward) => {
    if (isLoggedIn()) {
        operation.setContext({
            headers: {
                authorization: `Bearer ${getAccessToken()}`,
            },
        });
    }
    return forward(operation);
});

export const client = new ApolloClient({
    link: ApolloLink.from([authLink, new HttpLink({ uri: endpointURL })]),
    cache: new InMemoryCache(),
});
