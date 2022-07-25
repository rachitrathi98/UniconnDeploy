import React, { useState, useEffect, Fragment } from "react";
import Dropdown from "react-select";

const PortDropdown = (props) => {
  /*
  // Do this in parent
  // parent hooks:
  const [collegeOptions, setColleges] = useState({})
  // Inside parent UseEffect:
  const c = await getAction("/colleges/?fields=_id name");
  if (c && c.status === 200) {
    if (c.data.data.data && c.data.data.data.length) setColleges(c.data.data.data.map(({ _id, name }) => ({ label: name, value: _id })))
  }
  */

  const labelStyles = {
    fontSize: "20px",
    color: "blue",
  };

  const { collegeOptions } = props;
  console.log("Teachers", props);
  const [dropDownOption, setdropDownOption] = useState();
  //HERE
  // const collegeOptions = [
  //   { label: "Sardar Patel Institute of Technology", value: "600f8dce6ec7a31aac5d77de" },
  //   { label: "Sardar ", value: "600f8dce6ec7a31aac5d77de" },
  // ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    collegeOptions.map((drop, index) => {
      //   if (drop.value === String(props.user.collegeId._id)) {
      // }
      setdropDownOption(drop);
      return null;
    });
    // eslint-disable-next-line
  }, []);

  const onDropSelect = (selectedItem) => {
    setdropDownOption(selectedItem);
  };

  const editTeacherForm = (
    <Fragment>
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
    </Fragment>
  );

  return editTeacherForm;
};

export default PortDropdown;
