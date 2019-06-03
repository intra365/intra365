export default  (renderToolCell,_onColumnClick) => {
        var columns = [
            {
              key: 'column0',
              name: 'Key',
              fieldName: 'key',
              minWidth: 100,
              maxWidth: 100,
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
            }
        
          ];
        
          
          
        return columns
          
          
    }


