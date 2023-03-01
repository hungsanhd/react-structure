import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { UrlConstants } from '../../../constants'
import { validateEmail } from '../../../helpers';
import { AppState } from '../../../store';
import { addUser } from '../../../store/users/actions';
import { IAddUserRequest } from '../../../store/users/types';

export const AddUser = () => {
	const [formInputs, setFormInputs] = useState({
		email: '',
		password: '',
		full_name: '',
	});
	const [formSubmitted, setFormSubmitted] = useState(false);
	const { email, password, full_name } = formInputs;

	const loading = useSelector<AppState>((state) => state.users.loading);
	const dispatch = useDispatch<any>();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormInputs((inputs) => ({ ...inputs, [name]: value }));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormSubmitted(true);
		if (email && password && full_name) {
			const user: IAddUserRequest = {
				email: email,
				password: password,
				full_name
			};
			dispatch(addUser(user));
		}
	};
	return (
		<>
			<h1 className='h3 mb-4 text-gray-800'>Thêm mới user</h1>
			<div className='card'>
				<div className='card-header'>Thông tin user</div>
				<div className='card-body'>
					<form onSubmit={handleSubmit}>
						<div className='form-group'>
							<label>Email</label>
							<input
								type='text'
								className={
									'form-control ' +
									(formSubmitted && (!email || !validateEmail(email))
										? 'is-invalid'
										: '')
								}
								name='email'
								placeholder='name@example.com'
								onChange={handleChange}
							/>
							{formSubmitted && !email && (
								<div className='invalid-feedback'>Email is required</div>
							)}
							{formSubmitted && !validateEmail(email) && (
								<div className='invalid-feedback'>Email is not valid</div>
							)}
						</div>
						<div className='form-group'>
							<label>Password</label>
							<input
								type='password'
								className={
									'form-control ' +
									(formSubmitted && !password ? 'is-invalid' : '')
								}
								name='password'
								onChange={handleChange}
							/>
							{formSubmitted && !password && (
								<div className='invalid-feedback'>Password is required</div>
							)}
						</div>
						<div className='form-group'>
							<label>Tên</label>
							<input
								type='text'
								className={
									'form-control ' +
									(formSubmitted && !full_name ? 'is-invalid' : '')
								}
								name='full_name'
								onChange={handleChange}
							/>
							{formSubmitted && !full_name && (
								<div className='invalid-feedback'>Full name is required</div>
							)}
						</div>

						<div className='form-group'>
							<button className='btn btn-primary' type='submit'>
								<>
									{loading && (
										<span className='spinner-border spinner-border-sm mr-1'></span>
									)}
								</>
								Lưu
							</button>
							<Link className='btn btn-danger' to={UrlConstants.USERS_LIST}>
								Hủy
							</Link>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
