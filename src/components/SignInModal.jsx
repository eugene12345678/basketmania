
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../App.css';

const SignInModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const formik = useFormik({
    initialValues: {
      username: '', // Add username field
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'), // Username validation
      email: Yup.string()
        .email('Invalid email format')
        .required('Required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:5000/signup', { // Adjust URL based on your backend server
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: values.username, // Include username in the request
            email: values.email,
            password: values.password,
          }),
        });

        const data = await response.json();
        
        if (response.ok) {
          console.log('User created successfully:', data);
          onClose(); // Close the modal after successful sign-up
        } else {
          console.error('Error signing up:', data.error);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    },
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="modal-close" onClick={onClose}>&times;</span>
        <h2>Sign Up</h2>
        <form className="form" onSubmit={formik.handleSubmit}>
          <span className="input-span">
            <label htmlFor="username" className="label">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="error">{formik.errors.username}</div>
            ) : null}
          </span>
          <span className="input-span">
            <label htmlFor="email" className="label">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </span>
          <span className="input-span">
            <label htmlFor="password" className="label">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </span>
          <span className="input-span">
            <label htmlFor="confirmPassword" className="label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="error">{formik.errors.confirmPassword}</div>
            ) : null}
          </span>
          <input className="submit" type="submit" value="Sign Up" />
          <span className="span">Already have an account? <a href="#">Log in</a></span>
        </form>
      </div>
    </div>
  );
};

export default SignInModal;

