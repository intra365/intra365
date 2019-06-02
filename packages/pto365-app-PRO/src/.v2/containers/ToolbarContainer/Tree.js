import json from "format-json";
import _ from "lodash";

import {CellType} from "../../components/Toolbar/CellTypeSelector"
import { isNull } from "util";
 
export default class Tree {
  _tree = null;
  nextId = 0;

  _title = null;
  _teaser = null;
  _titlegraphics = null;
  _backgroundColor = null;
  _textColor = null;
  _protected = false

  _maxId = tree => {
    var maxId = 0;
    tree.forEach(row => {
      row.forEach(cell => {
        maxId = Math.max(maxId, cell.id);
      });
    });
    return maxId;
  };
  _newCell = () => {
    this.nextId = this.nextId ? this.nextId + 1 : 1;
    return {
      id: this.nextId
    };
  };
  _buildTree = (rowCount, columnCount) => {
    var rows = [];
    var id = 0;
    for (let rowIndex = 0; rowIndex < rowCount + 1; rowIndex++) {
      var cells = [];
      for (let columnIndex = 0; columnIndex < columnCount + 1; columnIndex++) {
        id++;
        cells.push(this._newCell());
      }
      rows.push(cells);
    }

    return rows;
  };

  constructor(parm1, parm2) {
    if (typeof parm1 === "undefined") {
      this._tree = this._buildTree(0, 0);
      return;
    }

    this._tree = this._buildTree(parm1, parm2);
    this.reindex();
  }

  get tree() {
    return this._tree;
  }

  get index() {
    return this._index;
  }
  reindex = () => {
    var index = {};

    for (let rowIndex = 0; rowIndex < this._tree.length; rowIndex++) {
      var row = this._tree[rowIndex];
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const cell = _.cloneDeep(row[columnIndex]);

        if (cell.members) {
          var memberIndex = {};
          for (let ix = 0; ix < cell.members.length; ix++) {
         
            const member = cell.members[ix];

            if (this.isCellTile(member)){
            memberIndex[member] = true;

          }else
          {

           // this.toggleMemberShip(cell.id,member)
          }
          }
          cell.memberIndex = memberIndex;
        }
        index[cell.id] = cell;
      }
    }
    this._index = index;
    console.log("Reindexed done");
  };

  fix = () => {
  
    for (let rowIndex = 0; rowIndex < this._tree.length; rowIndex++) {
      var row = this._tree[rowIndex];
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const cell = row[columnIndex]
        // if (!cell){
        //   debugger
        //   row[columnIndex] = this._newCell()
        // }
        if (cell && cell.members) {
          cell.members.forEach(memberId => {
            if (!this.isCellTile(memberId)){
              
              this.toggleMemberShip(cell.id,memberId)
  
            }})}
            else
            {
              
            }
  };
};
};


  export() {
    var settings = this.getToolbarSettings();
    this.fix()
    var file = {
      ...settings,
      version: 1,
      references: [],
      nextId: this.nextId,
      tree: this._tree
    };

    return file;
  }

  import(data) {
    
    if (!data) return false;
    if (!data.file) return false;

    var file = data.file;
    try {
      this._tree = file.tree;
      this.nextId = this._maxId(file.tree) + 1;

      this._teaser = file.teaser;
      this._isProtected= file.isProtected ? file.isProtected : false
      this._titlegraphics = file.titlegraphics;
      this._title = file.title;
      this._backgroundColor = file.backgroundColor;
      this._textColor = file.textColor;
      this.reindex();
    } catch (error) {
      return false;
    }
    this.fix()
    
    return true;
  }
  columnDelete = columnNumber => {
    var tree = this._tree;
    var newTree = [];
    for (let rowIndex = 0; rowIndex < tree.length; rowIndex++) {
      var row = tree[rowIndex];
      var newRow = [];
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const cell = row[columnIndex];
        if (columnIndex !== columnNumber) {
          newRow.push(cell);
        }
      }
      newTree.push(newRow);
    }

    this._tree = newTree;
    this.reindex();
    return this.tree;
  };
  columnInsertAfter = columnNumber => {
    var tree = this._tree;
    var newTree = [];
    for (let rowIndex = 0; rowIndex < tree.length; rowIndex++) {
      var row = tree[rowIndex];
      var newRow = [];
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const cell = row[columnIndex];
        newRow.push(cell);
        if (columnIndex === columnNumber) {
          newRow.push(this._newCell());
        }
      }
      newTree.push(newRow);
    }

    this._tree = newTree;
    this.reindex();
    return this.tree;
  };

  columnInsertBefore = columnNumber => {
    var tree = this._tree;
    var newTree = [];
    for (let rowIndex = 0; rowIndex < tree.length; rowIndex++) {
      var row = tree[rowIndex];
      var newRow = [];
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const cell = row[columnIndex];
        if (columnIndex === columnNumber) {
          newRow.push(this._newCell());
        }
        newRow.push(cell);
      }
      newTree.push(newRow);
    }
    this._tree = newTree;
    this.reindex();
    return this.tree;
  };
  columnMoveLeft = columnNumber => {};
  columnMoveRight = columnNumber => {};
  rowDelete = rowNumber => {
    var tree = this._tree;
    var newTree = [];
    for (let rowIndex = 0; rowIndex < tree.length; rowIndex++) {
      var row = tree[rowIndex];
      var newRow = [];
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const cell = row[columnIndex];

        newRow.push(cell);
      }
      if (rowNumber !== rowIndex) {
        newTree.push(newRow);
      }
    }

    this._tree = newTree;
    this.reindex();
    return this.tree;
  };
  rowInsertAfter = rowNumber => {
    var tree = this._tree;
    var newTree = [];
    for (let rowIndex = 0; rowIndex < tree.length; rowIndex++) {
      var row = tree[rowIndex];
      var newRow = [];
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const cell = row[columnIndex];

        newRow.push(cell);
      }
      newTree.push(newRow);

      if (rowNumber === rowIndex) {
        newRow = [];
        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
          newRow.push(this._newCell());
        }
        newTree.push(newRow);
      }
    }

    this._tree = newTree;
    this.reindex();
    return this.tree;
  };
  rowInsertBefore = rowNumber => {
    var tree = this._tree;
    var newTree = [];

    for (let rowIndex = 0; rowIndex < tree.length; rowIndex++) {
      var row = tree[rowIndex];
      var newRow = [];
      if (rowNumber === rowIndex) {
        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
          newRow.push(this._newCell());
        }
        newTree.push(newRow);
      }

      newRow = [];

      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const cell = row[columnIndex];

        newRow.push(cell);
      }
      newTree.push(newRow);
    }

    this._tree = newTree;
    this.reindex();
    return this.tree;
  };


  append(tree){
    debugger
    var that = this
    for (let index = 0; index < tree.length; index++) {
      debugger
      that.rowInsertAfter(this._tree.length-1)
      //const element = array[index];
      
    }

    return true
  }
  rowMoveDown = rowNumber => {};
  rowMoveUp = rowNumber => {};

  cellAction = (id, action) => {
    var tree = this._tree;

    for (let rowIndex = 0; rowIndex < tree.length; rowIndex++) {
      var row = tree[rowIndex];

      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const cell = row[columnIndex];
        if (cell && cell.id.toString() === id.toString()) {
          row[columnIndex] = action(cell);
        }
      }
    }
  };
  cellFinder = (id, onFound) => {
    var tree = this._tree;

    for (let rowIndex = 0; rowIndex < tree.length; rowIndex++) {
      var row = tree[rowIndex];

      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const cell = row[columnIndex];
        if (cell && cell.id.toString() === id.toString()) {
          onFound(cell);
        }
      }
    }
  };
  cellForEach = onEach => {
    var tree = this._tree;
    if (!onEach) return;

    for (let rowIndex = 0; rowIndex < tree.length; rowIndex++) {
      var row = tree[rowIndex];

      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        onEach(row[columnIndex]);
      }
    }
  };

  copyCell = (id) => {
    var thisCell = null;
    this.cellFinder(id, cell => {
      thisCell = _.cloneDeep(cell);
    });
    var copy = thisCell
    return copy;
  };
  clearCell = (id) => {
    this.cellAction(id, cell => {
     
      if (cell.members && this.isGroup(cell)){
        cell.members.forEach(memberId => {
          if (cell.groupSetting) this.clearConnectorColor(memberId,cell.groupSetting.color)          
          
      })}
      cell = {id:cell.id}
      
      return cell;
    });
    this.reindex();
  }
  pasteCell = (id,cellToInsert) => {
    this.cellAction(id, cell => {
      var cellId = cell.id
      
      cell = _.cloneDeep(cellToInsert)
      cell.id = cellId
      return cell;
    });
    this.reindex();
  }
  getCellType = id => {
    var cellType = null;
    this.cellFinder(id, cell => {
      cellType = cell.type;
    });
    return cellType;
  };
  setCellType = (id, cellType) => {
    this.cellAction(id, cell => {
      cell.type = cellType;
      return cell;
    });
    this.reindex();
  };
  setContentRef = (id, url) => {
    this.cellAction(id, cell => {
      if (cell.tile){
        cell.tile.contentRef = url
      }
      
      return cell;
    });
    this.reindex();
  };
  getGroupSetting = id => {
    var groupSetting = null;
    this.cellFinder(id, cell => {
      groupSetting = cell.groupSetting;
    });
    return groupSetting;
  };
  updateConnectorColor = (id,fromColor,toColor) => {
    var connectors = this.getCellConnectors(id)
    var updateColor = (direction) => {
      if (connectors && connectors[direction] &&  connectors[direction] === fromColor){
        this.setCellConnector(id,direction,toColor)
      }
    }
    updateColor("left")
    updateColor("right")
    updateColor("top")
    updateColor("down")
    
  }
  clearConnectorColor = (id,color) => {
    var connectors = this.getCellConnectors(id)
    var updateColor = (direction) => {
      if (connectors && connectors[direction] &&  connectors[direction] === color){
        this.setCellConnector(id,direction,null)
      }
    }
    updateColor("left")
    updateColor("right")
    updateColor("top")
    updateColor("down")
    
  }
  setGroupSetting = (id, groupSetting) => {
    this.cellAction(id, cell => {

     
      if ( cell.groupSetting && (cell.groupSetting.color !== groupSetting.color)){

        
        this.updateConnectorColor(id,cell.groupSetting.color,groupSetting.color)
        if (cell.members){
          cell.members.forEach(memberId => {
            this.updateConnectorColor(memberId,cell.groupSetting.color,groupSetting.color)
            
            
        })}

      }
     

      cell.groupSetting = groupSetting;
      return cell;
    })
    this.reindex();
  }


  getMembers = id => {
    var members = [];
    this.cellFinder(id, cell => {
      members = cell.members ? _.map(cell.members, _.clone) : [];
    });
    return members;
  };

  isGroup = (cell) => {
    if (cell.type===CellType.Bottom) return true
    if (cell.type===CellType.Top) return true
    if (cell.type===CellType.Left) return true
    if (cell.type===CellType.Right) return true    

    return false
  }
  getGroups = ()=>{
    var groups = []
    this.cellForEach(cell => {
      if (this.isGroup(cell)) {
        groups.push(cell);
      }
    });
    return groups
  }

  isInArray = (id,members) => {
    var result = false
    if (!members) return false
    members.forEach(member => {
      if (id.toString()===member.toString()){
        result=true
      }
    });
    return result
  }
  getRelations=id=>{
    var groupRelations = []
    
    var allGroups = this.getGroups()
    
    allGroups.forEach(group => {
     if ( this.isInArray(id,group.members)){
       
        var groupRelation = {
          ...group.groupSetting,members:[]
        }
        if (group.members){
        group.members.forEach(groupMember => {
          //if (groupMember.toString() !== id.toString()){
            var tile= this.getCellTile(groupMember)
            groupRelation.members.push({id:groupMember,isSelf:groupMember.toString() === id.toString(), ...tile})
          //}
        });
        if (groupRelation.members.length > 0){
          groupRelation.members = _.sortBy(groupRelation.members,(element)=>{return element.title})
          groupRelations.push(groupRelation)
        }
       
      }
      }
    });

    return _.sortBy(groupRelations,(element)=>{return element.title})

  }
  getNoneMembers = groupId => {
    var noneMembers = [];
    this.cellForEach(cell => {
      if (!this.isMember(cell.id, groupId)) {
        noneMembers.push(cell.id);
      }
    });
    return noneMembers;
  };
  setMembers = (id, members) => {
    this.cellAction(id, cell => {
      if (members) {
        cell.members = _.map(members, _.clone);
        console.log("setMember", cell.members);
        return cell;
      }
    });

    this.reindex();
  };

  setCellTile = (id, tile) => {
    this.cellAction(id, cell => {
      cell.tile = tile;
      return cell;
    });
    this.reindex();
  };

  toggleCellConnector = (id, direction, color) => {
    var connectors = this.getCellConnectors(id);
    if (!connectors[direction]) {
      this.setCellConnector(id, direction, color);
    } else {
      this.setCellConnector(id, direction, null);
    }
  };

  setCellConnector = (id, direction, color) => {
    this.cellAction(id, cell => {
      var connectors = cell.connectors ? cell.connectors : {};
      connectors[direction] = color;
      cell.connectors = connectors;
      console.log("Cell connector set", id, connectors);
      return cell;
    });
  };

  getCellConnectors = id => {
    var connectors = {};
    this.cellFinder(id, cell => {
      if (cell.connectors) {
        connectors = { ...cell.connectors };
      }
    });

    return connectors;
  };

  setToolbarSettings = (title,teaser, titlegraphics, backgroundColor, textColor,isProtected) => {
    this._teaser = teaser;
    this._titlegraphics = titlegraphics;
    this._isProtected = isProtected
    this._title = title;
    this._backgroundColor = backgroundColor;
    this._textColor = textColor;
  };

  getToolbarSettings = () => {
    var settings = {
      title: this._title,
      teaser: this._teaser,
      titlegraphics: this._titlegraphics,
      backgroundColor: this._backgroundColor,
      textColor: this._textColor,
      isProtected : this._isProtected ? this._isProtected : false
    };
    
    return settings;
  };

  isCellTile = id => {
   var match = false

    this.cellFinder(id, cell => {
      if (cell.tile) {
       match = true
      }
    });

    return match
  };

  getCellTile = id => {
    var tile = JSON.stringify({
      key: null,
      textcolor: "#ffffff",
      title: "",
      color: "#377AB9",
      icon: null,
      inShort: "",
      isFullyShareable: "",
      isPartlyShareable: "",
      isPremium: "",
      jumpto: null,
      subtitle: "",
      contentRef: ""
    });

    this.cellFinder(id, cell => {
      if (cell.tile) {
        tile = JSON.stringify(cell.tile);
      }
    });

    return JSON.parse(tile);
  };

  toggleMemberShip = (groupId, tileId) => {
    return new Promise((resolve, reject) => {
      var members = this.getMembers(groupId);
      console.log("Members before", members);
      if (this.isMember(tileId, groupId)) {
        console.log("Removing membership", groupId, tileId);
        var newMembers = [];
        members.forEach(memberToKeep => {
          if (memberToKeep !== tileId) {
            newMembers.push(memberToKeep);
          }
        });

        this.setMembers(groupId, newMembers);
      } else {
        console.log("Adding membership", groupId, tileId);
        members.push(tileId);
        this.setMembers(groupId, members);
      }

      resolve();
    });
  };

  isMember = (tileId, groupId) => {
    var group = this.index[groupId];
    var member = false;

    this.cellFinder(groupId, cell => {
      if (cell.members) {
        cell.members.forEach(element => {
          if (element === tileId) {
            member = true;
          }
        });
      }
    });

    return member;
    if (!group) return false;
    if (!group.memberIndex) return false;
    if (group.memberIndex[tileId]) return true;
    return false;
  };
}
