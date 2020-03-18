import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Notifications from "@material-ui/icons/Notifications";
import NotificationsOff from "@material-ui/icons/NotificationsOff";
import NotificationImportant from "@material-ui/icons/NotificationImportant";

import {
  isNotificationEnabled,
  isNotificationBlocked,
  requestPermissionToNotify
} from "../notification";
import { showMessageDialog } from "../morpheus/store/actions";

const NotificationCheckbox = ({ onChange, openMessageDialog, isDisabled }) => {
  const [isAllowed, toggleAllowed] = useState(isNotificationEnabled());

  if (!isAllowed) {
    return (
      <Tooltip title="Forneça permissões de notificacão">
        <IconButton
          aria-label="Exit room"
          aria-controls="menu-appbar"
          onClick={() => {
            if (isNotificationBlocked()) {
              openMessageDialog(
                "Notificacões bloqueada",
                "Você deve permitir que as notificacões na configuracão do seu browser."
              );
            } else {
              requestPermissionToNotify(hasPermission => {
                if (hasPermission) {
                  toggleAllowed(true);
                }
              });
            }
          }}
          color="inherit"
        >
          <NotificationImportant />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Tooltip title={`${isDisabled ? "Enable" : "Disable"} notification`}>
      <Checkbox
        icon={<Notifications />}
        checkedIcon={<NotificationsOff />}
        checked={isDisabled}
        onChange={onChange}
      />
    </Tooltip>
  );
};

NotificationCheckbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  openMessageDialog: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired
};

const mapDispatchToProps = {
  openMessageDialog: showMessageDialog
};

export default connect(
  null,
  mapDispatchToProps
)(NotificationCheckbox);
