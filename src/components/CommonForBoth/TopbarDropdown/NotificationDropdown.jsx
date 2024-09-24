import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import SimpleBar from "simplebar-react";

// i18n
import { withTranslation } from "react-i18next";

import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { fetchNotificationsRequest } from "../../../store/notification/actions";
import { formatDistanceToNow, parseISO } from "date-fns";

const NotificationDropdown = (props) => {
  const [menu, setMenu] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const dispatch = useDispatch();
  const notificationProperties = createSelector(
    (state) => state.notificationReducer,
    (notificationReducer) => ({
      notifications: notificationReducer.notifications,
      loading: notificationReducer.loading,
      previledge: notificationReducer.previledge,
      error: notificationReducer.error,
    })
  );

  const { notifications, loading, previledge, error } = useSelector(
    notificationProperties
  );

  // Fetch notifications when the component mounts (e.g., when the dashboard loads)
  useEffect(() => {
    dispatch(fetchNotificationsRequest());
  }, [dispatch]);

  // Update the unread notification count based on notifications data
  useEffect(() => {
    if (notifications) {
      const unreadCount = notifications.filter(
        (notification) => notification.not_is_read === "0000-00-00 00:00:00"
      ).length;
      setUnreadNotifications(unreadCount);
    }
  }, [notifications]);

  // Function to format notification date to human-readable format
  const formatDate = (dateString) => {
    const parsedDate = parseISO(dateString); // Parse the string into a Date object
    return formatDistanceToNow(parsedDate, { addSuffix: true }); // Get a relative time format (e.g., "3 minutes ago")
  };

  // Function to handle dropdown toggle
  const toggleMenu = () => {
    setMenu(!menu);
    if (!menu) {
      setUnreadNotifications(0); // Reset unread notifications when user views them
    }
  };

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={toggleMenu}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon position-relative"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <i className="bx bx-bell bx-tada" />
          {unreadNotifications > 0 && (
            <span className="badge bg-danger rounded-pill">
              {unreadNotifications}
            </span>
          )}
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg p-0 dropdown-menu-end">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0"> {props.t("Notifications")} </h6>
              </Col>
              <div className="col-auto">
                <Link to={"/notifications"} className="small">
                  {" "}
                  View All
                </Link>
              </div>
            </Row>
          </div>
          {/* If notifications are loading */}
          {loading && <div className="p-3 text-center">Loading...</div>}

          {/* If there was an error */}
          {error && <div className="p-3 text-center text-danger">{error}</div>}

          {!loading && notifications?.length > 0 && (
            <SimpleBar style={{ height: "230px" }}>
              {notifications.map((notification, index) => (
                <Link
                  to=""
                  key={index}
                  className="text-reset notification-item"
                >
                  <div className="d-flex">
                    <div className="avatar-xs me-3">
                      <span className="avatar-title bg-primary rounded-circle font-size-16">
                        <i
                          className={`bx bx-${notification.not_type.toLowerCase()}`}
                        />
                      </span>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mt-0 mb-1">
                        {props.t(notification.not_type.toLowerCase())}
                      </h6>
                      <div className="font-size-12 text-muted">
                        <p className="mb-1">
                          {props.t(notification.not_detail)}
                        </p>
                        <p className="mb-0">
                          <i className="mdi mdi-clock-outline" />{" "}
                          {props.t(formatDate(notification.not_date))}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </SimpleBar>
          )}

          <div className="p-2 border-top d-grid">
            <Link
              className="btn btn-sm btn-link font-size-14 btn-block text-center"
              to="/notifications"
            >
              <i className="mdi mdi-arrow-right-circle me-1"></i>{" "}
              {props.t("View all")}{" "}
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default withTranslation()(NotificationDropdown);

NotificationDropdown.propTypes = {
  t: PropTypes.any,
};
