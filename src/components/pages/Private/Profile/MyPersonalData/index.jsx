import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {actions} from '../../../../../store/ducks/auth.duck';


const MyPersonalData = ({user:{name,email,marital_status,id_type,id_number,id}}) => {
  const [profile, setProfile] = useState({name,email,marital_status,id_type,id_number,id})
  const {loading,error} = useSelector (state => ({loading:state.auth.loading ,error : state.auth.error}))
  const dispatch = useDispatch();


  const changeHandler = (e) => {
    const {name,value} = e.target;
    setProfile({...profile,[name]:value});
  }

  const submit = () => {
    dispatch(actions.chageProfile(profile));
  }

  const maritalStatus = [
    {label: 'Soltero/a',value:'Soltero'},
    {label: 'Casado/a',value:'Casado'},
    {label: 'Viudo/a',value:'Viudo'},
    {label: 'Divorciado/a',value:'Divorciado'},
  ]

  const idTypes =[
    {label:'DNI', value:'DNI'},
    {label:'LE', value:'LE'},
    {label:'PASAPORTE', value:'PASAPORTE'},
  ]

  return (
    <div className="container mt-4">
    <div className="card shadow  bg-white rounded">
      <div className="card-header">Mis datos personales</div>
      <div className="card-block">
        <div className="card-body">
          <div className="login__inputs">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputEmail4">Nombre completo</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail4"
                  placeholder="EJ: Juan Peréz"
                  value={profile.name}
                  name="name"
                  onChange={changeHandler}
                  required
                />
              </div>
              <div class="form-group col-md-6">
                <label for="inputPassword4">Correo electrónico</label>
                <input
                  type="email"
                  class="form-control"
                  id="inputPassword4"
                  placeholder="usuario@emai.com"
                  value={profile.email}
                  name="email"
                  onChange={changeHandler}
                  required
                />
              </div>
            </div>
            <div class="form-group">
              <label for="inputState">Estado civil</label>
              <select id="inputState" class="form-control" name="marital_status"  onChange={changeHandler}>
                  {!profile.marital_status && <option selected>Sin definir</option>}
                  {maritalStatus.map(option=>(
                      <option value={option.value}  selected={option.value === profile.marital_status} >{option.label}</option>
                  ))}
                </select>
                </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputId">Tipo de documento</label>
                <select id="inputId" class="form-control" name="id_type"  onChange={changeHandler}>
                {!profile.id_type && <option selected>Sin definir</option>}
                  {idTypes.map(option=>(
                      <option value={option.value}  selected={option.value === profile.id_type} >{option.label}</option>
                  ))}
                </select>
              </div>
              <div class="form-group col-md-6">
                <label for="inputNunId">Número de documento</label>
                <input
                type="text"
                class="form-control"
                id="inputNunId"
                placeholder="EJ: 1111111"
                value={profile.id_number}
                name="id_number"
                onChange={changeHandler}
              />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer">
        {loading?
         <button className="btn btn-info" disabled >
        Actualizando
      </button>
        :
        <button className="btn btn-info" onClick={submit} >
        Guardar
      </button>
        }

      </div>
    </div>
  </div>
  )
}

export default MyPersonalData
