import { useState } from 'react'
import { ArrowRight } from 'lucide-react' 
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { Link ,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";


const login = () => {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
     
      email: "",
      password: "",
     
    },
    validationSchema: Yup.object({
     
      password: Yup.string()
        .max(20, "Must be 20 characters or less")
        .min(2, "Too Short!")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      
    }),
    onSubmit: async (values, { resetForm }) => {
      const response = await axios
        .post('http://localhost:3000/login', { values })
        .then((res) => {
          if (res.status === 200) {
            resetForm()
            toast.success("success", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            navigate("/landing/")
          } 
        })
        .catch((err) => {
          toast.warn(err.data?.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            
          });
        });
    },
  });
  return (
    <section>
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign in</h2>
          <p className="mt-2 text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link to={"/signup"}
             
              title=""
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Create a free account
            </Link>
          </p>
          <form onSubmit={formik.handleSubmit} className="mt-8">
            <div className="space-y-5">
              <div>
              <div className="flex items-center justify-between">
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  {' '}
                  Email address{' '}
                </label>
                {formik.touched.email && formik.errors.email ? (
                      <div className="text-red-300">{formik.errors.email}</div>
                    ) : null}
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    id="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    {' '}
                    Password{' '}
                  </label>
                  {formik.touched.password && formik.errors.password ? (
                      <div className="text-red-300">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  <Link
                    href="#"
                    title=""
                    className="text-sm font-semibold text-black hover:underline"
                  >
                    {' '}
                    Forgot password?{' '}
                  </Link>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Get started <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
          {/*  */}
        </div>
      </div>
      <div className="h-full w-full">
        <img
          className="mx-auto h-full w-full rounded-md object-cover"
          src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
          alt=""
        />
      </div>
    </div>
  </section>
  )
}

export default login