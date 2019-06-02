export default  (renderToolCell,_onColumnClick) => {
        var columns = [

            {
                key: 'column2',
                name: 'Task',
                fieldName: 'name',
                minWidth: 100,
                maxWidth: 600,
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


