import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-property-pane";

import * as strings from "Jumpto365WebPartStrings";
import Jumpto365 from "./components/Jumpto365";
import { IJumpto365Props } from "./components/IJumpto365Props";
//import times = require('lodash/times');
import { PropertyPaneAsyncDropdown } from "../../controls/PropertyPaneAsyncDropdown/PropertyPaneAsyncDropdown";

import { update, get } from "@microsoft/sp-lodash-subset";

export interface IJumpto365WebPartProps {
  //description: string;
  tenant: string;
  table: string;
  height: string;
  context:any
}

export default class Jumpto365WebPart extends BaseClientSideWebPart<
  IJumpto365WebPartProps
> {
  public render(): void {
    const element: React.ReactElement<IJumpto365Props> = React.createElement(
      Jumpto365,
      {
        //description: this.properties.description,
        tenant: this.properties.tenant,
        table: this.properties.table,
        height: this.properties.height,
        context:this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }
  private onListChange(propertyPath: string, newValue: any): void{
    const oldValue: any = get(this.properties, propertyPath);
  
    // store new value in web part properties
    update(this.properties, propertyPath, (): any => { return newValue; });
    // reset selected item
    this.properties.table = newValue;
    // store new value in web part properties
    update(this.properties, 'table', (): any => { return this.properties.table; });
    // refresh web part
    this.render();
    // reset selected values in item dropdown
    //this.itemsDropDown.properties.selectedKey = this.properties.table;
    // allow to load items
    //this.itemsDropDown.properties.disabled = false;
    // load items and re-render items dropdown
    //this.itemsDropDown.render();
  }

  private loadLists(): Promise<string[]> {
    var tenant: string = this.properties.tenant ? this.properties.tenant : "jumpto365.com"
    return new Promise<string[]>(
      (
        resolve: (options: string[]) => void,
        reject: (error: any) => void
      ) => {
        fetch("https://api.jumpto365.com/table/"+tenant  )
        .then(value=>{
          value.json().then(data=>{
            var result  : string[] = data.map((item,index)=>{
              return item.TableKey
            })
            resolve(result)
          }
            )
          //resolve(["sharedDocuments", "myDocuments"]);
        })
        .catch(error=>{
          reject(error)
        })
       
      }
    );
  }
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              // groupName: strings.BasicGroupName,
              groupFields: [
                // PropertyPaneTextField('description', {
                //   label: strings.DescriptionFieldLabel
                // }),
               
               
                // ,
                // PropertyPaneTextField("height", {
                //   label: strings.HeightLabel
                // }),
                new PropertyPaneAsyncDropdown("listName", {
                  label: strings.TableNameLabel,
                  loadOptions: this.loadLists.bind(this),
                  onPropertyChange: this.onListChange.bind(this),
                  selectedKey: this.properties.table
                }),
                PropertyPaneTextField("tenant", {
                  label: strings.TenantNameLabel
                }),
                PropertyPaneTextField("table", {
                  label: strings.TableNameLabel
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
