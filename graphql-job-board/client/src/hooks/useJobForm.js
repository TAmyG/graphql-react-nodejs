import { useMutation, useQuery } from '@apollo/react-hooks';
import { createJobMutation, jobQuery, jobsQuery } from '../graphql/queries';

export const useJobForm = () => {
    const { data } = useQuery(jobsQuery, { fetchPolicy: 'no-cache' });
    const jobs = data ? data.jobs : [];
    const [createJob] = useMutation(createJobMutation, {
        update: (cache, { data }) => {
            cache.writeQuery({
                query: jobQuery,
                variables: { id: data.job.id },
                data,
            });
        },
    });

    return {
        jobs,
        createJob: (title, description) =>
            createJob({
                variables: { input: { title, description } },
            }),
    };
};
