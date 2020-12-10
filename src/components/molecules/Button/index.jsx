import styled from 'styled-components'

const Button =styled.button`
background: #BCBBBB;
&:focus {
  border: none;
  outline: none;
}

  display:inline-block;
  padding: 12px 36px;
  text-align: center;
  color: #FFFDFD;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  //box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2);
  border-radius: 25px;
  border:none;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;

  &:hover{
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: translateY(-3px);
    text-decoration: none;
  }
  &:active{
    box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
    transform: translateY(3px);
  }
  &:focus{
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


