import { TextareaHTMLAttributes } from "react";
import styled from "styled-components";

function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <StyledTextarea {...props} />
}

const StyledTextarea = styled.textarea`
  font-size: 1.5rem;
	font-family: inherit;
	border-radius: 4px;
	border: 1px solid #d9d9d9;
	padding: 0.75rem 1.5rem;
	background-color: #fff;
	line-height: 1.5;
	margin-top: 1rem;
	outline: none;

  &:hover, &:focus {
    border-color: #4096ff;
  }
`

export default Textarea
