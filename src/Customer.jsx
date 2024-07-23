import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { getSession } from './SessionService';
import { AddTask } from './tasks';
const TaskForm = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [taskCategory, setTaskCategory] = useState('');
    const [descriptions, setDescriptions] = useState('');
    const [project, setProject] = useState('');
    const [duration, setDuration] = useState('');

    const [errors, setErrors] = useState({
        employeeId: '',
        date: '',
        startTime: '',
        endTime: '',
        taskCategory: '',
        descriptions: '',
        project: '',
        duration: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        const storedUser = getSession();

        if (!storedUser) {
            navigate('/'); 
            return;
        }
    }, [navigate]);
    const validate = () => {
        let err = {};
        if (!employeeId) {
            err.employeeId = "Employee ID is required";
        }
        if (!date) {
            err.date = "Date is required";
        }
        if (!startTime) {
            err.startTime = "Start Time is required";
        }
        if (!endTime) {
            err.endTime = "End Time is required";
        }
        if (!taskCategory) {
            err.taskCategory = "Task Category is required";
        }
        if (!descriptions) {
            err.descriptions = "Descriptions is required";
        }
        if (!project) {
            err.project = "Project is required";
        }
        if (!duration) {
            err.duration = "Duration is required";
        }
        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const SaveorUpdateEmp = (e) => {
        e.preventDefault();

        if (validate()) {
            setLoading(true);
            const taskPayload = {
                employee: {
                    id: employeeId
                },
                date: date,
                startTime: startTime,
                endTime: endTime,
                taskCategory: taskCategory,
                description: descriptions,
                project: project,
                duration: duration
            };

            console.log(taskPayload);

            AddTask(taskPayload).then((response) => {
                setLoading(false);
                console.log(response.data);
                navigate('/emp');
            }).catch((error) => {
                setLoading(false);
                console.error(error);
            });
        }
    };

    const PageTitle = (id) => {
        return <h1 className='text-center mt-4'>{id ? 'Update Task' : 'Add Task'}</h1>;
    };
  
    return (
        <div className='container'>
            <div className='row w-75'>
                <div className='col-md-6 offset-md-3 offset-md-3 card mt-5'>
                    {PageTitle(id)}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label htmlFor='firstName'>Employee Id</label>
                                <input
                                    type='text'
                                    className={`form-control mb-2 ${errors.employeeId ? 'is-invalid' : ''}`}
                                    id='firstName'
                                    name='employeeId'
                                    value={employeeId}
                                    onChange={(e) => setEmployeeId(e.target.value)}
                                />
                                {errors.employeeId && <div className='invalid-feedback'>{errors.employeeId}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label htmlFor='firstName'>Date</label>
                                <input
                                    type='date'
                                    className={`form-control mb-2 ${errors.date ? 'is-invalid' : ''}`}
                                    id='firstName'
                                    name='date'
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                                {errors.date && <div className='invalid-feedback'>{errors.date}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label htmlFor='lastName'>Start Time</label>
                                <input
                                    type='time'
                                    className={`form-control mb-2 ${errors.startTime ? 'is-invalid' : ''}`}
                                    id='lastName'
                                    name='startTime'
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                />
                                {errors.startTime && <div className='invalid-feedback'>{errors.startTime}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label htmlFor='email'>End Time</label>
                                <input
                                    type='time'
                                    className={`form-control mb-2 ${errors.endTime ? 'is-invalid' : ''}`}
                                    id='email'
                                    name='endTime'
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                />
                                {errors.endTime && <div className='invalid-feedback'>{errors.endTime}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label htmlFor='email'>Task Category</label>
                                <input
                                    type='text'
                                    className={`form-control mb-2 ${errors.taskCategory ? 'is-invalid' : ''}`}
                                    id='email'
                                    placeholder='Provide specify the tasks'
                                    name='taskcategory'
                                    value={taskCategory}
                                    onChange={(e) => setTaskCategory(e.target.value)}
                                />
                                {errors.taskCategory && <div className='invalid-feedback'>{errors.taskCategory}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label htmlFor='email'>Descriptions</label>
                                <input
                                    type='text'
                                    className={`form-control mb-2 ${errors.descriptions ? 'is-invalid' : ''}`}
                                    id='email'
                                    placeholder='Descriptions'
                                    name='descriptions'
                                    value={descriptions}
                                    onChange={(e) => setDescriptions(e.target.value)}
                                />
                                {errors.descriptions && <div className='invalid-feedback'>{errors.descriptions}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label htmlFor='email'>Projects</label>
                                <input
                                    type='text'
                                    className={`form-control mb-2 ${errors.project ? 'is-invalid' : ''}`}
                                    id='email'
                                    placeholder='Provide specify the projects'
                                    name='projects'
                                    value={project}
                                    onChange={(e) => setProject(e.target.value)}
                                />
                                {errors.project && <div className='invalid-feedback'>{errors.project}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label htmlFor='email'>Durations</label>
                                <input
                                    type='text'
                                    className={`form-control mb-2 ${errors.duration ? 'is-invalid' : ''}`}
                                    id='email'
                                    placeholder='mention the timings'
                                    name='duration'
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                />
                                {errors.duration && <div className='invalid-feedback'>{errors.duration}</div>}
                            </div>
                            <button className='btn btn-outline-primary fw-bold mt-4 mb-3' onClick={SaveorUpdateEmp} disabled={loading}>
                                {loading ? <ClipLoader size={20} color={"#123abc"} loading={loading} /> : 'Submit'}
                            </button>
                            <button className='btn btn-outline-primary fw-bold mt-4 mb-3 float-end' onClick={()=>
                                {
                                    navigate('/emp');
                                }
                            }>
                                Back
                            </button>
                            <hr />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskForm;
