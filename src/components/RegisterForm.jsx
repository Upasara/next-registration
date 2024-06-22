'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaRegEnvelope } from 'react-icons/fa';
import { MdLockOutline, MdOutlineDriveFileRenameOutline } from 'react-icons/md';

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
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
			<div className='shadow-2xl p-5 rounded-lg bg-white '>
				<div className='text-left font-bold text-sm text-gray-700'>
					<span className='text-fuchsia-500'>XYZ </span>Company
				</div>
				<h1 className='text-2xl font-bold mt-10 mb-8 text-center font-mono'>
					Registration Form
				</h1>

				<form onSubmit={onSubmit} className='flex flex-col gap-6' action=''>
					<div className='bg-gray-100 w-70 p-2 flex items-center rounded-md pl-4 shadow-sm'>
						<MdOutlineDriveFileRenameOutline className='text-gray-400 m-2' />
						<input
							onChange={(e) => setName(e.target.value)}
							type='text'
							placeholder='Full Name'
							className='bg-gray-100 outline-none flex-1'
						/>
					</div>
					<div className='bg-gray-100 w-70 p-2 flex items-center rounded-md pl-4 shadow-sm'>
						<FaRegEnvelope className='text-gray-400 m-2' />
						<input
							onChange={(e) => setEmail(e.target.value)}
							type='email'
							placeholder='E-mail'
							className='bg-gray-100 outline-none flex-1'
						/>
					</div>
					<div className='bg-gray-100 w-70 p-2 flex items-center rounded-md pl-4 shadow-sm'>
						<MdLockOutline className='text-gray-400 m-2' />
						<input
							onChange={(e) => setPassword(e.target.value)}
							type='password'
							placeholder='Password'
							className='bg-gray-100 outline-none flex-1'
						/>
					</div>
					<div className='mx-auto'>
						<button className='bg-fuchsia-600 text-white font-bold cursor-pointer rounded-lg px-6 py-3 border-2 border-white hover:bg-white hover:text-fuchsia-600 hover:border-2 hover:border-solid hover:border-fuchsia-600'>
							REGISTER
						</button>
					</div>
					{error && (
						<div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-sm mt-2'>
							{error}
						</div>
					)}
					<Link className='mt-3 text-right text-xs text-gray-600' href={'/'}>
						Already Have an Account &nbsp;
						<span className='underline'>Login</span>
					</Link>
				</form>
			</div>
		</div>
	);
}
