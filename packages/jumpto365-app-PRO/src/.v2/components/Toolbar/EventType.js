export var EventType = {

  EditMode : 0,  
  EditGridMode : 1,

    RowMoveUp : 100,
    RowMoveDown : 101,
    RowInsertBefore : 102,
    RowInsertAfter : 103,
    RowDelete : 104,

    ColumnMoveLeft : 200,
    ColumnMoveRight : 201,
    ColumnInsertBefore : 202,
    ColumnInsertAfter : 203,
    ColumnDelete : 204,
    
    
    CellEdit: 300,
    CellSelectType: 301,
    TileClick : 302,
    CellOpenLink : 303,
    CellChangeType:304,
    CellCopy:305,
    CellPaste:306,
    CellClear:307,
    CellCut:308,
    TileMouseOver:309,
    TileMouseOut:310

  }
  
  Object.freeze(EventType)