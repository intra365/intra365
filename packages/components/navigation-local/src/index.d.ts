import * as React from "react";

export function loadConfig (js:string) : any{

}

export interface IPageTabsProps {
  editMode? :any;
  tabs?: any;
  host?:any;
  page?:any;
  context?:any
}
export declare class PageTabs extends React.Component<IPageTabsProps, any> {
  constructor(props: IPageTabsProps);
  public props:any;
  public state:any;
  public refs:any;
  public context:any;
  public setState(state:any):void;
  public forceUpdate:any;

  public render(): JSX.Element;
}

export interface IPageTabProps {
  data :any;
  
  context?:any
}
export declare class PageTab extends React.Component<IPageTabProps, any> {
  constructor(props: IPageTabProps);
  public props:any;
  public state:any;
  public refs:any;
  public context:any;
  public setState(state:any):void;
  public forceUpdate:any;

  public render(): JSX.Element;
}


export interface IZoneTabProps {
  data :any;
  
  context?:any
}
export declare class ZoneTag extends React.Component<IZoneTabProps, any> {
  constructor(props: IPageTabProps);
  public props:any;
  public state:any;
  public refs:any;
  public context:any;
  public setState(state:any):void;
  public forceUpdate:any;

  public render(): JSX.Element;
}


export interface ISharePointControlZoneProps {
  data :any;
  automationId:any;
  onMatchAutomationId:any;
  context?:any
}
export declare class SharePointControlZone extends React.Component<ISharePointControlZoneProps, any> {
  constructor(props: IPageTabProps);
  public props:any;
  public state:any;
  public refs:any;
  public context:any;
  public setState(state:any):void;
  public forceUpdate:any;

  public render(): JSX.Element;
}
