export default  (renderToolCell,_onColumnClick) => {
        var columns = [
            {
              key: 'column0',
              name: 'Order',
              fieldName: 'key',
              minWidth: 30,
              maxWidth: 30,
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
                key: 'column2',
                name: 'Task',
                fieldName: 'subject',
                minWidth: 250,
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
              },
            {
              key: 'column1',
              name: 'Area',
              fieldName: 'area',
              minWidth: 150,
              maxWidth: 400,
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
        
    
            columns.push ( {
              key: 'c5',
              name: "Tools",
              fieldName: 5,
              minWidth: 250,
              maxWidth: 500,
              isRowHeader: true,
              isResizable: true,
              isSorted: false,
              isSortedDescending: true,
              //onColumnClick: this._onColumnClick,
              data: 'string',
              isPadded: true,
              onRender: (item,rowId,coilData,d) => {
                
                if (renderToolCell)  {
                  return renderToolCell(item,rowId,coilData,d)
                }
                } 
            })
          
            
        return columns
          
          
    }


