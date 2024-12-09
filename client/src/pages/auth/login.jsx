import { useToast } from "@/hooks/use-toast";
import { useFormik } from "formik";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../store/auth-slice";

const AuthLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: (value, action) => {
      dispatch(loginUser(value)).then((data) => {
        if (data.payload.success) {
          toast({
            title: data.payload.message,
          });
        } else {
          toast({
            title: data.payload.message,
            variant: "destructive",
          });
        }
      });
    },
  });

  return (
    <div className="w-50">
      <div className="text-center">
        <h2 className="fs-1">Sing in to your account</h2>
        <p>
          Don't have an account <Link to="/auth/register">Register</Link>
        </p>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            className="p-2"
            name="email"
            onChange={handleChange}
            value={values.email}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            className="p-2"
            name="password"
            onChange={handleChange}
            value={values.password}
          />
        </Form.Group>

        <Button type="submit" className="w-100 bg-black">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AuthLogin;
