import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { Link } from 'react-router-dom';
// import { jobs } from "./fake-data";
import { jobQuery } from './graphql/queries';

const JobDetail = (props) => {
    const { jobId } = props.match.params;
    const { loading, error, data } = useQuery(jobQuery, {
        variables: { id: jobId },
    });
    const job = data ? data.job : null;

    if (!job) {
        return <h1>Empty Job</h1>;
    }
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    return (
        <div>
            <h1 className="title">{job.title}</h1>
            <h2 className="subtitle">
                <Link to={`/companies/${job.company.id}`}>
                    {job.company.name}
                </Link>
            </h2>
            <div className="box">{job.description}</div>
        </div>
    );
};

export default JobDetail;
