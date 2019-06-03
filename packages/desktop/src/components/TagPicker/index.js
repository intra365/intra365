import * as React from 'react';
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { TagPicker } from 'office-ui-fabric-react/lib/components/pickers/TagPicker/TagPicker';

const _testTags = [
  'black',
  'blue',
  'brown',
  'cyan',
  'green',
  'magenta',
  'mauve',
  'orange',
  'pink',
  'purple',
  'red',
  'rose',
  'violet',
  'white',
  'yellow'
].map(item => ({ key: item, name: item }));

export default class TagPickerBasicExample extends BaseComponent {
  _picker;

  constructor(props) {
    super(props);
    this.state = {
      isPickerDisabled: false
    };
  }

  render() {
    return (
      <div>

        
        
        <TagPicker
          componentRef={this._resolveRef('_picker')}
          onResolveSuggestions={this._onFilterChangedNoFilter}
          onItemSelected={this._onItemSelected}
          getTextFromItem={this._getTextFromItem}
          pickerSuggestionsProps={{
            suggestionsHeaderText: 'Suggested Tags',
            noResultsFoundText: 'No Color Tags Found'
          }}
          itemLimit={2}
          disabled={this.state.isPickerDisabled}
          inputProps={{
            onBlur: (ev) => console.log('onBlur called'),
            onFocus: (ev) => console.log('onFocus called'),
            'aria-label': 'Tag Picker'
          }}
        />
      </div>
    );
  }

   _getTextFromItem(item) {
    return item.name;
  }

   _onDisabledButtonClick = () => {
    this.setState({
      isPickerDisabled: !this.state.isPickerDisabled
    });
  };

   _onFilterChanged = (filterText, tagList ) => {
    return filterText
      ? _testTags
          .filter(tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0)
          .filter(tag => !this._listContainsDocument(tag, tagList))
      : [];
  };

   _onFilterChangedNoFilter = (filterText, tagList) => {
    return filterText ? _testTags.filter(tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0) : [];
  };

   _onItemSelected = (item)  => {
    if (this._listContainsDocument(item, this._picker.items)) {
      return null;
    }
    return item;
  };

   _listContainsDocument(tag, tagList) {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }
    return tagList.filter(compareTag => compareTag.key === tag.key).length > 0;
  }
}