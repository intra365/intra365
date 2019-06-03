import React, { Component } from 'react'
import { Rating, RatingSize } from 'office-ui-fabric-react/lib/Rating'
import { getTheme, createTheme } from 'office-ui-fabric-react/lib/Styling';
import { Dropdown, DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import { Label } from 'office-ui-fabric-react';
export default class Assessment extends Component {
    
    _customTheme

  constructor(props) {
    super(props);

    this.state = {
      largeStarRating: 3.5,
      smallStarRating: 3,
      tenStarRating: undefined,
      themedStarRating: undefined
    };

    this._customTheme = createTheme(getTheme());
    this._customTheme.semanticColors.bodySubtext = '#DFDFDF';
    this._customTheme.semanticColors.bodyTextChecked = '#1E9FE8';
  }
    render() {
        return (
            <div style={{paddingRight:"20px",paddingLeft:"10px"}}>
                 <Label>Your rating of this Article</Label>
                <Rating
                
                id={'largeRatingStar'}
                min={1}
                max={5}
                xdisabled={true}
                size={RatingSize.Large}
                rating={this.state.largeStarRating}
                getAriaLabel={this._getRatingComponentAriaLabel}
                onChange={this._onLargeStarChange}
                onFocus={() => console.log('onFocus called')}
                onBlur={() => console.log('onBlur called')}
                ariaLabelFormat={'{0} of {1} stars selected'}
                theme={this._customTheme}

              />
                     <Dropdown
          label="Proficiency level:"
          selectedKey={undefined}
          onChange={this.changeState}
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          placeholder="Select an Option"
          options={[
            { key: 'A', text: 'n.a.' },
            { key: 'B', text: 'Bronze' },
            { key: 'C', text: 'Silver' },
            { key: 'D', text: 'Gold' },
            { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
            { key: 'E', text: 'Option e' },
            { key: 'F', text: 'Option f' },
            { key: 'G', text: 'Option g' }
          ]}
        />
            </div>
        )
    }
}
