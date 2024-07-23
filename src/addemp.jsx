import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { AddEmployee, GetEmployee, UpdateEmployee } from './Employeeservice';
import { getSession } from './SessionService';

const Addemp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role:'',
    });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    const validate = () => {
        let err = {};

        if (!firstName) {
            err.firstName = "First Name is required";
        }
        if (!lastName) {
            err.lastName = "Last Name is required";
        }
        if (!email) {
            err.email = "Email is required";
        }
        if (!role) {
            err.role = "Role is required";
        }
        setErrors(err);
        return Object.keys(err).length === 0;
    }

    useEffect(() => {
        const storedUser = getSession();

        if (!storedUser) {
            navigate('/');
            return;
        }
        if (id) {
            GetEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setRole(response.data.role);
            }).catch((error) => {
                console.error(error);
            })
        }

    }, [id, navigate])

    const SaveorUpdateEmp = (e) => {
        e.preventDefault();

        if (validate()) {
            setLoading(true);
            const emp = { firstName, lastName, email, role };
            console.log(emp);
            if (id) {
                UpdateEmployee(id, emp).then((response) => {
                    console.log(response.data);
                    setLoading(false);
                    navigate('/emp');
                }).catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
            } else {
                AddEmployee(emp).then((response) => {
                    console.log(response.data);
                    setLoading(false);
                    navigate('/emp');
                }).catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
            }
        }
    };

    function PageTitle(id) {
        if (id) {
            return <h1 className='text-center mt-4'>Update Employee</h1>
        } else {
            return <h1 className='text-center mt-4'>Add Employee</h1>
        }
    }

    return (
        <div className='container mt-5'>
            <div className='row mt-5 w-75'>
                <div className='col-md-6 offset-md-3 offset-md-3 card mt-5'>
                    {PageTitle(id)}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label htmlFor='firstName'>First Name</label>
                                <input
                                    type='text'
                                    className={`form-control mb-2 ${errors.firstName ? 'is-invalid' : ''}`}
                                    id='firstName'
                                    placeholder='Enter First Name'
                                    name='firstName'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label htmlFor='lastName'>Last Name</label>
                                <input
                                    type='text'
                                    className={`form-control mb-2 ${errors.lastName ? 'is-invalid' : ''}`}
                                    id='lastName'
                                    placeholder='Enter Last Name'
                                    name='lastName'
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label htmlFor='email'>Email</label>
                                <input
                                    type='email'
                                    className={`form-control mb-2 ${errors.email ? 'is-invalid' : ''}`}
                                    id='email'
                                    placeholder='Enter Email Address'
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label htmlFor='role'>Role</label>
                                <input
                                    type='text'
                                    className={`form-control mb-2 ${errors.role ? 'is-invalid' : ''}`}
                                    id='role'
                                    placeholder='Provide your Role'
                                    name='role'
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                {errors.role && <div className='invalid-feedback'>{errors.role}</div>}
                            </div>
                            <button className='btn btn-outline-primary fw-bold mt-4 mb-3' onClick={SaveorUpdateEmp} disabled={loading}>
                                {loading ? <ClipLoader size={20} color={"#123abc"} loading={loading} /> : 'Submit'}
                            </button>
                            <button className='btn btn-outline-primary fw-bold mt-4 mb-3 float-end' onClick={() => { navigate('/emp'); }}>
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

export default Addemp;
