'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const router = useRouter();

	const onSubmit = async (e) => {
		e.preventDefault();

		if (!name || !password || !email) {
			setError('Enter your name...');
			return;
		}

		try {
			const resUserExists = await fetch('api/userExists', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			});

			const { user } = await resUserExists.json();

			if (user) {
				setError('User already exists');
				return;
			}

			const res = await fetch('api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					email,
					password,
				}),
			});

			if (res.ok) {
				const form = e.target;
				form.reset();
				router.push('/');
			} else {
				console.log('Registration Failed...!');
			}
		} catch (error) {
			console.log('Error during registration: ', error);
		}
	};

	return (
		<div className='grid place-items-center h-screen'>
			<div className='shadow-lg p-5 rounded-lg border-solid border-2 border-fuchsia-400 '>
				<h1 className='text-2xl font-bold my-4'>Login Form</h1>

				<form onSubmit={onSubmit} className='flex flex-col gap-6' action=''>
					<input
						onChange={(e) => setName(e.target.value)}
						type='text'
						placeholder='Full Name'
					/>
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
						REGISTER
					</button>
					{error && (
						<div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-sm mt-2'>
							{error}
						</div>
					)}
					<Link className='mt-3 text-right text-sm' href={'/'}>
						Already Have an Account
						<span className='underline'> Login</span>
					</Link>
				</form>
			</div>
		</div>
	);
}
