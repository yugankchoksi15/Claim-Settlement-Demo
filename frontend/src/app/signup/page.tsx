"use client";

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signupApi } from '../api/ApiConfig/api';
import { useRouter } from 'next/navigation';
import SmallLoadingSpinner from '../components/loader';
import '../CSS/login.css'
import { useTranslations } from 'next-intl';

export default function SignUpPage() {

  const t = useTranslations('HomePage');

  const [loading, setloading] = useState(false)

  const router = useRouter()
  // Set up validation schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required(t('First Name is required')),
    lastName: Yup.string().required(t('Last Name is required')),
    email: Yup.string().email(t('Invalid email address')).required(t('Email is required')),
    password: Yup.string().min(6, t('Password must be at least 6 characters')).required(t('Password is required')),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      setloading(true)
      handleSignUP(values)
    },
  });


  const handleSignUP = async (values: any) => {
    try {
      const resp = await signupApi(values); // API call
      // Handle success (you can process the response here)
      if(resp){
        const token = resp.token;
        localStorage.setItem("token", token);
        router.push('/')
        setloading(false)
      }
    } catch (error) {
      // Handle error (e.g., show a message to the user)
      console.error('SignUP failed:', error);
      setloading(false)
    }
  };

  return (
    <div className="font-[sans-serif] bg-white md:h-screen">
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        <div className="max-md:order-1 p-4">
          <img
            src="https://readymadeui.com/signin-image.webp"
            className="lg:max-w-[85%] w-full h-full object-contain block mx-auto"
            alt="login-image"
          />
        </div>

        <div className="flex items-center md:p-8 p-6 bg-[#0C172C] h-full lg:w-11/12 lg:ml-auto">
          <form onSubmit={formik.handleSubmit} className="max-w-lg w-full mx-auto">
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-yellow-400">{t('Create an account')}</h3>
            </div>

            <div>
              <label className="text-white text-xs block mb-2">{t('Full Name')}</label>
              <div className="relative flex items-center">
                <input
                  name="firstName"
                  type="text"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                  placeholder={t('Enter name')}
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 24 24">
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                </svg>
              </div>
              {formik.touched.firstName && formik.errors.firstName && (
                <label className="text-red-500 text-xs mt-1">{formik.errors.firstName}</label>
              )}
            </div>

            <div className="mt-8">
              <label className="text-white text-xs block mb-2">{t('Last Name')}</label>
              <div className="relative flex items-center">
                <input
                  name="lastName"
                  type="text"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                  placeholder={t('Enter name')}
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 24 24">
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                </svg>
              </div>
              {formik.touched.lastName && formik.errors.lastName && (
                <label className="text-red-500 text-xs mt-1">{formik.errors.lastName}</label>
              )}
            </div>

            <div className="mt-8">
              <label className="text-white text-xs block mb-2">{t('Email')}</label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="text"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                  placeholder={t('Enter email')}
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                    <path fill="none" strokeMiterlimit="10" strokeWidth="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                    <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                  </g>
                </svg>
              </div>
              {formik.touched.email && formik.errors.email && (
                <label className="text-red-500 text-xs mt-1">{formik.errors.email}</label>
              )}
            </div>

            <div className="mt-8">
              <label className="text-white text-xs block mb-2">{t('Password')}</label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                  placeholder={t('Enter password')}
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                </svg>
              </div>
              {formik.touched.password && formik.errors.password && (
                <label className="text-red-500 text-xs mt-1">{formik.errors.password}</label>
              )}
            </div>

            <div className="mt-6">
              <button type="submit" className="w-full bg-yellow-400 text-white text-xs py-3 rounded-sm">
              {loading ? <SmallLoadingSpinner />  : "Register"}             
              </button>
              
            </div>

            <div className="mt-6">
              <span className="text-xs text-white">
              {t('Already have an account?')}{' '}
                <a href="/signin" className="font-semibold text-yellow-400">
                {t('Log In')}
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
