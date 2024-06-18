'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
		<div className='grid place-items-center h-screen'>
			<div className='shadow-lg p-5 rounded-lg border-solid border-2 border-fuchsia-400 '>
				<h1 className='text-2xl font-bold my-4'>Login Form</h1>

				<form onSubmit={handleSubmit} className='flex flex-col gap-6'>
					<input
						onChange={(e) => setEmail(e.target.value)}
						type='email'
						placeholder='email'
					/>
					<input
						onChange={(e) => setPassword(e.target.value)}
						type='password'
						placeholder='password'
					/>
					<button className='bg-fuchsia-600 text-white font-bold cursor-pointer rounded-lg px-6 py-3 '>
						LOGIN
					</button>
					{error && (
						<div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-sm mt-2'>
							{error}
						</div>
					)}
					<Link className='mt-3 text-right text-sm' href={'/register'}>
						Don&apos;t have an Account
						<span className='underline'>Register</span>
					</Link>
				</form>
			</div>
		</div>
	);
}
