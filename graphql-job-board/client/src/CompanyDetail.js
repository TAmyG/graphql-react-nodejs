import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { JobList } from './JobList';
import { companyQuery } from './graphql/queries';

// import { companies } from './fake-data';

const CompanyDetail = (props) => {
    const { companyId } = props.match.params;
    const { data, loading, error } = useQuery(companyQuery, {
        variables: { id: companyId },
    });
    const company = data ? data.company : null;

    if (!company) {
        return null;
    }
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <div>
            <h1 className="title">{company.name}</h1>
            <div className="box">{company.description}</div>
            {/* NEW added */}
            <h1 className="title is-5">Jobs at {company.name}</h1>
            <JobList jobs={company.jobs} />
        </div>
    );
};

export default CompanyDetail;
