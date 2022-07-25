import React, { Fragment } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import Dropdown from "react-select";
import DynamicList from "../../components/utils/DynamicList";
import { multiSelectStyles } from "../../components/utils/other";

const ProjectForm = (props) => {
  const pStyles = { color: "rgb(11, 81, 138)", fontSize: "25px" };
  const {
    multiDropdownData: { studentsOptions, teachersOptions, field_of_interest },
    multiDropdownHook: [selectedOptions, setselectedOptions],
    projectStatusDropdown: { dropDownOptions, dropDownSelected, onDropSelect },
    publicationHook: [publication, setPublication],
    linksHook: [links, setLinks],
    title,
    clickSubmit,
    handleChange,
    errors,
    setSubmit,
    formValid,
    values: { name, description, more_description },
  } = props;

  // minor TODO : Find a way to reduce the coding effort for onSelect={(selectedList, _) => {
  //               setselectedOptions({
  //                 ...selectedOptions,
  //                 student: [...selectedList],
  //               });
  //             }}

  return (
    <Fragment>
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
              placeholder="Project Title*"
              value={name}
            />
            {<div style={{ color: "red" }}>{errors.name}</div>}
          </div>
          <div className="form-group">
            <Dropdown
              // className="formInputs"
              options={dropDownOptions}
              onChange={onDropSelect}
              value={dropDownSelected}
              placeholder="Project Status*"
            />
            {/* {<div style={{ color: 'red' }}>{dropDownError}</div> } */}
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
            <Multiselect
              options={field_of_interest}
              selectedValues={selectedOptions.field_of_interest}
              onSelect={(selectedList, _) => {
                setselectedOptions({
                  ...selectedOptions,
                  field_of_interest: [...selectedList],
                });
              }}
              onRemove={(selectedList, _) => {
                setselectedOptions({
                  ...selectedOptions,
                  field_of_interest: [...selectedList],
                });
              }}
              selectionLimit={5}
              displayValue="name"
              className="form-control bg-transparent"
              placeholder="Field(s) Of Project*"
              style={multiSelectStyles}
              hidePlaceholder
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              type="text"
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
              items={publication}
              setItems={setPublication}
              className="form-control bg-transparent"
              placeholder="DOI of project"
              id="publication"
            />
          </div>
          <div className="form-group">
            <DynamicList
              items={links}
              setItems={setLinks}
              className="form-control bg-transparent"
              placeholder="Add links"
              id="links"
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("more_description")}
              type="text"
              rows="3"
              className={
                "form-control bg-transparent formInputs" +
                (errors.more_description ? " is-invalid" : "")
              }
              placeholder={`Is this project part of any competition?\n Is this a sponsored project?\n Any other details you might want to give..`}
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
    </Fragment>
  );
};

export default ProjectForm;
