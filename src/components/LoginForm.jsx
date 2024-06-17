import Image from 'next/image';
import Link from 'next/link';

export default function LoginForm() {
	return (
		<div className='grid place-items-center h-screen'>
			<div className='shadow-lg p-5 rounded-lg border-solid border-2 border-fuchsia-400 '>
				<h1 className='text-2xl font-bold my-4'>Login Form</h1>

				<form className='flex flex-col gap-6' action=''>
					<input type='email' placeholder='email' />
					<input type='password' placeholder='password' />
					<button className='bg-fuchsia-600 text-white font-bold cursor-pointer rounded-lg px-6 py-3 '>
						LOGIN
					</button>
					<div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-sm mt-2'>
						Error Message
					</div>
					<Link className='mt-3 text-right text-sm' href={'/register'}>
						Don&apos;t have an Account
						<span className='underline'>Register</span>
					</Link>
				</form>
			</div>
		</div>
	);
}
