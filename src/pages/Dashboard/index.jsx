import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import axios from 'axios'; // Axios for API requests
import DashboardComponent from "./Dashboardcomp";
//i18n
import { withTranslation } from "react-i18next";


const Dashboard = () => {
  const role="Deputy";


  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to make a POST request
    const fetchData = async () => {
      try {
        setLoading(true);
        // Define the payload to be sent in the POST request
        const payload = { role }; // Sending the role in the request body
        
        // Making the POST request to the API
        const response = await axios.post('https://pmsor.awashsol.com/api/dashboard_builder', {
          headers: {
            'Content-Type': 'application/json', // Ensure correct content type
          },
        });

        // Set the data from the response (assuming response.data.data is the actual data)
        setData(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
        setLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [role]); // Refetch data if the role changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  // Find data for the given role
  const roleData = data?.find((item) => item.role === role);

  if (!roleData) {
    return <p>Role not found</p>;
  }


  //meta title
  document.title = "Dashboard | Skote - Vite React Admin & Dashboard Template";

  return (
    <React.Fragment>

      <div className="container" style={{ paddingTop: '80px' }} >
        <div className="row">
          {JSON.parse(roleData.components).map((component, index) => (
            <div
              key={index}
              className="col-md-4 mb-4" // 3 columns, 4 units each (12 / 3 = 4)
            >
              <DashboardComponent
                dashboardType={component.dashboard_type}
                objectName={component.name}
                columnList={component.column_list}
                endPoint={component.end_point}
              />
            </div>
          ))}
        </div>
      </div>

    </React.Fragment>
  );
  };
  
  export default withTranslation()(Dashboard);
  
