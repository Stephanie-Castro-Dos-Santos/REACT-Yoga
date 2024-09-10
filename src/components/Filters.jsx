import { BtnLocation, Map } from "../components";

export const Filters = () => {
  return (
    <form action="" method="post" className=".filters-container ">
      <BtnLocation />
      <Map />
      {/* Title */}
      <label htmlFor="GET-startDate">Título:</label>
      <input
        type="text"
        id="GET-titleEvent"
        name="GET-titleEvent"
        //onChange={(e) => setStartDate(e.target.value)}
        placeholder="Título"
        required
      />
      <br />
      <br />
      {/* Start Date */}
      <label htmlFor="GET-startDate">Fecha de Inicio:</label>
      <input type="date" id="GET-startDate" name="GET-startDate" required />
      <br />
      <br />
      {/* End Date */}
      <label htmlFor="GET-endDate">Fecha de Fin:</label>
      <input type="date" id="GET-endDate" name="GET-endDate" required />
      <br />
      <br />
      {/* Teacher */}
      <label htmlFor="GET-profesor">Profesor:</label>
      <select id="GET-profesor" name="GET-profesor">
        <option value="profesor1">Profesor 1</option>
        <option value="profesor2">Profesor 2</option>
        <option value="profesor3">Profesor 3</option>
      </select>
      <br />
      <br />
      {/* Center */}
      <label htmlFor="GET-centro">Centro:</label>
      <select id="GET-centro" name="GET-centro">
        <option value="centro1">Centro 1</option>
        <option value="centro2">Centro 2</option>
        <option value="centro3">Centro 3</option>
      </select>
      <br />
      <br />
      {/* Duration */}
      <label htmlFor="GET-duracion">Duración de la clase (minutos):</label>
      <br />
      <input
        type="range"
        id="GET-duracion"
        name="GET-duracion"
        min="30"
        max="120"
        step="5"
        onInput={(e) => (e.target.nextElementSibling.value = e.target.value)}
      />
      <output>75</output> min
      <br />
      <br />
      {/* Type */}
      <label htmlFor="GET-tipo">Tipo de Yoga:</label>
      <select id="GET-tipo" name="GET-tipo">
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
      <input type="radio" id="GET-online" name="modalidad" value="online" />
      <label htmlFor="GET-online">Online</label>
      <br />
      <input
        type="radio"
        id="GET-presencial"
        name="modalidad"
        value="presencial"
      />
      <label htmlFor="GET-presencial">Presencial</label>
      <br />
      <br />
      {/* Submit button */}
      <input type="submit" value="Enviar" />
      <br />
      <br />
    </form>
  );
};
