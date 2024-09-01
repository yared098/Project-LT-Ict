import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchComponent = ({ data, dropdown }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFields, setSelectedFields] = useState(dropdown.map(() => "")); // Initialize with empty strings for each dropdown

  useEffect(() => {
    setFilteredData(data); // Initialize filteredData with the entire data array
  }, [data]);

  const performSearch = () => {
    const term = searchTerm.toLowerCase();

    const filtered = data.filter(item =>
      selectedFields.some(field => field && item[field]?.toLowerCase().includes(term))
    );

    setFilteredData(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFieldChange = (dropdownIndex, e) => {
    const newFields = [...selectedFields];
    newFields[dropdownIndex] = e.target.value;
    setSelectedFields(newFields);
  };

  return (
    <div className="container-fluid mt-4">
      <form className="d-flex flex-wrap align-items-center mb-3">
        <div className="form-group me-2 mb-2 flex-grow-1">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="form-control"
          />
        </div>
        {dropdown.map((dropdownOptions, dropdownIndex) => (
          <div key={dropdownIndex} className="form-group me-2 mb-2 flex-grow-1">
            <select
              value={selectedFields[dropdownIndex]}
              onChange={(e) => handleFieldChange(dropdownIndex, e)}
              className="form-select"
            >
              <option value="">Select a field</option>
              {dropdownOptions.map((opt, index) => (
                <option key={index} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}
        <div className="form-group mb-2 flex-shrink-0">
          <button
            type="button"
            onClick={performSearch}
            className="btn btn-primary"
          >
            Search
          </button>
        </div>
      </form>
      <ul className="list-group">
        {Array.isArray(filteredData) && filteredData.map((item, index) => (
          <li key={index} className="list-group-item">
            <div><strong>OR Name:</strong> {item.prs_status_name_or}</div>
            <div><strong>Amharic Name:</strong> {item.prs_status_name_am}</div>
            <div><strong>English Name:</strong> {item.prs_status_name_en}</div>
            <div><strong>Color Code:</strong> {item.prs_color_code}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
