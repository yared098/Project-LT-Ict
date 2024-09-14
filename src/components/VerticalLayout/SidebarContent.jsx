import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { Link, useLocation } from "react-router-dom";
import withRouter from "../Common/withRouter";

//i18n
import { withTranslation } from "react-i18next";
import { useCallback } from "react";

const SidebarContent = (props) => {
  const ref = useRef();
  const path = useLocation();

  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const activeMenu = useCallback(() => {
    const pathName = path.pathname;
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    new MetisMenu("#side-menu");
    activeMenu();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    activeMenu();
  }, [activeMenu]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            {/* dashboards */}
           
            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-home-circle"></i>
                <span>{props.t("Dashboards")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/dashboard">{props.t("Default")}</Link>
                </li>
                <li>
                  <Link to="/dashboard-saas">{props.t("Saas")}</Link>
                </li>
                <li>
                  <Link to="/dashboard-crypto">{props.t("Crypto")}</Link>
                </li>
                <li>
                  <Link to="/blog">{props.t("Blog")}</Link>
                </li>
                <li>
                  <Link to="/dashboard-job">{props.t("Job")}</Link>
                </li>
              </ul>
            </li>
            <li className="menu-title">{props.t("Apps")}</li>

           {/* Projects */}
            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-store"></i>
                <span>{props.t("Projects")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                    <Link to="/Project">{props.t("Project")}</Link>
                </li>
               
                <li>
                  <Link to="/projects-status">
                    {props.t("Projects Status")}
                  </Link>
                </li>
                {/* Poject Payment */}
                <li>
                  <Link to="/project_payment">
                    {props.t("Poject Payment")}
                  </Link>
                </li>
                {/* Project Document */}
                <li>
                  <Link to="/project_payment">
                    {props.t("Project Document")}
                  </Link>
                </li>
               
              
                {/* Project Contractor*/}
                <li>
                  <Link to="/project_contractor">{props.t("Project Contractor")}</Link>
                </li>
                {/*Project Stakeholder  */} 
                <li>
                  <Link to="/project_stakeholder">{props.t("Project Stakeholder")}</Link>
                </li>

                 {/* Budget Request */}
                 <li>
                  <Link to="/budget_request">{props.t("Budget Request")}</Link>
                </li>
               
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-receipt"></i>
                <span>{props.t("Address Structure")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
              
                <li>
                  <Link to="/address_structure">{props.t("Project Tree")}</Link>
                </li>
                
              </ul>
            </li>

    
             {/* LOOK UP */}
             <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-receipt"></i>
                <span>{props.t("LookUp ")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
              
                <li>
                  <Link to="/department">{props.t("Department")}</Link>
                </li>

                 {/* Project Category */}
                 <li>
                  <Link to="/project_category">{props.t("Project Category")}
                  </Link>
                </li>

                <li>
                  <Link to="/budget_source">{props.t("Budget Source")}</Link>
                </li>
                {/* Document Type */}
                <li>
                  <Link to="/document_type">{props.t("Document Type")}</Link>
                </li>
               
                {/* Budget Year */}
                <li>
                  <Link to="/budget_year">{props.t("Budget Year")}</Link>
                </li>
                {/* Contractor Type */}
                <li>
                  <Link to="/contractor_type">{props.t("Contractor Type")}</Link>
                </li>
                {/* Contract Termination Reason */}
                <li>
                  <Link to="/contract_termination_reason">{props.t("Contract Termination Reason")}</Link>
                </li>
                {/* Sector Information  */}
                <li>
                  <Link to="/Sector_information">{props.t("Sector Information ")}</Link>
                </li>
                {/* Stakeholder Type */}
                <li>
                  <Link to="/stakeholder_type">{props.t("Stakeholder Type ")}</Link>
                </li>
                {/* Sector Categor */}
                <li>
                  <Link to="/sector_category">{props.t("Sector Categor ")}</Link>
                </li>
              </ul>
            </li>
            {/* User  Admin*/}
            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-receipt"></i>
                <span>{props.t("User Administration ")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
              
                <li>
                  <Link to="/users">{props.t("Users")}</Link>
                </li>
                <li>
                  <Link to="/user_role">{props.t("User Role")}</Link>
                </li>
                <li>
                  <Link to="/Roles">{props.t("Roles")}</Link>
                </li>
                <li>
                  <Link to="/pages">{props.t("Pages")}</Link>
                </li>
                <li>
                  <Link to="/permission">{props.t("Permission")}</Link>
                </li>
                <li>
                  <Link to="/access_log">{props.t("Access Log")}</Link>
                </li>
                
               
              </ul>
            </li>

          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
