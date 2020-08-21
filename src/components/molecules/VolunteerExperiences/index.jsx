import React from "react";
import "./VolunteerExperiences.scss";
const comments = [
  {
    comment:
      "Recomiendo la experiencia de participar, conocer como trabaja el Banco de Alimentos, el esfuerzo que realizan tanto los voluntarios como aquellos que forman parte de la organización, aportando nuestro tiempo y colaboración.",
    quote: "Por ABRAHAM, NATALIA ROCIO – ¡Clasificación de alimentos en Munro!"
  },
  {
    comment:
      "Muy gratificante!!! Agradezco mucho la oportunidad que me brindaron de participar en esta actividad.",
    quote:
      "Por GOMEZ, MONICA GABRIELA – Adaptación de libros para que sean accesibles a personas ciegas"
  },
  {
    comment:
      "Muy linda experiencia y la organizacion de todo! re feliz de poder participar! :)",
    quote:
      "Por FICA MILLAN, YANET PAMELA – ¡Clasificación de alimentos en Munro!"
  }
];

const VolunteerExperiences = () => {
  return comments.map((comment, index) => (
    <div className={`${index ? "commentContainer" : ""} test`}>
      <p className="font-weight-light text-md comment">{comment.comment}</p>
      <small class="font-italic text-sm quote">{comment.quote}</small>
    </div>
  ));
};

export default VolunteerExperiences;
