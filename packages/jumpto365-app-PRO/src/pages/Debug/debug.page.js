import React, { Component } from 'react';

import '../../App.css';
import FilterablePeriodicSystem from '../../components/PeriodicSystem'
import Sidebar from '../../components/Sidebar'
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import Feedback from '../../components/Feedback'
import About from "../../components/About"
import json from "format-json"
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import $ from 'jquery'
import {pto365Authenticate} from '../../api/pto365'
import _ from "lodash"
import util from "../../util"
export default class DebugPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user : JSON.parse(localStorage.getItem("user")),
          userdetail : JSON.parse( localStorage.getItem("userdata"))
        };
        
      }
      ptoAuthenticated = (err,result) => {
        this.setState({ptoAuth:result})
      }
      
      ptoAuthenticate = () => {
        pto365Authenticate(this.ptoAuthenticated)
      }
    

    render() {
        //var se
        const u = this.state.userdetail
        function tenant(userDetails){
          if (!userDetails && !userDetails.proxyAddresses) return
          var domain = null
          userDetails.proxyAddresses.forEach(element => {
            if (element.indexOf(".onmicrosoft.com")>0){
              var s = element.split("@")
              domain = s[1].substring(0,s[1].indexOf(".onmicrosoft.com"))
              
            }
          });
          return domain
        }
        function line(title,data){
            return <div class="ms-Grid-row">
            <div class="ms-Grid-col ms-sm6 ms-md4 ms-lg2">{title}</div>
            <div class="ms-Grid-col ms-sm6 ms-md8 ms-lg10">{data}</div>
          </div>
        
        }
        var plans = []
        var activePlans = {}
        var licenseNames = [] 
        var provisioned = [] 

        
        
        if (u && u.assignedPlans){

          var licenses = util.analyseAssignedLicenses(u.assignedLicenses)
          licenses.forEach(plan => {
            if (plan.name.indexOf("unknown")===-1){
            licenseNames.push(line("license",plan.name))}
          })
          var prov = {}
          u.provisionedPlans.forEach(plan => {
            if (plan.capabilityStatus==="Enabled"
               && plan.provisioningStatus === "Success"){
                 prov[plan.service] = true
          }})

          _.keys(prov).forEach(p => {
            provisioned.push(line("provisioned",p))
          })
          

      }
    return (


      <div >
      <h1 className="ms-font-xxl">
       Profile
       </h1>
        <p>
          Login &amp; personalization is an experimental feature 

        </p>

          {line("Mail",u.mail  ? u.mail : u.userPrincipalName)}
          {line("Display name",u.displayName)}
          {line("Job title",u.jobTitle)}
          {line("Company name",u.companyName)}
          {line("Department",u.department)}
          {line("Tenant",tenant(u))}
          <h3>Licenses</h3>
          {licenseNames}
          <h3>Implemented</h3>
          {provisioned}




          
      </div>  
    );
  }
}

