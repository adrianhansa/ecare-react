import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/userActions";
import { Form, Col, Row, Container, Button, Card } from "react-bootstrap";
import * as yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  email: yup.string().required("Please enter your email address."),
  password: yup.string().required("Please enter your password"),
});

const Login = () => {
  const { user, error, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate(`/services`);
    }
  }, [user, navigate]);
  const dispatch = useDispatch();
  return (
    <Container fluid>
      <Row className="mt-3">
        <Col className="mx-auto" xs={12} sm={8} md={6} lg={3} xl={3}>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          <Card>
            <Card.Header>
              <h3 className="text-center">Login</h3>
            </Card.Header>
            <Card.Body>
              <Formik
                validationSchema={validationSchema}
                initialValues={{ email: "", password: "" }}
                onSubmit={(values) => {
                  dispatch(login(values));
                }}
              >
                {(props) => {
                  return (
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          value={props.values.email}
                          onChange={props.handleChange("email")}
                          onBlur={props.handleBlur("email")}
                          placeholder="Email"
                        />
                        {props.touched && <p>{props.errors.payrollNumber}</p>}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          value={props.values.password}
                          onChange={props.handleChange("password")}
                          onBlur={props.handleBlur("password")}
                          placeholder="Password"
                        />
                        {props.touched && <p>{props.errors.password}</p>}
                      </Form.Group>
                      <Button
                        size="lg"
                        type="submit"
                        onClick={props.handleSubmit}
                      >
                        Login
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
