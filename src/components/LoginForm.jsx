'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { FaFacebookF, FaGoogle, FaRegEnvelope } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';

export default function LoginForm() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [error, setError] = useState();

	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await signIn('credentials', {
				email,
				password,
				redirect: false,
			});

			if (res.error) {
				setError('Invalid Credentials');
				return;
			}
			router.replace('/dashboard');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
			<div className='shadow-2xl px-6 py-8 rounded-xl  bg-white '>
				<div className='text-left font-bold text-sm text-gray-700'>
					<span className='text-fuchsia-500'>XYZ </span>Company
				</div>

				<h1 className='text-2xl font-bold mb-8 mt-10 text-center font-mono'>
					Login Form
				</h1>

				<form onSubmit={handleSubmit} className='flex flex-col gap-6 '>
					<div className='bg-gray-100 w-70 p-2 flex items-center rounded-md pl-4 shadow-sm'>
						<FaRegEnvelope className='text-gray-400 m-2' />
						<input
							onChange={(e) => setEmail(e.target.value)}
							type='email'
							placeholder='E-mail'
							className='bg-gray-100 outline-none flex-1'
						/>
					</div>
					<div className='bg-gray-100 w-70 p-2 flex items-center rounded-md pl4 shadow-sm'>
						<MdLockOutline className='text-gray-400 m-2' />
						<input
							onChange={(e) => setPassword(e.target.value)}
							type='password'
							placeholder='Password'
							className='bg-gray-100 outline-none flex-1'
						/>
					</div>
					<div className='mx-auto'>
						<button className='text-md bg-fuchsia-600 text-white font-bold cursor-pointer rounded-full px-10 py-2  border-2 border-white hover:bg-white hover:text-fuchsia-600 hover:border-2 hover:border-solid hover:border-fuchsia-600'>
							LOGIN
						</button>
					</div>
					<Link
						className='mb-5 text-right text-xs text-gray-600'
						href={'/register'}
					>
						Don&apos;t have an Account &nbsp;
						<span className='underline'>Register</span>
					</Link>
				</form>
				<div className='flex justify-center items-center py-6'>
					<div className='bg-gray-500 h-0.5 w-full'></div>
					<p className='text-bold text-gray-500'>&nbsp;&nbsp;OR&nbsp;&nbsp;</p>
					<div className='h-0.5 w-full bg-gray-500'></div>
				</div>
				<div className='flex justify-center my-2 gap-5'>
					<a
						href='#'
						className='border-2 border-gray-300 rounded-full p-3 mx-1'
					>
						<FaFacebookF className='text-md text-blue-500' />
					</a>
					<a
						href='#'
						className='border-2 border-gray-300 rounded-full p-3 mx-1'
					>
						<FaGoogle className='text-md text-red-500' />
					</a>
				</div>

				<div className='flex flex-col justify-center'>
					{error && (
						<div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-sm mt-2'>
							{error}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
