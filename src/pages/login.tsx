import { useState } from 'react'
import { Form, Link, redirect } from 'react-router-dom'
import styled from 'styled-components'
import CustomElement from '@/elements'

export async function action({ request }: any) {
	const formData = await request.formData()
	const body = Object.fromEntries(formData)
	console.log(body)
	return body
	redirect('/')
}

function Login() {
	const [loginInformation, setLoginInformation] = useState({
		account: '',
		password: '',
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginInformation({
			...loginInformation,
			[e.target.name]: e.target.value,
		})
	}

	return (
		<StyledForm method="post">
			<h1>Sign in</h1>
			<StyledLink to={'/register'}>Need an account?</StyledLink>
			<CustomElement.Input
				value={loginInformation.account}
				onChange={handleChange}
				name="account"
				type="text"
				placeholder="Account"
			/>
			<CustomElement.Input
				value={loginInformation.password}
				onChange={handleChange}
				name="password"
				type="password"
				placeholder="Password"
			/>
			<StyledButton type="submit">Login</StyledButton>
		</StyledForm>
	)
}

const StyledForm = styled(Form)`
	max-width: 540px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 1.5rem auto 0;
`
const StyledLink = styled(Link)`
	margin-top: 1rem;
`
const StyledButton = styled(CustomElement.Button)`
	align-self: flex-end;
	margin-right: 5%;
`

export default Login
