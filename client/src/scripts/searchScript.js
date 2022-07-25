/* eslint-disable array-callback-return */
// eslint-disable-next-line no-unused-vars
import * as important_for_loading from "typeahead.js";
import * as $ from "jquery";

export const loadSearch = (profileList, callback) => {
  const existingScript = document.getElementById("searchScript");
  let nameMap = {};
  let profileName = profileList.map((info) => {
    if (nameMap[info.name] === undefined) {
      nameMap[info.name] = 1;
      return info.name;
    }
  });
  console.log(important_for_loading);
  if (!existingScript) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://twitter.github.io/typeahead.js/releases/latest/typeahead.bundle.min.js";
    script.id = "searchScript";
    document.head.appendChild(script);

    script.onload = () => {
      setList(profileName);
      if (callback) callback();
    };
  } else {
    setList(profileName);
    if (callback) callback();
  }
};

const setList = (profileName) => {
  let test = new window.Bloodhound({
    datumTokenizer: window.Bloodhound.tokenizers.whitespace,
    queryTokenizer: window.Bloodhound.tokenizers.whitespace,
    local: profileName,
  });

  $("#searchBarStudent").typeahead(
    {
      hint: true,
      highlight: true /* Enable substring highlighting */,
      minLength: 0 /* Specify minimum characters required for showing suggestions */,
    },
    {
      name: "common",
      source: test,
    },
  );
};
