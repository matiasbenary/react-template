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
  if (!addresses || addresses.length === 0) return { address: '' };
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
    address_info: (!addresses || addresses.length === 0) ? '' : addresses[0].info,
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
                    validations={[]}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <Input
                    label="Perfil Linkedin"
                    name="linkedin_url"
                    type="text"
                    validations={[]}
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
                    validations={[]}
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

export default MyPersonalData;
