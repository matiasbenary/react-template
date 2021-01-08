import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../../../store/ducks/auth.duck';

const Ods = ({ ods, userId }) => {
  const { loading, error } = useSelector((state) => ({
    loading: state.auth.loading,
    error: state.auth.error,
  }));
  const dispatch = useDispatch();

  const list = [
    'Fin de la pobreza (Objetivo 1)',
    'Hambre cero (Objetivo 2)',
    'Salud y bienestar (Objetivo 3)',
    'Educación de calidad (Objetivo 4)',
    'Igualdad de género y empoderamiento de la mujer (Objetivo 5)',
    'Agua limpia y saneamiento (Objetivo 6)',
    'Energía asequible y no contaminante (Objetivo 7)',
    'Trabajo decente y crecimiento económico (Objetivo 8)',
    'Industria, innovación e infraestructura (Objetivo 9)',
    'Reducción de las desigualdades entre países y dentro de ellos (Objetivo 10)',
    'Ciudades y comunidades sostenibles (Objetivo 11)',
    'Producción y consumo responsables (Objetivo 12)',
    'Acción por el clima (Objetivo 13)',
    'Vida submarina (Objetivo 14)',
    'Vida de ecosistemas terrestres (Objetivo 15)',
    'Paz, justicia e instituciones sólidas (Objetivo 16)',
    'Alianzas para lograr los objetivos (Objetivo 17)',
  ];

  const listIds = ods.map((od) => od.id);

  const [odsForm, setOdsForm] = useState(listIds);

  const changeHandler = (e) => {
    const value = Number(e.target.value);
    if (odsForm.includes(value)) {
      setOdsForm(odsForm.filter((od) => od != value));
    } else {
      setOdsForm([...odsForm, value]);
    }
  };
  const submit = () => {
    dispatch(actions.chageOds({ categoriesIds: odsForm, id: userId }));
  };

  return (
    <div className="container mt-4">
      <div className="card shadow  bg-white rounded">
        <div className="card-header">Objetivos de desarrollo sostenible</div>
        <div className="card-block">
          <div className="card-body">
            <div className="form-group  m-form__group">
              <div className="row ml-4">
                {list.map((ods, index) => (
                  <div className="col-lg-4 mb-4" key={`odsId-${index}`}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`inlineCheckbox${index + 1}`}
                      value={index + 1}
                      checked={odsForm.includes(index + 1)}
                      onClick={changeHandler}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`inlineCheckbox${index + 1}`}
                    >
                      {ods}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer">
          {loading ? (
            <button className="btn btn-info" disabled>
              Actualizando
            </button>
          ) : (
            <button className="btn btn-info" onClick={submit}>
              Guardar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ods;
