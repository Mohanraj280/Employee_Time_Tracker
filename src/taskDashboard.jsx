import axios from 'axios';
import 'chart.js/auto';
import { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { Bar, Pie } from 'react-chartjs-2';
import { useNavigate, useParams } from 'react-router-dom';
import { getSession, removeSession } from './SessionService';
import './TaskDashBoard.css';
import { deleteTask } from './tasks';
const TaskDashBoard = () => {
    const [empTasks, setEmpTasks] = useState([]);
    const [dailyData, setDailyData] = useState({});
    const [weeklyData, setWeeklyData] = useState({});
    const [monthlyData, setMonthlyData] = useState({});
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);


    useEffect(() => {
        const storedUser = getSession();

        if (!storedUser) {
            navigate('/');
            return;
        }

        setIsAdmin(storedUser.role === 'ADMIN');
        getAllTasks(storedUser);
    }, [navigate]);

   
    const { id } = useParams();

    const getAllTasks = (user) => {
        let url = 'http://localhost:8080/mohan/tasks/allTasks';
        if (user.role === 'EMPLOYEE') {
            url = `http://localhost:8080/mohan/tasks/employee/${user.id}`;
        }
        if (id) {
            url = `http://localhost:8080/mohan/tasks/employee/${id}`;
      
        }
      
      
        axios.get(url)
            .then((response) => {
                const tasks = response.data;
                setEmpTasks(tasks);
                aggregateData(tasks);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const aggregateData = (tasks) => {
        const daily = {};
        const weekly = {};
        const monthly = {};

        tasks.forEach((task) => {
            const date = new Date(task.date);
            const week = `${date.getFullYear()}-${date.getWeek()}`;
            const month = `${date.getFullYear()}-${date.getMonth() + 1}`;
            const hours = parseFloat(task.duration);

            // Aggregate daily data
            if (!daily[task.employee.id]) {
                daily[task.employee.id] = 0;
            }
            daily[task.employee.id] += hours;

            // Aggregate weekly data
            if (!weekly[task.employee.id]) {
                weekly[task.employee.id] = {};
            }
            if (!weekly[task.employee.id][week]) {
                weekly[task.employee.id][week] = 0;
            }
            weekly[task.employee.id][week] += hours;

            // Aggregate monthly data
            if (!monthly[task.employee.id]) {
                monthly[task.employee.id] = {};
            }
            if (!monthly[task.employee.id][month]) {
                monthly[task.employee.id][month] = 0;
            }
            monthly[task.employee.id][month] += 1; // Counting tasks
        });

        setDailyData(daily);
        setWeeklyData(weekly);
        setMonthlyData(monthly);
    };

    const logout = () => {
        removeSession();
        navigate('/');
    };

    const deleteTasks = (taskId) =>{
     const user = getSession();
            deleteTask(taskId)
            .then((response) => {
                getAllTasks(user);
            })
            .catch((error) => {
              console.error(error);
            });
        
    }

    const updateTaskStatus = (taskId, newStatus) => {
        const user = getSession();

        if (user.role !== 'EMPLOYEE') {
            alert("Only Employees can update their tasks");
            return;
        }

        const url = `http://localhost:8080/mohan/tasks/tasks/updateStatus/${taskId}`;
        axios.put(url, { status: newStatus })
            .then((response) => {
                setEmpTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === taskId ? { ...task, status: newStatus } : task
                    )
                );
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getPieChartData = () => {
        return {
            labels: Object.keys(dailyData),
            datasets: [{
                label: 'Daily Working Hours',
                data: Object.values(dailyData),
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#36a2eb', '#f96384'],
            }]
        };
    };

    const getBarChartData = (data, label) => {
        const labels = [...new Set(Object.values(data).flatMap(Object.keys))];
        const datasets = Object.entries(data).map(([employeeId, periods]) => {
            return {
                label: `Employee ${employeeId}`,
                data: labels.map(period => periods[period] || 0),
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#36a2eb', '#ff6384'],
            };
        });

        return {
            labels,
            datasets
        };
    };

    return (
        <Container className='task-dashboard'>
            <h1 className='text-center mt-4 mb-5'>
                Task Dashboard
                {isAdmin && (
                    <button
                        className='btn btn-outline-primary fw-bold mt-4 mb-3 float-end'
                        onClick={() => {
                            navigate('/emp');
                        }}
                    >
                        Back
                    </button>
                )}
                {!isAdmin && (
                    <button
                        className='btn btn-outline-primary fw-bold mt-4 mb-3 float-end'
                        onClick={logout}
                    >
                        Logout
                    </button>
                )}
            </h1>
          
            <div className='task-list'>
                {empTasks.map((task, index) => (
                    <Card key={index} className='task-card mb-3'>
                        <Card.Body>
                            <Card.Title>{task.taskCategory}</Card.Title>
                            <Card.Subtitle className='mb-2 text-muted'>{task.project}</Card.Subtitle>
                            <Card.Text>
                                <strong>Employee ID:</strong> {task.employee?.id || 'N/A'} <br />
                                <strong>Employee Name:</strong> {task.employee?.firstName || 'N/A'} <br />
                                <strong>Date:</strong> {task.date || 'N/A'} <br />
                                <strong>Start Time:</strong> {task.startTime || 'N/A'} <br />
                                <strong>End Time:</strong> {task.endTime || 'N/A'} <br />
                                <strong>Description:</strong> {task.description || 'N/A'} <br />
                                <strong>Duration:</strong> {task.duration || 'N/A'}
                            </Card.Text>
                            <Button
                                variant={task.status === 'COMPLETED' ? 'success' : 'danger'}
                                onClick={() => updateTaskStatus(task.id, 'COMPLETED')}
                                disabled={task.status === 'COMPLETED'}
                            >
                                {task.status === 'COMPLETED' ? 'Completed' : 'In Progress'}
                            </Button>
                            {isAdmin && (
                    <button
                         className='btn btn-outline-danger fw-bold float-end p-2'
                        onClick={() => deleteTasks(task.id)}
                    >
                        Del
                    </button>
                )}
                        </Card.Body>
                    </Card>
                ))}
            </div>
            <br></br>
            <hr></hr>
            <div className='charts mt-5'>
                <h2 className='text-center'>Daily Working Hours</h2>
                <div className='chart-container mb-5'>
                    <Pie data={getPieChartData()} width={200} height={200} />
                </div>

                <hr></hr>
                <h2 className='text-center mt-5'>Weekly Working Hours</h2>
                <div className='chart-container mt-5'>
                    <Bar data={getBarChartData(weeklyData, 'Weekly Working Hours')} width={400} height={200} />
                </div>

                <hr></hr>
                <h2 className='text-center mt-5'>Monthly Number of Tasks</h2>
                <div className='chart-container mt-5'>
                    <Bar data={getBarChartData(monthlyData, 'Monthly Number of Tasks')} width={400} height={200} />
                </div>
            </div>
        </Container>
    );
};

Date.prototype.getWeek = function () {
    const firstDayOfYear = new Date(this.getFullYear(), 0, 1);
    const pastDaysOfYear = (this - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

export default TaskDashBoard;
