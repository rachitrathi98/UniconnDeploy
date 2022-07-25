import React, { useState, useEffect, Fragment } from "react";
import { patchAction } from "../../../services/generalServices";
import { Multiselect } from "multiselect-react-dropdown";
import Header from "../../../container/layout/Header";
import { options as multiOptions } from "../../utils/options";
import Dropdown from "react-select";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/auth";
import withAuth from "../../../utils/withAuth";

const EditAdminProfile = (props) => {
  const pStyles = { color: "rgb(11, 81, 138)", fontSize: "30px" };

  const labelStyles = {
    fontSize: "20px",
    color: "blue",
  };

  const h4Styles = { fontSize: "1.8rem" };

  const imgStyles = { borderRadius: "50%", height: "10rem" };

  const { collegeOptions } = props;
  const [values, setValues] = useState({
    description: "",
    photo: "",
    collegeId: "",
    name: "",
    batch: "",
    branch: "",
    links: "",
  });
  const [constant, setconstant] = useState({
    emailId: "",
  });
  const [dropDownOption, setdropDownOption] = useState();

  const bio = "hello";
  const [multiDropdownOptions, setmultiDropdownOptions] = useState([]);
  const [contact, setContact] = useState({
    website: "",
    github: "",
    linkedIn: "",
    phone_no: "",
    email: "",
  });
  const { description, photo, branch, batch, name } = values;
  const { emailId } = constant;
  const { website, github, linkedIn, phone_no, email } = contact;

  const handleChange = (name) => (event) => {
    if (name in values) setValues({ ...values, [name]: event.target.value });
    if (name in contact) setContact({ ...contact, [name]: event.target.value });
  };

  const multiSelectStyles = {
    multiselectContainer: {
      width: "90%",
      margin: "0 auto",
      display: "inline-block",
    },
    searchBox: { borderRadius: "20px" },
    chips: { borderRadius: "20px" },
    optionContainer: { borderRadius: "20px" },
  };
  // HERE
  // const collegeOptions = [
  //   {
  //     label: "Sardar Patel Institute of Technology",
  //     value: "600f8dce6ec7a31aac5d77de",
  //   },
  // ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    let data = [];
    console.log("asa", props.user);

    setValues({
      description: props.user.description,
      photo: props.user.photo,
      links: props.user.links ? props.user.links.join(", ") : "",
      collegeId: props.user.collegeId,
      name: props.user.name,
      batch: props.user.batch,
      branch: props.user.branch,
    });
    setconstant({
      emailId: props.user.emailId,
    });
    if (props.user.contact)
      setContact({
        website: props.user.contact.website,
        github: props.user.contact.github,
        linkedIn: props.user.contact.linkedIn,
        phone_no: props.user.contact.phone_no,
        email: props.user.contact.email,
      });
    if (props.user.field_of_interest)
      props.user.field_of_interest.map((field, index) => {
        data.push({ name: field, id: index });
        return null;
      });

    // collegeOptions.map((drop, index) => {
    //   if (drop.value === String(props.user.collegeId)) {
    //     setdropDownOption(drop);
    //   }
    //   return null;
    // });
    setmultiDropdownOptions(data);
    // eslint-disable-next-line
  }, []);

  const clickSubmit = async (event) => {
    event.preventDefault();

    let fields = "";
    multiDropdownOptions.map((field, index) => {
      if (multiDropdownOptions.length - 2 >= index) {
        if (field !== undefined) fields += `${field.name},`;
      } else {
        if (field !== undefined) fields += `${field.name}`;
      }
      return null;
    });
    await patchAction(
      `/students/${props.user._id}`,
      { ...values, ...contact, ...constant, field_of_interest: fields },
      (res) => {
        props.onAuth(() => {
          props.history.push(`/profile`);
          window.location.reload();
        });
      },
    );
    // window.location.reload();
  };

  const onSelect = (selectedList, selectedItem) => {
    if (selectedList.length < 10) {
      setmultiDropdownOptions(selectedList);
    }
  };

  const onRemove = (selectedList, removedItem) => {
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
        <div id="form-margin" className="container text-center mt-5 py-3">
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
            <p style={pStyles}>
              PERSONAL INFORMATION
              <i className="far fa-question-circle ml-3"></i>
              <p className="hover-element">wkejfbkwejf</p>
            </p>
            <div className="form-group profile-pic">
              <img
                src={`/images/users/${photo}`}
                alt="Profile "
                style={imgStyles}
              />
              <div className="edit">
                <Link to={`/`}>
                  <i className="fa fa-pencil fa-lg"></i>
                </Link>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="name" style={labelStyles}>
                Name
              </label>
              <input
                id="name"
                onChange={handleChange("name")}
                type="text"
                placeholder="Name"
                value={name}
                className="form-control bg-transparent formInputs"
              />
            </div>
            <div className="form-group">
              <label htmlFor="dept" style={labelStyles}>
                batch
              </label>
              <input
                id="dept"
                onChange={handleChange("batch")}
                type="text"
                placeholder="Batch"
                defaultValue={batch}
                className="form-control bg-transparent formInputs"
              />
            </div>
            <div className="form-group">
              <label htmlFor="dept" style={labelStyles}>
                branch
              </label>
              <input
                id="dept"
                onChange={handleChange("branch")}
                type="text"
                placeholder="branch"
                defaultValue={branch}
                className="form-control bg-transparent formInputs"
              />
            </div>
            <div className="form-group">
              <label htmlFor="multi-drop" style={labelStyles}>
                College
              </label>
              <Dropdown
                id="multi-drop"
                options={collegeOptions}
                onChange={onDropSelect}
                value={dropDownOption}
                placeholder="Select your College"
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
                className="form-control bg-transparent formInputs"
                placeholder={bio}
              />
            </div>
            <p style={pStyles}>
              <label htmlFor="field_of_interest" style={labelStyles}>
                Fields of Interest
              </label>
              <i className="far fa-question-circle ml-3"></i>
              <p className="hover-element"> Max Limit 7 Tags </p>
            </p>
            <div className="form-group">
              <Multiselect
                options={multiOptions}
                selectedValues={multiDropdownOptions}
                onSelect={onSelect}
                onRemove={onRemove}
                displayValue="name"
                className="form-control bg-transparent"
                placeholder=""
                id="field_of_interest"
                style={multiSelectStyles}
              />
            </div>
            <label style={labelStyles}>Quick Links</label>
            <div className="form-group">
              <input
                onChange={handleChange("website")}
                defaultValue={website}
                type="text"
                className="form-control bg-transparent formInputs"
                placeholder="Website link"
              />
            </div>
            <div className="form-group">
              <input
                onChange={handleChange("github")}
                defaultValue={github}
                type="text"
                className="form-control bg-transparent formInputs"
                placeholder="Github link"
              />
            </div>
            <div className="form-group">
              <input
                onChange={handleChange("linkedIn")}
                defaultValue={linkedIn}
                type="text"
                className="form-control bg-transparent formInputs"
                placeholder="LinkedIn link"
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
                onClick={clickSubmit}
              >
                Submit
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
)(withAuth("")(EditAdminProfile));
