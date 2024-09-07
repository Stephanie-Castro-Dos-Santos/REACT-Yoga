import { BtnLocation, Calendar, Map, Filters } from "../components";
import { DialogProvider } from "../contexts/dialog/DialogProvider";
import "../styles";

export const HomeScreen = () => {
  return (
    <div>
      <h1>Bienvenido a Yogin</h1>
      <div id="calendar" className="parent">
        <DialogProvider>
          <Filters className="filters-container" />
          <Calendar className="calendar-container" />
        </DialogProvider>
      </div>
    </div>
  );
};
