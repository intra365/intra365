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
        color: "#ffffff",
        iconUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGqvgk8h2lMWLRGbpbj7C0xAyPQiTQvXnvHyj0kGxuUV4YowORsg"
      },
      {
        name: "iframe",
        color: "lightgreen",
        iconUrl:
          "http://pirhoo.github.io/iframe-scaffolder/assets/images/iframe.png"
      },
      // {
      //   name: "Stand alone - Full Web site",
      //   color: "#666666",
      //   iconUrl:
      //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGqvgk8h2lMWLRGbpbj7C0xAyPQiTQvXnvHyj0kGxuUV4YowORsg"
      // },
      {
        name: "Windows Desktop",
        color: "#ffffff",
        iconUrl:
          "http://iskin.tooliphone.net/themes/7656/5956/preview-256.png"
      },
      {
        name: "Mac Desktop",
        color: "#ffffff",
        iconUrl:
          "data:image/png;base64,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"
      }
      ,
      {
        name: "iPhone",
        color: "#ffffff",
        iconUrl:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAABAQEDg4OB7e3v4+PghISEWFhaZmZnNzc0lJSVMTEzp6en7+/vX19f09PSfn5+/v79+fn7d3d1ERESurq4uLi6pqamQkJA9PT02NjZRUVFdXV0cHBwRERG0tLRycnIoJztKAAADTElEQVR4nO3a23KiQACEYVFY5ahyiMTg4f2fco1xqzYV0GLoHiZT/V+bDl8FFTGLhWF5ZLfc9EANedk+PJ7W9jodw31mEbltloH9ls3WFjArZ/B9VtoiXmcCBsHVDnA3GzAIdjaA22RGYWLjPG2nHOG67ur1lIHWgrCbcHwfxW2g+Jiw0PGBUWp+eOfsPpGdzSfSiC5c1eaHFz42QvOJesUXTnizvzw2LuYTS7eFh8fGwVth/diYcKI7Lgya+0QzYcF1YVCustWkq1rnhZOTUEIJJfROeE7sdJ5N2MV26mYTlvTf9lU5mzB8/XBIoYTQJGQkITYJGUmITUJGEmKTkJGE2CRkJCE2CRlJiE1CRhJik5CRhNgkZCQhNgkZSYhNQkYSYpOQkYTYJGQkITYJGUmITUJGEmKTkJGE2CRkJCE2CRlJiE1CRhJik5CRhNgkZCQhNgkZSYhNQkYSYpOQkYTYJGQkITYJGUmITUJGEmKTkJGE2CRkJCE2CRlJiE1CRhJik5CRhNgkZCQhNgkZSYhNQkYSYpOQkYTYJGQkITYJGUmITUJGEmKTkJGE2CRkJCE2CRlJiE1CRhJik5CRhNgkZCQhNgkZSYhNQkYSYpOQkYTYJGQkITYJGUmI7X9hSf9tX5WzCdONndLZhDMkoYQSSihh8JZ+pG/+CtNDXFSrqogP6esH/0JhGmf5YyPP9qZGh4Vt9G0maj0TJpcfQ03ilfAncLG4+CRse6dMTlRHhXXUOxXV3gj3A1t7X4R1NrCVjf8juinc5QNb+c4TYTE4VvghTJ4IR78nOilcVoNj1fgxF4X1E+Holxonhe9PhO9eCE9PnocnL4RBPDgWj95yU7gZej+MNp4Ij4PXNEdPhL2fnT4z+PzkqPC47Z3aGtyTclQ48CVV+foHf40w2PUsjb/sdlm4/kncrb0S3k7U78/Frckp6rYwSC7Zv5sZUXYxutHmuDAI3tq4qKqqiFvzG/tuC+/K46SvLawIDW6QAav5wsj8WxVEaf+NSWjdrMKOD1yM/zyAbGNBuDV9oUeU9F/hgjO62gLVd/VH6Dob8GoHaHzFNbnSyjl6JzZz/ENG3VgD3sr24fKPzZbhfuheCKs8stvQ3ayX/QXttllh2aQOUQAAAABJRU5ErkJggg=="
      }
      ,
      {
        name: "iPad",
        color: "#ffffff",
        iconUrl:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8AAAC2trYoKCjq6urKyso7OzuxsbEiIiJsbGyCgoL39/f8/Pzi4uKdnZ2BgYGmpqbS0tKKiopnZ2dgYGAbGxtAQECRkZEMDAzg4OB3d3e+vr7Y2NhHR0c5OTlMTExYWFjExMQUFBQtLS2Pj4+ZmZlfE4F8AAAD4ElEQVR4nO2dWZOqMBBGQUGQgCAiLoCCo///L14dS9LEde5Q1STznacxLNWnOhsPmbYsAAAAAAAAAAAAAAAAAMBs5iPN8MQP7NwkyyZjzfDrLPOcT/TC2WS5tvXk4Gej8I2fmHFH+Wtmr7qr4y254+uB5dPOGm4y7uB6Iisf9tWwqLgj641d8ciw2HHH1SN5ej8amy/uqPploQq6uq4QT6kVQeWyn6XBj3YJzGziNFdzVNMbxJheGi9OPHH+js1p0dHwG3lN0GVivWiev2XgFDVN5Ni9tYsTafdXH23uBoqzohNmdlNxyTqxTjQafQ8Q8wlRXF1lxJG0Je92roMnIjvPSfndNCfjM2EOrw8ckrDvbbhYmSV4VpRZXEbn36UUrNQxKBxtoKOLKJ1CK5QpzCNFMNrburDziKKzbdurs6GcSGfKLFNqtVWl0Zd527whGd2XSgoXHIH+P3MZOemYJ0v+fVQEOyuLBsQk9pF/a62tdqiN1a/G0fjxm4bKlMQeTm+tB6u9oVbnGZ0NLTnXSMPYMslQdtPWcH33xaS1oXdv6HvPDfPJcMmXfRjO3eEyX/RhqF4ZFAEMYQhDdmAIQxjyA0MYwpAfGMIQhvzAEIYw5AeGMIQhPzCEIQz5gSEMYcgPDGEIQ35gCEMY8gNDGMKQHxjCEIb8wFA1LJLZLLmevDDS0Im/rcbp5eyFiYZOe+L5crzEQEOHHOmeGmnY+d80KxMNA5sQmGc46p7GqzfmGZKDl2d2bmGcofE5NH8c/oW51Pz10Pw9zR/Yl1rmf1t0gOFAgCEMYcgPDGEIQ35gCEMY8gNDGMKQHxjCEIb8wBCGMOQHhjCEIT8whCEM+YEhDGHIDwxhCEN+YAhDGPIDQxjCkJ9eDM2vM8NdD+gV/dQK0gMY2qlRhmnbLA23Rhk+qiw3Vevk6lz/UMjqlLL+YTVXDDWuYWkVX7fWvUzn+m6q0bcOqeW1dbi3pA5pppZ41LaWrBXJc4alJeRdaplObesBW4WUElYoR9v+LomaQvre4mweSd9A58LxEoccaL4kzank71jv0vFXRCyFqkvOQo+UWw/0VxQkg8vr/EOb7Fgt7KwbJclgm7DCJ41VonMaRULGnO3fVocwJa32oU7V/ZsuiLQ+UBUiktkdDlWaxi5jqD/HjdO0OnQ1MnI9qmzzqDrLe5S/f0IzcmX/UuqzBf2M/d2isAneP6URweZ+rIojd1Q9cny45InGlJ66b56t6WHjv3988PjNy/W82frL9y8ZLEt/27zSu3bWYptl+Vg/8izbFh9vOcuRfuj+zQAAAAAAAAAAAAAAAAAAvOEfyBt7rmrHKDkAAAAASUVORK5CYII="
      }
      ,
      {
        name: "Android Phone",
        color: "#ffffff",
        iconUrl:
          "data:image/jpeg;base64,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"
      }
      ,
      {
        name: "Android Tablet",
        color: "#ffffff",
        iconUrl:
          "data:image/png;base64,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"
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
