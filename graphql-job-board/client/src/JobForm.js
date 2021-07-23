import React from 'react';
import { useForm } from './hooks/useForm';
import { useJobForm } from './hooks/useJobForm';

const JobForm = (props) => {
    const [formValues, handleInputChange] = useForm({
        title: '',
        description: '',
    });
    const { title, description } = formValues;
    const { createJob } = useJobForm();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {
            data: { job },
        } = await createJob(title, description);
        props.history.push(`/jobs/${job.id}`);
    };

    return (
        <div>
            <h1 className="title">New Job</h1>
            <div className="box">
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label className="label">Title</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                name="title"
                                value={title}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Description</label>
                        <div className="control">
                            <textarea
                                className="input"
                                style={{ height: '10em' }}
                                name="description"
                                value={description}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className="button is-link">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobForm;
