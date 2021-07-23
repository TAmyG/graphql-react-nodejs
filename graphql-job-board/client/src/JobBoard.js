import React from 'react';
import { JobList } from './JobList';
import { useJobForm } from './hooks/useJobForm';

const JobBoard = () => {
    //const { data } = useQuery(jobsQuery, { fetchPolicy: 'no-cache' });
    //const jobs = data ? data.jobs : [];
    const { jobs } = useJobForm();

    return (
        <div>
            <h1 className="title">Job Board</h1>
            <JobList jobs={jobs} />
        </div>
    );
};

export default JobBoard;
