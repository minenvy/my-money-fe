import { ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'

function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
	return <StyledButton {...props} />
}

const StyledButton = styled.button`
	font-size: 1.5rem;
	font-family: inherit;
	border-radius: 4px;
	padding: 0.75rem 1.5rem;
	line-height: 1.5;
	margin-top: 1.5rem;
	color: #fff;
	background-color: #1677ff;
	border: none;

	&:hover {
		cursor: pointer;
		background-color: #69b1ff;
	}
`

export default Button
