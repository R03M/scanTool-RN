import React, { useRef } from "react";
import { TextInput, Keyboard } from "react-native";
import useFocus from "../hooks/useFocus";
import PropTypes from "prop-types";

/**
 * Este es el componente que gestiona los códigos escaneados con el éscaner integrado.
 *
 * Al procesar internamente el cerrar sesion de usuario puede ser llamado sin pasarle parametros para cuando simplemente se requiera cerrar sesion.
 *
 * @component
 *
 * @prop {function} handleInput - Funcion que procesara el codigo escaneado.
 *
 * @prop {state} currentValue - Valor actual escaneado.
 *
 * @author Mr. Blue
 *
 */

const EnterBarcode = ({ handleInput, currentValue }) => {
  const inputRef = useRef();

  useFocus(() => inputRef.current.focus());

  const handleValue = (value) => {
    handleInput(value);
  };

  return (
    <TextInput
      autoFocus={true}
      showSoftInputOnFocus={false}
      onFocus={() => Keyboard.dismiss()}
      ref={inputRef}
      onBlur={() => {
        inputRef.current.focus();
      }}
      value={currentValue}
      onChangeText={handleValue}
      style={{ position: "absolute", top: -50 }}
    />
  );
};

EnterBarcode.propTypes = {
  currentValue: PropTypes.string,
  handleInput: PropTypes.func,
};

export default EnterBarcode;
