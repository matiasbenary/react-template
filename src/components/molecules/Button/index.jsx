import styled from 'styled-components'

const Button =styled.button`
padding: 10px 20px;
color: #FFFDFD;
border-radius: 15px;
background: #BCBBBB;
border: none;
box-shadow: 0px 4.90798px 6.13497px rgba(0, 0, 0, 0.14), 0px 1.84049px 8.58896px rgba(0, 0, 0, 0.12), 0px 3.06748px 3.06748px rgba(0, 0, 0, 0.2);

&:focus {
  border: none;
  outline: none;
}
`

export default Button

export const ButtonPrimary = styled(Button)`
background: #3F86F6;
`

export const ButtonWarning = styled(Button)`
background: #DE6E6E
;
`


