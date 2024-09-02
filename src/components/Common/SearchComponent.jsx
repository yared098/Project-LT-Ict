import { useState } from "react";
import { useDispatch } from "react-redux";
import { PERFORM_SEARCH_REQUEST } from "../../store/search/actionTypes";
import { useTranslation } from "react-i18next";

const SearchComponent = ({ data, dropdown }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFields, setSelectedFields] = useState(dropdown.map(() => ""));
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFieldChange = (index, e) => {
    const newSelectedFields = [...selectedFields];
    newSelectedFields[index] = e.target.value;
    setSelectedFields(newSelectedFields);
  };

  const performSearch = () => {
    dispatch({
      type: PERFORM_SEARCH_REQUEST,
      payload: {
        searchTerm,
        selectedFields,
      },
    });
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
            className="btn btn-success rounded-lg"
          >
            {t('Search')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchComponent;
