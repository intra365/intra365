export default  (renderToolCell,_onColumnClick) => {
        var columns = [
          {
            key: 'column3',
            name: 'icon',
            fieldName: 'icon',
            minWidth: 16,
            maxWidth: 16,
            isIconOnly: true,
            iconName:"Page",
            isSortedDescending: false,
            onColumnClick: _onColumnClick,
           
            onRender: (item,rowId,colData,d) => {
             
              return <i class={`ms-Icon ms-Icon--${item[colData.fieldName]}`} aria-hidden="true"></i>
                
                }
          },
            {
              key: 'column0',
              name: 'Key',
              fieldName: 'key',
              minWidth: 100,
              maxWidth: 300,
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
                name: 'Name',
                fieldName: 'title',
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


