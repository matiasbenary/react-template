import React, { useEffect, useState } from 'react'
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const convertResponseToOptions = (array) => {
  if(array.length ==0) return [];
  return array.map((v) => ({ value: v.value, label: v.value }));
};


const Option = ({options,addAnswers}) => {
  const [optionsLocal, setOptionsLocal] = useState(null)
  useEffect(() => {
    setOptionsLocal(convertResponseToOptions(options))
  },[])
  return (
     <Select
            options={optionsLocal}
            onChange={addAnswers}
      ></Select>
  )
}

export default Option
/*
placeholder="Objetivos de desarrollo sostenible"
components={animatedComponents}
isMulti
onChange={addFilter("inSdgs")}
options={convertResponseToOptions(response.ods, "label", "id")}
defaultValue={filter ? filter.inSdgs : []} */
