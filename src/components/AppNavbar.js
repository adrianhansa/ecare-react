import React, { useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

const AppNavbar = () => {
  const { service } = useSelector((state) => state.serviceDetails);
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container fluid>
        <LinkContainer to={service ? `/services/${service.slug}` : "/"}>
          <Navbar.Brand>{service ? service.name : "Easy Care"}</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/services">
              <Nav.Link>Services</Nav.Link>
            </LinkContainer>
            {service && (
              <>
                <Nav.Link>|</Nav.Link>
                <LinkContainer to={`/services/rota/${service.slug}`}>
                  <Nav.Link>Rota</Nav.Link>
                </LinkContainer>
                <LinkContainer to={`/services/shifts/${service.slug}`}>
                  <Nav.Link>Shifts</Nav.Link>
                </LinkContainer>
                <LinkContainer to={`/services/employees/${service.slug}`}>
                  <Nav.Link>Employees</Nav.Link>
                </LinkContainer>
                <LinkContainer
                  to={`/services/absence-management/${service.slug}`}
                >
                  <Nav.Link>Absences</Nav.Link>
                </LinkContainer>
                <LinkContainer to={`/services/annual-leave/${service.slug}`}>
                  <Nav.Link>Annual Leave</Nav.Link>
                </LinkContainer>
                <LinkContainer to={`/services/handover/${service.slug}`}>
                  <Nav.Link>Handover</Nav.Link>
                </LinkContainer>
                <LinkContainer to={`/services/supervisions/${service.slug}`}>
                  <Nav.Link>Supervisions</Nav.Link>
                </LinkContainer>
                <LinkContainer to={`/services/appraisals/${service.slug}`}>
                  <Nav.Link>Appraisals</Nav.Link>
                </LinkContainer>
                <LinkContainer to={`/services/communications/${service.slug}`}>
                  <Nav.Link>Communications</Nav.Link>
                </LinkContainer>
                <LinkContainer to={`/services/shift-plans/${service.slug}`}>
                  <Nav.Link>Shift plans</Nav.Link>
                </LinkContainer>
                <LinkContainer
                  to={`/services/health-and-safety/${service.slug}`}
                >
                  <Nav.Link>Health and Safety</Nav.Link>
                </LinkContainer>
                <LinkContainer to={`/services/residents/${service.slug}`}>
                  <Nav.Link>Children & YP</Nav.Link>
                </LinkContainer>
                <LinkContainer
                  to={`/services/daily-observations/${service.slug}`}
                >
                  <Nav.Link>Daily Observations</Nav.Link>
                </LinkContainer>
                <LinkContainer to={`/services/diary/${service.slug}`}>
                  <Nav.Link>Diary</Nav.Link>
                </LinkContainer>
                <LinkContainer to={`/services/roles/${service.slug}`}>
                  <Nav.Link>Roles</Nav.Link>
                </LinkContainer>
                <Nav.Link>|</Nav.Link>
              </>
            )}
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav className="ms-auto">
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
