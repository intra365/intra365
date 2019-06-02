

import React, { Component } from 'react'

import { Shimmer, ShimmerElementType as ElemType } from 'office-ui-fabric-react/lib/Shimmer';
 export class Shimlist extends Component {
    render() {
      return (
        <div>
            <div >    
     <Shimmer style={{ marginTop:"-6px", marginBottom:"14px" , borderBottom:"1px solid #eeeeee",paddingBottom:"8px"}}
     shimmerElements={[
      { type: ElemType.gap, width: '12px' },
      { type: ElemType.circle, height:20 },
      { type: ElemType.gap, width: '12px' },
      
      { type: ElemType.line, height: 20, verticalAlign: 'bottom' }
    ]}
     />
     <Shimmer style={{marginBottom:"14px" , borderBottom:"1px solid #eeeeee",paddingBottom:"8px"}}
     shimmerElements={[
      { type: ElemType.gap, width: '12px' },
      { type: ElemType.circle, height:20 },
      { type: ElemType.gap, width: '12px' },
      
      { type: ElemType.line, height: 20, verticalAlign: 'bottom' }
    ]}
     /> <Shimmer style={{marginBottom:"14px" , borderBottom:"1px solid #eeeeee",paddingBottom:"8px"}}
     shimmerElements={[
      { type: ElemType.gap, width: '12px' },
      { type: ElemType.circle, height:20 },
      { type: ElemType.gap, width: '12px' },
      
      { type: ElemType.line, height: 20, verticalAlign: 'bottom' }
    ]}
     /> <Shimmer style={{marginBottom:"14px" , borderBottom:"1px solid #eeeeee",paddingBottom:"8px"}}
     shimmerElements={[
      { type: ElemType.gap, width: '12px' },
      { type: ElemType.circle, height:20 },
      { type: ElemType.gap, width: '12px' },
      
      { type: ElemType.line, height: 20, verticalAlign: 'bottom' }
    ]}
     />  
     </div>
        </div>
      )
    }
  }