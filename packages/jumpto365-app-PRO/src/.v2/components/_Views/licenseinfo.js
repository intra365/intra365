export default  (renderToolCell,_onColumnClick) => {
    var columns = [
        {
          key: 'column0',
          name: 'Service',
          fieldName: 'servicePlanName',
          minWidth: 200,
          maxWidth: 200,
          isRowHeader: true,
          isResizable: true,
          isSorted: true,
          isSortedDescending: false,
          onColumnClick: _onColumnClick,
          data: 'number',
          isPadded: false,
          onRender: (item,rowId,colData,d) => {
            var title = item[colData.fieldName] 
            return item.isHeading ? <b>{title}</b> : title
              
              }
        },
        {
          key: 'column1',
          name: 'Text',
          fieldName: 'text',
          minWidth: 150,
          maxWidth: 250,
          isRowHeader: true,
          isResizable: true,
          isSorted: false,
          isSortedDescending: false,
          onColumnClick: _onColumnClick,
          data: 'string',
          isPadded: true,
          onRender: (item,rowId,colData,d) => {
            var title = item[colData.fieldName] 
            return item.isHeading ? <b>{title}</b> : title
              
              }
        }
        // ,
        // {
        //     key: 'column2',
        //     name: 'appliesTo',
        //     fieldName: 'appliesTo',
        //     minWidth: 150,
        //     maxWidth: 150,
        //     isRowHeader: true,
        //     isResizable: true,
        //     isSorted: false,
        //     isSortedDescending: false,
        //     onColumnClick: _onColumnClick,
        //     data: 'string',
        //     isPadded: true,
        //     onRender: (item,rowId,colData,d) => {
        //       var title = item[colData.fieldName] 
        //       return item.isHeading ? <b>{title}</b> : title
                
        //         }
        //   }
          ,
        {
          key: 'column3',
          name: 'SKU',
          fieldName: 'sku',
          minWidth: 150,
          maxWidth: 150,
          isRowHeader: true,
          isResizable: true,
          isSorted: false,
          isSortedDescending: false,
          onColumnClick: _onColumnClick,
          data: 'string',
          isPadded: true,
          onRender: (item,rowId,colData,d) => {
            var title = item[colData.fieldName] 
            return item.isHeading ? <b>{title}</b> : title
              
              }
        },
        {
          key: 'column4',
          name: 'SKU Text',
          fieldName: 'skutext',
          minWidth: 150,
          maxWidth: 150,
          isRowHeader: true,
          isResizable: true,
          isSorted: false,
          isSortedDescending: false,
          onColumnClick: _onColumnClick,
          data: 'string',
          isPadded: true,
          onRender: (item,rowId,colData,d) => {
            var title = item[colData.fieldName] 
            return item.isHeading ? <b>{title}</b> : title
              
              }
        }
    
      ];
    


      
        
    return columns
      
      
}


