import React, { Component } from "react";
import "./manifest.css";

import PageHeader from "../../PageHeader";
import PageLayoutMain from "../../_Layouts/PageLayoutMain";
import { Link } from "@reach/router";

export default class ManifestsPage extends Component {
  state = {};

  _init = () => {};
  componentDidMount = () => {
    this._init();
  };

  render() {
    var integrations = [
      {
        name: "SharePoint Online",
        color: "#036c70",
        iconUrl:
          "https://jumpto365.com/resources/images/Icons/SharePoint New.png"
      },
      {
        name: "Outlook",
        color: "#0263b7",
        iconUrl: "https://jumpto365.com/resources/images/Icons/Outlook new.png"
      },
      {
        name: "Word",
        color: "#0f3f91",
        iconUrl: "https://jumpto365.com/resources/images/Icons/Word New.png"
      },
      {
        name: "Excel",
        color: "#175C36",
        iconUrl: "https://jumpto365.com/resources/images/Icons/Excel New.png"
      },
      {
        name: "PowerPoint",
        color: "#B8391A",
        iconUrl:
          "https://jumpto365.com/resources/images/Icons/PowerPoint New.png"
      },
      {
        name: "OneNote",
        color: "#4f0083",
        iconUrl: "https://jumpto365.com/resources/images/Icons/OneNote New.png"
      },
      {
        name: "Native (Javascript)",
        color: "#666666",
        iconUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGqvgk8h2lMWLRGbpbj7C0xAyPQiTQvXnvHyj0kGxuUV4YowORsg"
      },
      {
        name: "iframe",
        color: "#666666",
        iconUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGqvgk8h2lMWLRGbpbj7C0xAyPQiTQvXnvHyj0kGxuUV4YowORsg"
      },
      {
        name: "Stand alone - Full Web site",
        color: "#666666",
        iconUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGqvgk8h2lMWLRGbpbj7C0xAyPQiTQvXnvHyj0kGxuUV4YowORsg"
      },
      {
        name: "Windows Desktop",
        color: "#666666",
        iconUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGqvgk8h2lMWLRGbpbj7C0xAyPQiTQvXnvHyj0kGxuUV4YowORsg"
      },
      {
        name: "Mac Desktop",
        color: "#666666",
        iconUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGqvgk8h2lMWLRGbpbj7C0xAyPQiTQvXnvHyj0kGxuUV4YowORsg"
      }
      ,
      {
        name: "iPhone",
        color: "#666666",
        iconUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGqvgk8h2lMWLRGbpbj7C0xAyPQiTQvXnvHyj0kGxuUV4YowORsg"
      }
      ,
      {
        name: "iPad",
        color: "#666666",
        iconUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGqvgk8h2lMWLRGbpbj7C0xAyPQiTQvXnvHyj0kGxuUV4YowORsg"
      }
      ,
      {
        name: "Android Phone",
        color: "#666666",
        iconUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGqvgk8h2lMWLRGbpbj7C0xAyPQiTQvXnvHyj0kGxuUV4YowORsg"
      }
      ,
      {
        name: "Android Tablet",
        color: "#666666",
        iconUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGqvgk8h2lMWLRGbpbj7C0xAyPQiTQvXnvHyj0kGxuUV4YowORsg"
      }
      

    ];

    return (
      <PageLayoutMain>
        <PageHeader title="Integrations" color="#2a7ab9" />
        Share all or part of the navigation globally integrated in the tools
        your users loves to work in. Get the ability to answer "which tool when"
        directly in the tool. We call in IntraGrations Components to jumpto365 - 
        in short Intra ...  Jump to the <Link to="/toolbar"> Navigation Builder</Link>
        {integrations.map((integration, index) => {
          return (
            <div key="index" style={{ display: "flex", margin: "8px" }}>
              <div
                style={{
                  maxWidth: "48px",
                  padding: "8px",
                  backgroundColor: integration.color
                }}
              >
                <img
                  style={{ width: "32px", height: "auto" }}
                  src={integration.iconUrl}
                />{" "}
              </div>
              <div>
                {" "}
                <div
                  style={{
                    lineHeight: "20px",
                    fontSize: "20px",
                    padding: "8px"
                  }}
                >
                  {" "}
                  {integration.name}
                </div>
                <div
                  style={{
                    paddingLeft: "8px",
                    lineHeight: "13px",
                    fontSize: "13px"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                     
                    }}
                  >
                    <div
                      style={{ color: "#4283C3", cursor: "pointer", marginLeft: "0px",
                      marginRight: "8px" }}
                      onClick={e => {
                        e.stopPropagation();
                        alert(
                          "When implemented will generate a file which starts downloading to the client"
                        );
                        return false;
                      }}
                    >
                      Download integration manifest
                    </div>

                    <div
                      style={{ color: "#4283C3", cursor: "pointer", marginLeft: "8px",
                      marginRight: "8px" }}
                      onClick={e => {
                        e.stopPropagation();
                        alert(
                          "When implemented will save a link to the manifest on clipboard"
                        );
                        return false;
                      }}
                    >
                      Copy link to manifest
                    </div>
                    <div
                      style={{ color: "#4283C3", cursor: "pointer", marginLeft: "8px",
                      marginRight: "8px" }}
                      onClick={e => {
                        e.stopPropagation();
                        alert("When implemented will redirec to our guides");
                        return false;
                      }}
                    >
                      Implementation Guide{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </PageLayoutMain>
    );
  }
}
