import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Row } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../components/Common/ChartsDynamicColor";
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from "reselect";
import { dashboardBlogVisitorData } from '../../store/actions';
import { blogStatsData } from "../../common/data";

const CardUser = ({ dataColors }) => {

  const apexCardUserChartColors = getChartColorsArray(dataColors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dashboardBlogVisitorData(1));
  }, [dispatch]);

  const DashboardblogProperties = createSelector(
    (state) => state.DashboardBlog,
    (dashboardBlog) => ({
      visitor: dashboardBlog.visitor
    })
  );

  const { visitor } = useSelector(DashboardblogProperties);

  const visitors = visitor[0] || [];
  const [activeTab, setActiveTab] = useState(1);

  const handleChangeChartData = (id) => {
    setActiveTab(id);
    dispatch(dashboardBlogVisitorData(id))
  }

  const series = [
    {
      name: "Current",
      data: visitors?.data?.CurrentData || [],
    },
    {
      name: "Previous",
      data: visitors?.data?.PreviousData || [],
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    colors: apexCardUserChartColors,
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
    markers: {
      size: 3,
      strokeWidth: 3,

      hover: {
        size: 4,
        sizeOffset: 2,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
  };

  return (
    <React.Fragment>
      <Col xl={8}>
        <Row>
          {(blogStatsData || [])?.map((stat, index) => (
            <Col lg={4} key={index}>
              <Card className="blog-stats-wid">
                <CardBody>
                  <div className="d-flex flex-wrap">
                    <div className="me-3">
                      <p className="text-muted mb-2">{stat.title}</p>
                      <h5 className="mb-0">{stat.value}</h5>
                    </div>
                    <div className="avatar-sm ms-auto">
                      <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                        <i className={stat.icon}></i>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>

        <Card>
          <CardBody>
            <div className="d-flex flex-wrap">
              <h5 className="card-title me-2">Visitors</h5>
              <div className="ms-auto">
                <div className="toolbar d-flex flex-wrap gap-2 text-end">
                  <button type="button" className={`btn btn-light btn-sm ${activeTab === 1 && "active"}`} onClick={() => handleChangeChartData(1)}>
                    ALL
                  </button>
                  <button type="button" className={`btn btn-light btn-sm ${activeTab === 2 && "active"}`} onClick={() => handleChangeChartData(2)}>
                    1M
                  </button>
                  <button type="button" className={`btn btn-light btn-sm ${activeTab === 3 && "active"}`} onClick={() => handleChangeChartData(3)}>
                    6M
                  </button>
                  <button type="button" className={`btn btn-light btn-sm ${activeTab === 4 && "active"}`} onClick={() => handleChangeChartData(4)}>
                    1Y
                  </button>
                </div>
              </div>
            </div>

            <Row className="text-center">
              <Col lg={4}>
                <div className="mt-4">
                  <p className="text-muted mb-1">Today</p>
                  <h5>{visitors.today}</h5>
                </div>
              </Col>

              <Col lg={4}>
                <div className="mt-4">
                  <p className="text-muted mb-1">This Month</p>
                  <h5>
                    {visitors.thisMonth}
                    <span className="text-success font-size-13"> 0.2 % <i className="mdi mdi-arrow-up ms-1"></i></span>
                  </h5>
                </div>
              </Col>

              <Col lg={4}>
                <div className="mt-4">
                  <p className="text-muted mb-1">This Year</p>
                  <h5>
                    {visitors.thisYear}
                    <span className="text-success font-size-13"> 0.1 % <i className="mdi mdi-arrow-up ms-1"></i>
                    </span>
                  </h5>
                </div>
              </Col>
            </Row>

            <hr className="mb-4" />

            <div id="area-chart" dir="ltr">
              <ReactApexChart options={options} series={series} type="area" height={350} className="apex-charts" />
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

CardUser.propTypes = {
  options: PropTypes.any,
  series: PropTypes.any
};

export default CardUser;