import React, { useState, useEffect, Fragment } from "react";
import { patchAction, postAction } from "../../../services/generalServices";
import { Multiselect } from "multiselect-react-dropdown";
import Header from "../../../container/layout/Header";
import { options as multiOptions } from "../../utils/options";
import Dropdown from "react-select";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/auth";
import withAuth from "../../../utils/withAuth";
import DynamicList from "../../utils/DynamicList";
import default_display from "../../../assets/images/default.png";
import ImageUploader from "../../utils/ImageUploader";
import { toast } from "react-toastify";

const EditStudentProfile = (props) => {
  const pStyles = { color: "rgb(11, 81, 138)", fontSize: "30px" };

  const labelStyles = {
    fontSize: "20px",
    color: "blue",
  };

  const h4Styles = { fontSize: "1.8rem" };

  const imgStyles = { borderRadius: "50%", height: "8rem", width: "8rem" };

  const multiSelectStyles = {
    multiselectContainer: {
      margin: "0 auto",
      display: "inline-block",
    },
    searchBox: { borderRadius: "20px" },
    chips: { borderRadius: "20px" },
    optionContainer: { borderRadius: "20px" },
  };

  const {
    collegeDropdown: { collegeOptions, isDisabled },
  } = props;
  const [values, setValues] = useState({
    description: "",
    photo: "",
    collegeId: "",
    name: "",
    batch: "",
    branch: "",
  });
  const [constant, setconstant] = useState({
    emailId: "",
  });
  const [dropDownOption, setdropDownOption] = useState();
  const [submitValue, setsubmitValue] = useState({ message: "Submit" });
  const bio = "Briefly introduce yourself";
  const [multiDropdownOptions, setmultiDropdownOptions] = useState([]);
  const [multiOptionCheck, setmultiOptionCheck] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [errors, seterrors] = useState({});
  const [contact, setContact] = useState({
    phone_no: "",
    email: "",
  });
  const [links, setLinks] = useState([]);
  const { description, photo, branch, batch, name, university_id } = values;
  const { emailId } = constant;
  const { phone_no, email } = contact;

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
      case "batch":
        let batchRegex = new RegExp("^\\d{4}$");
        errors.batch = batchRegex.test(event.target.value)
          ? ""
          : "Enter the final year of completion";
        break;
      case "branch":
        if (!event.target.value) {
          errors.branch = "Required";
        } else if (event.target.value.length > 0) {
          errors.branch =
            event.target.value.length < 5
              ? "Branch Name must be greater than 5 characters"
              : "";
        }
        break;
      case "university_id":
        let uniidRegex = new RegExp("^\\d{7,10}$");
        errors.university_id = uniidRegex.test(event.target.value)
          ? ""
          : "Enter an id greater than 7 digits";
        break;
      // case 'description':
      // errors.description =
      // event.target.value.length < 1
      // ? 'Description cannot be blank'
      // : '';
      // break;
      default:
        break;
    }
  };

  //HERE
  // const collegeOptions = [
  //   {
  //     label: "Sardar Patel Institute of Technology",
  //     value: "6033d1a869c3534d56314092",
  //   },
  // ];
  const defaultPhoto = async (event) => {
    event.preventDefault();
    await patchAction(
      `/students/${props.user._id}`,
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
      collegeId: props.user.collegeId
        ? props.user.collegeId._id
        : { value: "", label: "select your college" },
      university_id: props.user.university_id,
      name: props.user.name,
      batch: props.user.batch,
      branch: props.user.branch,
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
        data.push({ name: field, id: index });
        return null;
      });

    if (props.user.links && props.user.links !== [])
      setLinks([...props.user.links]);

    collegeOptions.map((drop, index) => {
      if (
        props.user.collegeId &&
        drop.value === String(props.user.collegeId._id)
      ) {
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
      `/students/${props.user._id}`,
      { ...values, ...contact, ...constant, field_of_interest: field, links },
      (res) => {
        props.onAuth(async () => {
          if (window && window.location.href.includes("register"))
            await postAction("/auth/studentRegistration", {
              subject: "Welcome to UniConn!",
            });
          toast.success("Your profile has been updated");
          props.history.push(`/profile`);
        });
      },
    );
  };

  function validate(errors, values) {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    console.log("This is testing ", values, dropDownOption);
    return (
      !multiOptionCheck &&
      valid &&
      values.name &&
        values.name.length &&
        values.batch &&
        values.batch.length &&
        values.branch &&
        values.branch.length
    );
  }
  const onSelect = (selectedList, selectedItem) => {
    if (selectedList.length < 1) {
      setmultiOptionCheck(true);
    } else {
      setmultiDropdownOptions(selectedList);
      setmultiOptionCheck(false);
    }
  };
  // console.log(dropDownOption);
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
  return values.photo ? (
    <Fragment>
      <Header />
      <div>
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
                <i onClick={defaultPhoto} className="far fa-trash-alt"></i>{" "}
              </button>
            </div>
            <div className="form-group"></div>
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
                onChange={handleChange("batch")}
                type="text"
                placeholder="Batch*"
                defaultValue={batch}
                className={
                  "form-control bg-transparent formInputs" +
                  (errors.batch ? " is-invalid" : "")
                }
              />
              {<div style={{ color: "red" }}>{errors.batch}</div>}
            </div>
            <div className="form-group">
              <input
                id="dept"
                onChange={handleChange("branch")}
                type="text"
                placeholder="Branch*"
                defaultValue={branch}
                className={
                  "form-control bg-transparent formInputs" +
                  (errors.branch ? " is-invalid" : "")
                }
              />
              {<div style={{ color: "red" }}>{errors.branch}</div>}
            </div>
            <div className="form-group">
              <input
                id="dept"
                onChange={handleChange("university_id")}
                type="text"
                placeholder="UID/Roll No.*"
                defaultValue={university_id}
                className={
                  "form-control bg-transparent formInputs" +
                  (errors.university_id ? " is-invalid" : "")
                }
              />
              {<div style={{ color: "red" }}>{errors.university_id}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="multi-drop" style={labelStyles}>
                College*
              </label>
              <Dropdown
                id="multi-drop"
                options={collegeOptions}
                onChange={onDropSelect}
                value={dropDownOption}
                placeholder="Select your College*"
                isDisabled={isDisabled}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description" style={labelStyles}>
                About Me
              </label>
              <textarea
                onChange={handleChange("description")}
                defaultValue={description}
                type="text"
                rows="5"
                id="description"
                className={"form-control bg-transparent formInputs"}
                placeholder={bio}
              />
            </div>
            <p style={pStyles}>
              <label htmlFor="field_of_interest" style={labelStyles}>
                Fields of Interest (Maximum Limit 5 tags)*
              </label>
            </p>
            <div className="form-group">
              <Multiselect
                placeholder="Select Fields*"
                options={multiOptions}
                selectedValues={multiDropdownOptions}
                onSelect={onSelect}
                onRemove={onRemove}
                displayValue="name"
                id="field_of_interest"
                style={multiSelectStyles}
                selectionLimit={5}
              />
              {/* {multiOptionCheck && <div style={{ color: 'red' }}>Required</div>} */}
            </div>
            <p style={pStyles}>
              <label htmlFor="quick_links" style={labelStyles}>
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
                disabled={!validate(errors, values)}
              >
                <p style={{ marginBottom: 0 }} onClick={clickSubmit}>
                  {submitValue.message}
                </p>
              </button>
              <br />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  ) : null;
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onAuth: (callback) => dispatch(actions.auth(callback)),
  };
};

export default connect(
  null,
  mapDispatchtoProps,
)(withAuth("")(EditStudentProfile));
