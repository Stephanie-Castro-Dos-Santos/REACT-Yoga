import { BtnLocation, Map } from "../components";

export const Filters = () => {
  return (
    <form action="" method="post" className=".filters-container ">
      <BtnLocation />
      <Map />
      {/* Title */}
      <label htmlFor="POST-startDate">Título:</label>
      <input
        type="text"
        id="POST-titleEvent"
        name="POST-titleEvent"
        //onChange={(e) => setStartDate(e.target.value)}
        placeholder="Título"
        required
      />
      <br />
      <br />
      {/* Start Date */}
      <label htmlFor="POST-startDate">Fecha de Inicio:</label>
      <input type="date" id="POST-startDate" name="POST-startDate" required />
      <br />
      <br />
      {/* End Date */}
      <label htmlFor="POST-endDate">Fecha de Fin:</label>
      <input type="date" id="POST-endDate" name="POST-endDate" required />
      <br />
      <br />
      {/* Teacher */}
      <label htmlFor="POST-profesor">Profesor:</label>
      <select id="POST-profesor" name="POST-profesor">
        <option value="profesor1">Profesor 1</option>
        <option value="profesor2">Profesor 2</option>
        <option value="profesor3">Profesor 3</option>
      </select>
      <br />
      <br />
      {/* Center */}
      <label htmlFor="POST-centro">Centro:</label>
      <select id="POST-centro" name="POST-centro">
        <option value="centro1">Centro 1</option>
        <option value="centro2">Centro 2</option>
        <option value="centro3">Centro 3</option>
      </select>
      <br />
      <br />
      {/* Duration */}
      <label htmlFor="POST-duracion">Duración de la clase (minutos):</label>
      <br />
      <input
        type="range"
        id="POST-duracion"
        name="POST-duracion"
        min="30"
        max="120"
        step="5"
        onInput={(e) => (e.target.nextElementSibling.value = e.target.value)}
      />
      <output>75</output> min
      <br />
      <br />
      {/* Type */}
      <label htmlFor="POST-tipo">Tipo de Yoga:</label>
      <select id="POST-tipo" name="POST-tipo">
        <option value="hatha">Hatha</option>
        <option value="vinyasa">Vinyasa</option>
        <option value="dharma">Dharma</option>
        <option value="sivananda">Sivananda</option>
      </select>
      <br />
      <br />
      {/* Modality */}
      <label>Modalidad:</label>
      <br />
      <input type="radio" id="POST-online" name="modalidad" value="online" />
      <label htmlFor="POST-online">Online</label>
      <br />
      <input
        type="radio"
        id="POST-presencial"
        name="modalidad"
        value="presencial"
      />
      <label htmlFor="POST-presencial">Presencial</label>
      <br />
      <br />
      {/* Submit button */}
      <input type="submit" value="Enviar" />
      <br />
      <br />
    </form>
  );
};
