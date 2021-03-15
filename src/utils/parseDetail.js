export const getDetail = (activity) =>
// const deadline = moment(activity.deadline);

  [
    { title: 'Tipo de Actividad', value: activity.alternative_type },
    { title: 'Estado de la actividad', value: activity.status_alias },
    { title: 'Límite de postulación', value: activity.deadline },
    { title: 'Fecha de la actividad', value: activity.activity_to },
  ];
