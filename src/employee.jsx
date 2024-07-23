import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Navbar, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Employee.css';
import { DeleteEmployee, GetEmployee, listEmployees } from './Employeeservice';
import { getSession, removeSession } from './SessionService';

const Employee = () => {
  const navigate = useNavigate();
  const [empComp, setEmp] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!getSession()) {
      navigate('/');
    } else {
      getAllEmp();
    }
  }, []);

  function getAllEmp() {
    listEmployees()
      .then((response) => {
        setEmp(response.data);
        setErrorMessage('');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSearch = () => {
    if (searchId) {
      GetEmployee(searchId)
        .then((response) => {
          if (response.data && response.data.id) {
           
            setEmp([response.data]);
            setErrorMessage('');
          } else {
           
            setEmp([]);
            setErrorMessage('Employee not found');
          }
        })
        .catch((error) => {
          console.log(error);
          setEmp([]);
          setErrorMessage('Employee not found');
        });
    } else {
      getAllEmp();
    }
  };
  

  const addEmp = () => {
    navigate('/addEmployee');
  };

  const viewallTasks = () => {
    navigate(`/employeeTasks`);
  };

  const viewTasks = (id) => {
    navigate(`/employeeTasks/${id}`);
  };

  const assignTasks = () => {
    navigate('/task');
  };

  const updateEmployee = (id) => {
    navigate(`/editEmployee/${id}`);
  };

  const deleteEmployee = (id) => {
    console.log(id);
    DeleteEmployee(id)
      .then((response) => {
        getAllEmp();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const logout = () => {
    removeSession();
    navigate('/');
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-4 border-bottom custom-navbar">
        <Container>
          <Navbar.Brand href="#" className="text-primary fw-bold">Mohanraj</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Form className="d-flex me-auto" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
              <Form.Control
                type="search"
                placeholder="Search by Employee ID"
                className="me-2 custom-search"
                aria-label="Search"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <Button variant="outline-success" type="submit">Search</Button>
            </Form>
            <Button variant="outline-primary" className="fw-bold me-2 custom-button" onClick={addEmp}>Add Employee</Button>
            <Button variant="outline-primary" className="fw-bold me-2 custom-button" onClick={viewallTasks}>View All Tasks</Button>
            <Button variant="outline-primary" className="fw-bold me-2 custom-button" onClick={assignTasks}>Assign Task</Button>
            <Button variant="outline-danger" className="fw-bold custom-button" onClick={logout}>Logout</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="text-center">
        <h1 className="display-5 mb-5 mt-5 text-uppercase">List of Employees</h1>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Row>
          {empComp.map((values) => (
            <Col key={values.id} md={4} className="mb-4">
              <Card className="custom-card">
                <Card.Body>
                  <Card.Title className="custom-card-title">{`${values.firstName} ${values.lastName}`}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted custom-card-subtitle">{values.role}</Card.Subtitle>
                  <Card.Text className="custom-card-text">
                    <strong>ID:</strong> {values.id}<br />
                    <strong>Email:</strong> {values.email}
                  </Card.Text>
                  <Button variant="outline-primary" className="custom-card-button" onClick={() => updateEmployee(values.id)}>Update</Button>
                  <Button variant="outline-danger" className="ms-2 custom-card-button" onClick={() => deleteEmployee(values.id)}>Delete</Button>
                  <Button variant="outline-success" className="ms-2 custom-card-button" onClick={() => viewTasks(values.id)}>View Tasks</Button>
             
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Employee;
