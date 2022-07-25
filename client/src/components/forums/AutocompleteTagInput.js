import React, { useRef } from "react";

import ReactTags from "react-tag-autocomplete";

const AutocompleteTagInput = (props) => {
  const reactTags = useRef(null);

  console.log("current tags", props.tags);
  return (
    <div>
      <ReactTags
        placeholderText="Add New Tag"
        ref={reactTags}
        tags={props.tags}
        suggestions={props.suggestions}
        onDelete={() => props.onDelete()}
        onAddition={(tag) => props.onAddition(tag)}
        allowNew={true} // allows new tags
      />
    </div>
  );
};

export default AutocompleteTagInput;
