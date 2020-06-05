import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../../store/ducks/hours/loadHours.duck';
import './modal.scss';

const HoursModal = ({ closeModal, title, activity_id }) => {
    const dispatch = useDispatch();

    const {
        user_id,
      } = useSelector((state) => ({
        user_id: state.auth.user.id,
      }));

    const [state, setState] = useState({
        horas: 0,
        minutos: 0,
        comentarios: '',
    });

    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
        setState({ ...state, horas: count + 1 });
    };

    const decrement = () => {
        if (count <= 0) {
            return;
        }
        setCount(count - 1);
        setState({ ...state, horas: count - 1 });
    };

    const handleHours = () => setState({ ...state, horas: count });
    const handleMinutes = (e) => setState({ ...state, minutos: Number(e.target.value) });
    const handleComments = (e) => setState({ ...state, comentarios: e.target.value });
    const handleSubmit = () => {
        const payload = {
            user_id,
            activity_id,
            hours: (state.horas + (state.minutos / 60)),
            activity_day: '2020-07-01', // calendario - rango de dias posibles
            upload_type: process.env.REACT_APP_ID_ENTITY,
        };
        dispatch(actions.addHours(payload));
        closeModal();
    };

    const hoursOptions = [0, 15, 30, 45];
    const options = hoursOptions.map((o) => <option>{o}</option>);

    return (
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button type="button" className="close" onClick={closeModal} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <form>
                    <div className="form-group">
                        <div className="form-row">
                            <div className="col col-md-5">
                                <label htmlFor="hours">Horas</label>
                                <div className="form-row">
                                    <div className="col-sm-3">
                                        <button type="button" className="btn btn-primary" onClick={decrement}>-</button>
                                    </div>
                                    <div className="col-sm-4">
                                        <input type="number" className="form-control" value={count} id="hours" onChange={handleHours} />
                                    </div>
                                    <div className="col-sm-2">
                                        <button type="button" className="btn btn-primary" onClick={increment}>+</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-md-3">
                                <label htmlFor="minutes">Minutos</label>
                                <select className="form-control" id="minutes" onChange={handleMinutes}>
                                    {options}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="comments">Comentarios</label>
                        <textarea className="form-control" id="comments" onChange={handleComments} />
                    </div>
                </form>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={closeModal} data-dismiss="modal">Cancelar</button>
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Enviar</button>
                </div>
            </div>
        </div>
    );
};

export default HoursModal;
