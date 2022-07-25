import React, { Fragment } from "react";

export function Links(props) {
  const linkFontSize = { fontSize: "1.7rem" };
  // links=student.links
  return props.links && props.links.length
    ? props.links.map((link, key) => {
        if (!link.startsWith("http://") && !link.startsWith("https://"))
          link = "https://" + link;
        return link ? (
          <Fragment key={key}>
            <div className="text-dark d-inline-flex">
              {link.includes("linkedin") ? (
                <i
                  style={linkFontSize}
                  className="fab fa-linkedin mt-2 mx-2"
                  onClick={() => {
                    window.open(link, "_blank");
                  }}
                ></i>
              ) : link.includes("github") ? (
                <i
                  style={linkFontSize}
                  className="fab fa-github mt-2 mx-2"
                  onClick={() => {
                    window.open(link, "_blank");
                  }}
                ></i>
              ) : link.includes("youtube") ? (
                <i
                  style={linkFontSize}
                  className="fab fa-youtube mt-2 mx-2"
                  onClick={() => {
                    window.open(link, "_blank");
                  }}
                ></i>
              ) : link.includes("drive.google") ? (
                <i
                  style={linkFontSize}
                  className="fab fa-google-drive mt-2 mx-2"
                  onClick={() => {
                    window.open(link, "_blank");
                  }}
                ></i>
              ) : (
                <i
                  style={linkFontSize}
                  className="fas fa-globe mt-3 mx-2"
                  onClick={() => {
                    window.open(link, "_blank");
                  }}
                ></i>
              )}
            </div>
          </Fragment>
        ) : null;
      })
    : null;
}
