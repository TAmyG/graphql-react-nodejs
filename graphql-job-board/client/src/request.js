import {
  ApolloClient,
  ApolloLink,
  gql,
  HttpLink,
  InMemoryCache,
} from "apollo-boost";
import { getAccessToken, isLoggedIn } from "./auth";

const endpointURL = "http://localhost:9000/graphql";
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
const client = new ApolloClient({
  link: ApolloLink.from([authLink, new HttpLink({ uri: endpointURL })]),
  cache: new InMemoryCache(),
});
// GRAPHQL Query-----------------------
const jobDetailFragment = gql`
  fragment JobDetail on Job {
    id
    title
    description
    company {
      id
      name
    }
  }
`;

const createJobMutation = gql`
  mutation CreateJob($input: CreateJobInput) {
    job: createJob(input: $input) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

const companyQuery = gql`
  query CompanyQuery($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        title
      }
    }
  }
`;

const jobQuery = gql`
  query JobQuery($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

const jobsQuery = gql`
  query JobsQuery {
    jobs {
      id
      title
      company {
        id
        name
      }
    }
  }
`;
// GRAPHQL Query ends here-----------------------
/* const graphqlRequest = async (query, variables) => {
  const request = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
  };

  if (isLoggedIn()) {
    request.headers["authorization"] = `Bearer ${getAccessToken()}`;
  }
  const response = await fetch(endpointURL, request);
  const responseBody = await response.json();

  if (responseBody.errors) {
    const message = responseBody.errors
      .map((error) => error.message)
      .join("\n");
    throw new Error(message);
  }
  return responseBody.data;
}; */

const loadJobs = async () => {
  const {
    data: { jobs },
  } = await client.query({ query: jobsQuery, fetchPolicy: "no-cache" });
  //const { jobs } = await graphqlRequest(query);
  return jobs;
};

const loadJob = async (id) => {
  const {
    data: { job },
  } = await client.query({ query: jobQuery, variables: { id } });
  // const { job } = await graphqlRequest(query, { id });
  return job;
};

const loadCompany = async (id) => {
  const {
    data: { company },
  } = await client.query({ query: companyQuery, variables: { id } });
  // const { company } = await graphqlRequest(query, { id });
  return company;
};

const createJob = async (input) => {
  const {
    data: { job },
  } = await client.mutate({
    mutation: createJobMutation,
    variables: { input },
    update: (cache, { data }) => {
      cache.writeQuery({
        query: jobQuery,
        variables: { id: data.job.id },
        data,
      });
    },
  });
  // const { job } = await graphqlRequest(mutation, { input });
  return job;
};

export { loadJobs, loadJob, loadCompany, createJob };
