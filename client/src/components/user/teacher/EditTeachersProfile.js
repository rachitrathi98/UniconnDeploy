import React, { useState, useEffect, Fragment } from "react";
import { patchAction, postAction } from "../../../services/generalServices";
import { Multiselect } from "multiselect-react-dropdown";
import Header from "../../../container/layout/Header";
import { options as multiOptions } from "../../utils/options";
import Dropdown from "react-select";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/auth";
import withAuth from "../../../utils/withAuth";
import ImageUploader from "../../utils/ImageUploader";
import DynamicList from "../../utils/DynamicList";
import default_display from "../../../assets/images/default.png";
import { toast } from "react-toastify";

const EditTeachersProfile = (props) => {
  const pStyles = { color: "rgb(11, 81, 138)", fontSize: "30px" };

  const labelStyles = {
    fontSize: "20px",
    color: "blue",
  };

  const h4Styles = { fontSize: "1.8rem" };

  const imgStyles = { borderRadius: "50%", height: "10rem" };

  const {
    collegeDropdown: { collegeOptions, isDisabled },
  } = props;
  const [values, setValues] = useState({
    description: "",
    photo: "",
    name: "",
    department: "",
    position: "",
  });
  const [constant, setconstant] = useState({
    emailId: "",
  });
  const [dropDownOption, setdropDownOption] = useState();
  // eslint-disable-next-line no-unused-vars
  const [errors, seterrors] = useState({});
  const [multiOptionCheck, setmultiOptionCheck] = useState(false);
  const [submitValue, setsubmitValue] = useState({ message: "Submit" });

  let rightHandSide = (
    <span style={{ fontSize: "18px" }} className="float-right">
      <small style={{ fontSize: "20px", fontWeight: "800" }}>SUGGESTIONS</small>
      <br />
      <small>Years of experience and current designation?</small>
      <br />
      <small>Previously worked at?</small>
      <br />
      <small>Highlighting achievement?</small>
      <br />
      <small>Current and previous positions of responsibilities if any?</small>
      <br />
      <small>Voluntary work if any?</small>
      <br />
      <br />
      <br />
      <small style={{ fontSize: "20px", fontWeight: "800" }}>NOTE</small>
      <br />
      <small>
        If you find your field of interest missing
        <br />
        Please fill the suggestions form at the bottom of the profile
        <br />
        page and we will add it to the list ASAP
      </small>
    </span>
  );

  //   const placeholderBio = `Years of experience and current designation?
  // Previously worked at?
  // Highlighting achievement?
  // Current and previous positions of responsibilities if any?
  // Voluntary work if any?`;
  const placeholderBio =
    "Suggested Points About Which You Can Write Are To The Right";

  const [multiDropdownOptions, setmultiDropdownOptions] = useState([]);
  const [contact, setContact] = useState({
    phone_no: "",
    email: "",
  });
  const { description, photo, position, department, name } = values;
  const { emailId } = constant;
  const { phone_no, email } = contact;
  const [links, setLinks] = useState([]);
  const [educational_qualification, setEducationalQualification] = useState([]);
  const handleChange = (name) => (event) => {
    if (name in values) setValues({ ...values, [name]: event.target.value });
    if (name in contact) setContact({ ...contact, [name]: event.target.value });
    switch (name) {
      case "name":
        if (!event.target.value) {
          errors.name = "Required";
        } else if (event.target.value.length > 0) {
          errors.name =
            event.target.value.length < 5
              ? "Name must be greater than 5 characters"
              : "";
        }
        break;
      case "department":
        if (!event.target.value) {
          errors.department = "Required";
        } else if (event.target.value.length > 0) {
          errors.department =
            event.target.value.length < 5
              ? "Department name must be greater than 5 characters"
              : "";
        }
        break;
      case "position":
        if (!event.target.value) {
          errors.position = "Required";
        } else if (event.target.value.length > 0) {
          errors.position =
            event.target.value.length < 5
              ? "Postion must be greater than 5 characters"
              : "";
        }
        break;
      default:
        break;
    }
  };
  const multiSelectStyles = {
    multiselectContainer: {
      margin: "0 auto",
      display: "inline-block",
    },
    searchBox: { borderRadius: "20px" },
    chips: { borderRadius: "20px" },
    optionContainer: { borderRadius: "20px" },
  };
  //HERE
  // const collegeOptions = [
  //   {
  //     label: "Sardar Patel Institute of Technology",
  //     value: "6033d1a869c3534d56314092",
  //   },
  //   {
  //     label: "K J Somaiya",
  //     value: "600f8dce6ec7a31aac5d732de",
  //   },
  // ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    let data = [];

    setValues({
      description: props.user.description,
      photo:
        props.user.photo === "default.png"
          ? default_display
          : process.env.NODE_ENV === "production"
          ? `${process.env.REACT_APP_BASE_URL}/api/auth/${props.user.photo}`
          : `http://localhost:${process.env.PORT}/api/auth/${props.user.photo}`,
      name: props.user.name,
      department: props.user.department,
      position: props.user.position,
    });

    setconstant({
      emailId: props.user.emailId,
    });

    if (props.user.contact)
      setContact({
        phone_no: props.user.contact.phone_no,
        email: props.user.contact.email,
      });

    if (props.user.field_of_interest)
      props.user.field_of_interest.map((field, index) => {
        if (index < 10) data.push({ name: field, id: index });
        return null;
      });

    if (props.user.links && props.user.links !== [])
      setLinks([...props.user.links]);

    setEducationalQualification(props.user.educational_qualification);

    collegeOptions.map((drop, index) => {
      console.log(drop, props.user);

      if (
        props.user.collegeId &&
        drop.value === String(props.user.collegeId._id)
      ) {
        console.log(drop, props.user.collegeId);
        setdropDownOption(drop);
      }

      return null;
    });

    setmultiDropdownOptions(data);
    // eslint-disable-next-line
  }, []);

  const clickSubmit = async (event) => {
    event.preventDefault();
    setsubmitValue({ message: "Submitting" });
    const field = multiDropdownOptions.map(({ name }) => name);

    await patchAction(
      `/teachers/${props.user._id}`,
      {
        ...values,
        ...contact,
        ...constant,
        field_of_interest: field,
        links,
        // collegeId: dropDownOption ? dropDownOption.value : undefined,
        educational_qualification: educational_qualification,
      },
      (res) => {
        props.onAuth(async () => {
          await postAction(
            "/auth/teacherRegistration",
            { subject: "Welcome to UniConn!" },
            () => {
              toast.success("Your profile has been updated");
              props.history.push(`/profile`);
            },
          );
        });
      },
    );
  };
  function validate(errors, values) {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return (
      !multiOptionCheck &&
      valid &&
      (values.name &&
        values.name.length &&
        values.department &&
        values.department.length &&
        values.position &&
        values.position.length) !== 0
    );
  }
  const defaultPhoto = async (event) => {
    event.preventDefault();
    await patchAction(
      `/teachers/${props.user._id}`,
      {
        defaultPhoto: true,
      },
      (res) => {
        props.onAuth(() => {
          props.history.push(`/profile`);
          window.location.reload();
        });
      },
    );
  };

  const onSelect = (selectedList, selectedItem) => {
    if (selectedList.length < 1) {
      setmultiOptionCheck(true);
    } else {
      setmultiDropdownOptions(selectedList);
      setmultiOptionCheck(false);
    }
  };

  const onRemove = (selectedList, removedItem) => {
    if (selectedList.length < 1) {
      setmultiOptionCheck(true);
    } else {
      setmultiOptionCheck(false);
    }
    setmultiDropdownOptions(selectedList);
  };

  const onDropSelect = (selectedItem) => {
    setdropDownOption(selectedItem);
    setValues({ ...values, collegeId: selectedItem.value });
  };

  return (
    <Fragment>
      <Header />
      <div>
        <p className="float-right bio">
          {/* <span id="triangle-up"></span> */}
          {rightHandSide}
        </p>
        <div
          id="edit-student-teacher"
          className="container text-center mt-5 py-3"
        >
          {props.isProfile ? null : (
            <Fragment>
              <h4 className="display-4 d-none d-lg-block" style={h4Styles}>
                Welcome To UniConn
              </h4>
              <p className="d-block d-lg-none" style={h4Styles}>
                Welcome To UniConn
              </p>
            </Fragment>
          )}
          <form>
            <p style={pStyles}>MY PROFILE</p>
            <div className="form-group profile-pic">
              <img src={photo} alt="Profile " style={imgStyles} />
              <div className="edit-button">
                <ImageUploader
                  onAuth={props.onAuth}
                  history={props.history}
                  _id={props.user._id}
                  role={props.user.role}
                />
              </div>
              <button className="float-right btn btn-danger btn-sm mx-2">
                <i
                  className="far fa-trash-alt"
                  onClick={(e) => defaultPhoto(e)}
                ></i>{" "}
              </button>
            </div>
            <div className="form-group">
              <li className="my-2">
                Sections marked with a star(*) are compulsory
              </li>
              <label htmlFor="name" style={labelStyles}>
                Personal Information*
              </label>
              <input
                id="name"
                onChange={handleChange("name")}
                type="text"
                placeholder="Name*"
                value={name}
                className={
                  "form-control bg-transparent formInputs" +
                  (errors.name ? " is-invalid" : "")
                }
              />
              {<div style={{ color: "red" }}>{errors.name}</div>}
            </div>
            <div className="form-group">
              <input
                id="dept"
                onChange={handleChange("department")}
                type="text"
                placeholder="Department*"
                value={department}
                className={
                  "form-control bg-transparent formInputs" +
                  (errors.department ? " is-invalid" : "")
                }
              />
              {<div style={{ color: "red" }}>{errors.department}</div>}
            </div>
            <div className="form-group">
              <input
                id="dept"
                onChange={handleChange("position")}
                type="text"
                placeholder="Position*"
                value={position}
                className={
                  "form-control bg-transparent formInputs" +
                  (errors.position ? " is-invalid" : "")
                }
              />
              {<div style={{ color: "red" }}>{errors.position}</div>}
            </div>
            {/* <div className="form-group">
              <Dropdown
                id="multi-drop"
                options={collegeOptions}
                onChange={onDropSelect}
                value={dropDownOption}
                placeholder="Select your College*"
                isDisabled={isDisabled}
              />
            </div> */}
            <div className="form-group">
              <label htmlFor="description" style={labelStyles}>
                About Me
              </label>
              <textarea
                onChange={handleChange("description")}
                value={description}
                type="text"
                rows="5"
                id="description"
                className="form-control bg-transparent formInputs"
                placeholder={placeholderBio}
              />
            </div>
            <p style={pStyles}>
              <label htmlFor="field_of_interest" style={labelStyles}>
                Fields of Interest(Maximum Limit 5 Tags)*
              </label>
            </p>
            <div className="form-group">
              <Multiselect
                options={multiOptions}
                selectedValues={multiDropdownOptions}
                onSelect={onSelect}
                onRemove={onRemove}
                displayValue="name"
                className="form-control bg-transparent"
                placeholder="Select*"
                id="field_of_interest"
                style={multiSelectStyles}
                selectionLimit={5}
                hidePlaceholder
              />
              {/* {multiOptionCheck && <div>
                <p>Required</p>
            </div>}  */}
            </div>
            <p style={pStyles}>
              <label htmlFor="educational_qualification" style={labelStyles}>
                Educational Qualification
              </label>
            </p>
            <div className="form-group">
              <DynamicList
                items={educational_qualification}
                setItems={setEducationalQualification}
                className="form-control bg-transparent"
                placeholder="Enter your Educational Qualifications"
                id="educational_qualification"
                style={multiSelectStyles}
              />
            </div>
            <p style={pStyles}>
              <label htmlFor="educational_qualification" style={labelStyles}>
                Quick Links
              </label>
            </p>
            <div className="form-group">
              <DynamicList
                items={links}
                setItems={setLinks}
                className="form-control bg-transparent"
                placeholder="GitHub, LinkedIn, Youtube etc"
                id="links"
                style={multiSelectStyles}
              />
            </div>
            <label style={labelStyles}>Contact Information</label>
            <div className="form-group">
              <input
                id="email"
                defaultValue={emailId}
                disabled={true}
                className="form-control bg-transparent formInputs"
              />
            </div>
            <div className="form-group">
              <input
                onChange={handleChange("email")}
                defaultValue={email}
                type="text"
                className="form-control bg-transparent formInputs"
                placeholder="Optional Email"
              />
            </div>
            <div className="form-group">
              <input
                onChange={handleChange("phone_no")}
                defaultValue={phone_no}
                type="text"
                className="form-control bg-transparent formInputs"
                placeholder="Phone No."
              />
            </div>
            <div>
              <button
                id="edit-profile-submit"
                className="btn btn-primary"
                type="button"
                disabled={!validate(errors, values)}
              >
                <p style={{ marginBottom: 0 }} onClick={(e) => clickSubmit(e)}>
                  {submitValue.message}
                </p>
              </button>
              <br />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onAuth: (callback) => dispatch(actions.auth(callback)),
  };
};

export default connect(
  null,
  mapDispatchtoProps,
)(withAuth("")(EditTeachersProfile));
