import { BtnLocation, Calendar, Map } from "../components";
import { DialogProvider } from "../contexts/dialog/DialogProvider";

export const HomeScreen = () => {
  return (
    <div>
      <h1>Bienvenido a HOME</h1>
      <div id="calendar">
        <DialogProvider>
          <Calendar />
        </DialogProvider>
        <BtnLocation />
        <Map />
      </div>
    </div>
  );
};
