import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../../../store/ducks/auth.duck';
import { checkUser } from '../../../../../utils/checkUser';
import Form, { Input, SubmitButton } from '../../../../molecules/Form';
import GooglePlaceAutocomplete from '../../../../molecules/Form/components/GooglePlaceAutocomplete';
import GenderSelect from './Components/GenderSelect';
import IdTypeSelect from './Components/IdTypeSelect';
import MaritalSelect from './Components/MaritalSelect';

const getAdress = (addresses) => {
  if (addresses.length === 0) return { address: '' };
  return { address_id: addresses[0].id, address: addresses[0].name };
};

const MyPersonalData = ({
  user,
}) => {
  const {
    name, email, id, volunteeringFields, addresses,
  } = user;

  const defaultValue = {
    name,
    email,
    id,
    ...volunteeringFields,
    ...getAdress(addresses),
    address_info: addresses.length === 0 ? '' : addresses[0].info,
  };

  const [change, setChange] = useState(false);
  const isLoading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    if (!change && isLoading)setChange(true);
  }, [isLoading]);

  const dispatch = useDispatch();

  const save = (values) => {
    setChange(false);
    dispatch(actions.chageProfile(values));
  };
  return (
    <div className="container mt-4">
      {change && (
      <div className="alert alert-success" role="alert">
        Se actualizo de forma correcta
      </div>
      )}
      {checkUser(user) || (
      <div className="alert alert-warning" role="alert">
        Por favor complete sus datos personales
      </div>
      )}
      <div className="card shadow  bg-white rounded">
        <div className="card-header">Mis datos personales</div>
        <div className="card-block">
          <div className="card-body">
            <Form
              className="form"
              submit={save}
              defaultValue={defaultValue}
            >

              <div className="form-row">
                <div className="form-group col-md-6">
                  <Input
                    label="Nombre"
                    name="name"
                    type="text"
                    validations={[
                      { key: 'required', val: true },
                    ]}
                  />
                </div>
                <div className="form-group col-md-6">
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    validations={[
                      { key: 'required', val: true },
                      { key: 'email', val: true },
                    ]}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <MaritalSelect />
                </div>
                <div className="form-group col-md-6">
                  <GenderSelect />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <IdTypeSelect />
                </div>
                <div className="form-group col-md-6">
                  <Input
                    label="Numero de documento"
                    name="id_number"
                    type="number"
                    validations={[
                      { key: 'required', val: true },
                      { key: 'only_numbers', val: true },
                    ]}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <Input
                    label="Numero de telefono"
                    name="phone_number"
                    type="number"
                    validations={[
                      { key: 'required', val: true },
                      { key: 'only_numbers', val: true },
                    ]}
                  />
                </div>
                <div className="form-group col-md-6">
                  <Input
                    label="Numero de celular"
                    name="mobile_number"
                    type="number"
                    validations={[
                      { key: 'required', val: true },
                      { key: 'only_numbers', val: true },
                    ]}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <Input
                    label="Perfil Linkendin"
                    name="linkedin_url"
                    type="url"
                    validations={[
                      { key: 'required', val: true },
                    ]}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <GooglePlaceAutocomplete
                    label="Domicilio"
                    name="address"
                    validations={[
                      { key: 'required', val: true },
                    ]}
                  />
                </div>
                <div className="form-group col-md-6">
                  <Input
                    label="Información adicional"
                    name="address_info"
                    type="text"
                    validations={[
                      { key: 'required', val: true },
                    ]}
                  />
                </div>
              </div>
              <SubmitButton isloading={isLoading} />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

/*
const MyPersonalData = ({
  user: {
    name, email, id, volunteeringFields,
  },
}) => {
  const {
    marital_status, id_type, id_number, gender, phone_number, mobile_number, linkedin_url,
  } = volunteeringFields
  || {
    marital_status: null, id_type: null, id_number: null, gender: null, phone_number: null, mobile_number: null, linkedin_url: null,
  };

  const [profile, setProfile] = useState({
    name,
    email,
    marital_status,
    id_type,
    id_number,
    gender,
    phone_number,
    mobile_number,
    linkedin_url,
    id,
  });

  const { loading } = useSelector((state) => ({
    loading: state.auth.loading,
  }));
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    const { name: nameInput, value } = e.target;
    setProfile({ ...profile, [nameInput]: value });
  };

  const submit = () => {
    dispatch(actions.chageProfile(profile));
  };

  return (
    <div className="container mt-4">
      <div className="card shadow  bg-white rounded">
        <div className="card-header">Mis datos personales</div>
        <div className="card-block">
          <div className="card-body">
            <div className="login__inputs">
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Nombre completo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail4"
                    placeholder="EJ: Juan Peréz"
                    value={profile.name}
                    name="name"
                    onChange={changeHandler}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Correo electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="usuario@emai.com"
                    value={profile.email}
                    name="email"
                    onChange={changeHandler}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Estado civil</label>
                  <select
                    id="inputState"
                    className="form-control"
                    name="marital_status"
                    onChange={changeHandler}
                  >
                    {!profile.marital_status && (
                      <option selected>Sin definir</option>
                    )}
                    {maritalStatus.map((option) => (
                      <option
                        value={option.value}
                        selected={option.value === profile.marital_status}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label>Género</label>
                  <select
                    id="inputState"
                    className="form-control"
                    name="gender"
                    onChange={changeHandler}
                  >
                    {!profile.gender && (
                      <option selected>Sin definir</option>
                    )}
                    {genderTypes.map((option) => (
                      <option
                        value={option.value}
                        selected={option.value === profile.gender}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputId">Tipo de documento</label>
                  <select
                    id="inputId"
                    className="form-control"
                    name="id_type"
                    onChange={changeHandler}
                  >
                    {!profile.id_type && <option selected>Sin definir</option>}
                    {idTypes.map((option) => (
                      <option
                        value={option.value}
                        selected={option.value === profile.id_type}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label>Número de documento</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputNunId"
                    placeholder="EJ: 1111111"
                    value={profile.id_number}
                    name="id_number"
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Número de telefono</label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputNunId"
                    placeholder="EJ: 1111111"
                    value={profile.phone_number}
                    name="phone_number"
                    onChange={changeHandler}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Número de celular</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="EJ: 1111111"
                    value={profile.mobile_number}
                    name="mobile_number"
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Perfil de linkedin</label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://www.linkedin.com/in/juan-perez-539105104/"
                    value={profile.linkedin_url}
                    name="linkedin_url"
                    onChange={changeHandler}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          {loading ? (
            <button className="btn btn-info" disabled type="button">
              Actualizando
            </button>
          ) : (
            <button className="btn btn-info" onClick={submit} type="button">
              Guardar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
*/
export default MyPersonalData;
