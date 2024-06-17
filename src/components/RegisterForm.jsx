import Link from 'next/link';

export default function RegisterForm() {
	return (
		<div className='grid place-items-center h-screen'>
			<div className='shadow-lg p-5 rounded-lg border-solid border-2 border-fuchsia-400 '>
				<h1 className='text-2xl font-bold my-4'>Login Form</h1>

				<form className='flex flex-col gap-6' action=''>
					<input type='text' placeholder='Full Name' />
					<input type='email' placeholder='email' />
					<input type='password' placeholder='password' />
					<button className='bg-fuchsia-600 text-white font-bold cursor-pointer rounded-lg px-6 py-3 '>
						REGISTER
					</button>
					<div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-sm mt-2'>
						Error Message
					</div>
					<Link className='mt-3 text-right text-sm' href={'/'}>
						Already Have an Account
						<span className='underline'> Login</span>
					</Link>
				</form>
			</div>
		</div>
	);
}
