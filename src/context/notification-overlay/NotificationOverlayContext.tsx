import React from "react";

type NotificationOverlayAction = {
  type: "SHOW_NOTIFICATION_OVERLAY";
  payload: NotificationOverlayType;
};

interface NotificationOverlayType {
  show: boolean | undefined;
}

interface NotificationOverlayContextType extends NotificationOverlayType {
  showNotificationOverlay(show: boolean): void;
}

const initialState: NotificationOverlayType = {
  show: undefined
};

const reducer = (state: NotificationOverlayType, action: NotificationOverlayAction): NotificationOverlayType => {
  if (action.type === "SHOW_NOTIFICATION_OVERLAY") {
    return { ...state, show: action.payload.show };
  }

  return state;
};

export const NotificationOverlayContext = React.createContext<NotificationOverlayContextType>(
  initialState as NotificationOverlayContextType
);

export const NotificationOverlayContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [notificationOverlay, dispatch] = React.useReducer(reducer, initialState);

  function showNotificationOverlay(show: boolean): void {
    dispatch({
      type: "SHOW_NOTIFICATION_OVERLAY",
      payload: {
        show: show
      }
    });
  }

  return (
    <NotificationOverlayContext.Provider
      value={{
        ...notificationOverlay,
        showNotificationOverlay
      }}
    >
      {children}
    </NotificationOverlayContext.Provider>
  );
};
