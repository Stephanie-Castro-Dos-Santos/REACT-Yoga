// hooks/useCalendar.js
import { useCallback, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarContext, DialogContext, AuthContext } from "../contexts/index";

export const useCalendar = () => {
  const { selectEvent, calendarId, roleType } = useContext(CalendarContext);
  const { openDialog } = useContext(DialogContext);
  const { isAuthenticated, role, initialRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const clickRef = useRef(null);

  const handleSelectSlot = useCallback(
    (slotInfo) => {
      if (!isAuthenticated) {
        navigate("/auth");
        return;
      }

      console.log("ROLE USECALENDAR:" + role);

      if (role == "student" || roleType == "public") {
        return;
      }

      window.clearTimeout(clickRef.current);
      clickRef.current = window.setTimeout(() => {
        const startDate = slotInfo.start;
        const endDate = slotInfo.end;

        openDialog("operation", {
          dialogMode: "CREATE",
          calendarId: calendarId,
          start: startDate,
          end: endDate,
        });
      }, 200);
    },
    [openDialog, calendarId, isAuthenticated, role, roleType, navigate]
  );

  const handleSelectEvent = useCallback(
    (event) => {
      window.clearTimeout(clickRef.current);
      clickRef.current = window.setTimeout(() => {
        selectEvent(event);
        openDialog("resume", event);
      }, 250);
    },
    [openDialog, selectEvent]
  );

  return {
    handleSelectSlot,
    handleSelectEvent,
  };
};
