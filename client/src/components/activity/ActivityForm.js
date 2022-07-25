import React from "react";
import Dropdown from "react-select";
import DynamicList from "../../components/utils/DynamicList";
import { Multiselect } from "multiselect-react-dropdown";
import { multiSelectStyles } from "../../components/utils/other";

const ActivityForm = (props) => {
  const pStyles = { color: "rgb(11, 81, 138)", fontSize: "20px" };
  const {
    multiDropdownData: { studentsOptions, teachersOptions },
    multiDropdownHook: [selectedOptions, setselectedOptions],
    title,
    linksHook: [links, setLinks],
    dropDown: { dropDownOptions, dropDownOption, onDropSelect },
    values: { name, description, position, more_description },
    handleChange,
    clickSubmit,
    formValid,
    errors,
    dropDownError,
    setSubmit,
  } = props;

  return (
    <div id="form-margin" className="container text-center mt-5 py-3">
      <form>
        <p style={pStyles}>{title}</p>
        <div className="form-group">
          <input
            onChange={handleChange("name")}
            className={
              "form-control bg-transparent formInputs" +
              (errors.name ? " is-invalid" : "")
            }
            placeholder=" Title*"
            value={name}
            required
          />
          {<div style={{ color: "red" }}>{errors.name}</div>}
        </div>
        <div className="form-group">
          <Dropdown
            className="formInputs"
            options={dropDownOptions}
            onChange={onDropSelect}
            value={dropDownOption}
            placeholder="Status*"
          />
          {<div style={{ color: "red" }}>{dropDownError}</div>}
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("position")}
            className={
              "form-control bg-transparent formInputs" +
              (errors.position ? " is-invalid" : "")
            }
            placeholder="Your Role/Position*"
            value={position}
          />
          {<div style={{ color: "red" }}>{errors.position}</div>}
        </div>

        <div className="form-group">
          <Multiselect
            options={teachersOptions}
            selectedValues={selectedOptions.teacher}
            onSelect={(selectedList, _) => {
              setselectedOptions({
                ...selectedOptions,
                teacher: [...selectedList],
              });
            }}
            onRemove={(selectedList, _) => {
              setselectedOptions({
                ...selectedOptions,
                teacher: [...selectedList],
              });
            }}
            selectionLimit={5}
            displayValue="optionName"
            className="form-control bg-transparent"
            placeholder="Add Collaborator(s)"
            style={multiSelectStyles}
            hidePlaceholder
          />
        </div>
        <div className="form-group">
          <Multiselect
            options={studentsOptions}
            selectedValues={selectedOptions.student}
            onSelect={(selectedList, _) => {
              setselectedOptions({
                ...selectedOptions,
                student: [...selectedList],
              });
            }}
            onRemove={(selectedList, _) => {
              setselectedOptions({
                ...selectedOptions,
                student: [...selectedList],
              });
            }}
            selectionLimit={5}
            displayValue="optionName"
            className="form-control bg-transparent"
            placeholder="Add Student(s)"
            style={multiSelectStyles}
            hidePlaceholder
          />
        </div>

        <div className="form-group">
          <textarea
            rows="3"
            onChange={handleChange("description")}
            className={
              "form-control bg-transparent formInputs" +
              (errors.description ? " is-invalid" : "")
            }
            placeholder="Description*"
            value={description}
          />
          {<div style={{ color: "red" }}>{errors.description}</div>}
        </div>
        <div className="form-group">
          <DynamicList
            items={links}
            setItems={setLinks}
            className="form-control bg-transparent"
            placeholder="Add Links"
            id="links"
          />
        </div>
        <div className="form-group">
          <textarea
            onChange={handleChange("more_description")}
            rows={3}
            className={
              "form-control bg-transparent formInputs" +
              (errors.more_description ? " is-invalid" : "")
            }
            placeholder={`Is this project part of any competition?\nIs this a sponsored project?\nAny other details you might want to give..`}
            value={more_description}
          />
        </div>
        <div>
          <button
            id="edit-profile-submit"
            className="btn btn-primary"
            disabled={formValid}
            onClick={clickSubmit}
          >
            {setSubmit.message}
          </button>
          <br />
        </div>
      </form>
    </div>
  );
};

export default ActivityForm;
