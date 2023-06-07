import React, { useState, useEffect } from "react";
import { Checkbox, Icon, Message } from "semantic-ui-react";
import "./TermsModal.scss";
import { image } from "../../../assets/";

export const TermsModal = ({
  closeModal,
  onAcceptChange,
  initialAcceptance,
}) => {
  const [acceptanceState, setAcceptanceState] = useState(initialAcceptance);
  /*   const acceptanceStateRef = useRef(acceptanceState); */
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [messageColor, setMessageColor] = useState("");

  const handleAcceptChange = (event, data) => {
    const { label } = data;
    const accepted = label === "Sí";
    setAcceptanceState(accepted);

    if (accepted) {
      setShowMessage(true);
      setMessageContent("Has aceptado los términos y condiciones.");
      setMessageColor("blue");
    } else {
      setShowMessage(true);
      setMessageContent("No has aceptado los términos y condiciones.");
      setMessageColor("red");
    }
  };

  useEffect(() => {
    onAcceptChange(acceptanceState);
  }, [acceptanceState, onAcceptChange]);

  const handleCloseModal = () => {
    closeModal(false);
  };
  /*   const handleAcceptChange = (event, data) => {
    const { checked } = data;
    console.log(checked);
    if (checked === acceptanceStateRef.current) {
      setAcceptanceState(!checked);
      acceptanceStateRef.current = !checked;
    } else {
      setAcceptanceState(checked);
      acceptanceStateRef.current = checked;
    }
    if (checked) {
      setShowMessage(true);
      setMessageContent("Has aceptado los términos y condiciones.");
    } else {
      setShowMessage(true);
      setMessageContent("Has rechazado los términos y condiciones.");
    }
  };

  const memoizedOnAcceptChange = useCallback(onAcceptChange, []);
  useEffect(() => {
    memoizedOnAcceptChange(acceptanceState);
  }, [acceptanceState, memoizedOnAcceptChange]);

  const handleCloseModal = () => {
    closeModal(false);
  }; */

  return (
    <>
      <div className="darkBG" onClick={() => closeModal(false)} />
      <div className="centeredTerms">
        <div className="modalTerms">
          <div className="modalTermsHeader">
            <h5 className="heading">
              <strong>Términos y condiciones SENNOVALAB</strong>
            </h5>
          </div>
          <div className="messageContainer">
            {showMessage && (
              <Message
                positive={messageColor === "blue"}
                negative={messageColor === "red"}
              >
                {messageContent}
              </Message>
            )}
          </div>
          <div className="modalTermsBody">
            <div className="scrollableContent">
              <p>
                <br />
                Por favor, lee detenidamente los siguientes términos y
                condiciones antes de utilizar nuestro sitio web. Al acceder y
                utilizar este sitio web, aceptas cumplir con estos términos y
                condiciones. Si no estás de acuerdo con alguno de los siguientes
                puntos, te recomendamos que no utilices nuestro sitio web.
                <br />
                <br />
                <strong>1. Uso del Sitio Web</strong>
                <br />
                1.1. El contenido de este sitio web es únicamente para
                información general y puede estar sujeto a cambios sin previo
                aviso. No garantizamos la exactitud, integridad o actualidad de
                la información proporcionada en este sitio web.
                <br />
                1.2. El uso de cualquier información o material en este sitio
                web es bajo tu propio riesgo. Es tu responsabilidad asegurarte
                de que cualquier producto, servicio o información disponible a
                través de este sitio web cumpla con tus requisitos específicos.
                <br />
                1.3. Este sitio web puede contener enlaces a otros sitios web
                que no están bajo nuestro control. No tenemos control sobre la
                naturaleza, el contenido y la disponibilidad de esos sitios. La
                inclusión de cualquier enlace no implica necesariamente una
                recomendación o respaldo de los puntos de vista expresados en
                ellos.
                <br />
                <br />
                <strong>Propiedad Intelectual </strong>
                <br />
                2.1. Todos los derechos de propiedad intelectual en relación con
                este sitio web y su contenido (incluyendo, pero no limitado a,
                texto, gráficos, logotipos, imágenes y software) son propiedad
                de SENNOVALAB o de nuestros licenciantes. Estos están protegidos
                por las leyes de propiedad intelectual aplicables.
                <br />
                2.2. Está prohibida cualquier reproducción, distribución,
                modificación o uso no autorizado del contenido de este sitio web
                sin nuestro consentimiento previo por escrito.
                <br />
                <br />
                <strong>Privacidad y Protección de Datos </strong>
                <br />
                3.1. La recopilación y el uso de tus datos personales en
                relación con este sitio web están sujetos a nuestra Política de
                Privacidad. Al utilizar nuestro sitio web, aceptas el
                procesamiento de tus datos personales de acuerdo con nuestra
                Política de Privacidad.
                <br />
                <br />
                <strong>Limitación de Responsabilidad </strong>
                <br />
                4.1.En la medida permitida por la ley aplicable, excluimos todas
                las garantías y condiciones relacionadas con nuestro sitio web y
                su contenido. No seremos responsables de ningún daño directo,
                indirecto, incidental, especial o consecuente que surja del uso
                de este sitio web.
                <br />
                <br />
                <strong>Modificaciones de los Términos y Condiciones</strong>
                <br />
                5.1.Nos reservamos el derecho de modificar estos términos y
                condiciones en cualquier momento. Los cambios serán efectivos
                tan pronto como se publiquen en este sitio web. Te recomendamos
                que revises regularmente estos términos y condiciones para estar
                al tanto de cualquier cambio.
              </p>
              <br />
            </div>
            <img src={image.logoSennovalabC} alt="" className="logo" />

          </div>

          <div className="acceptanceSection">
            <div className="item">
              <p>¿Acepta los términos y condiciones?</p>
            </div>

            <div className="item" style={{ marginTop: "10px" }}>
              <Checkbox
                label="Sí"
                checked={acceptanceState}
                onChange={handleAcceptChange}
              />
              <Checkbox
                label="No"
                checked={!acceptanceState}
                onChange={handleAcceptChange}
              />
            </div>
          </div>
          <button className="closeBtnTermsModal" onClick={handleCloseModal}>
            <Icon name="close" />
          </button>
        </div>
      </div>
    </>
  );
};
