import * as React from 'react';
import { Nav, INavProps } from 'office-ui-fabric-react/lib/Nav';
//import './Nav.Basic.Example.scss';

export default class LeftNavigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='ms-NavExample-LeftPane'>
        <Nav
          groups={
            [
              {
                links:
                [
                  {
                    name: 'About',
                    //url: 'http://example.com',
                    links: [{
                      name: 'Activity',
                      url: 'http://msn.com',
                      key: 'key1'
                    },
                    {
                      name: 'News',
                      url: 'http://msn.com',
                      key: 'key2'
                    }],
                    isExpanded: false
                  },
                  {
                    name: 'Embed',
                    url: 'http://example.com',
                    links: [{
                      name: 'Activity',
                      url: 'http://msn.com',
                      key: 'key1'
                    },
                    {
                      name: 'News',
                      url: 'http://msn.com',
                      key: 'key2'
                    }],
                    isExpanded: false
                  },
                  {
                    name: 'Language',
                    url: 'http://example.com',
                    links: [{
                      name: 'Activity',
                      url: 'http://msn.com',
                      key: 'key1'
                    },
                    {
                      name: 'News',
                      url: 'http://msn.com',
                      key: 'key2'
                    }],
                    isExpanded: false
                  },
                  {
                    name: 'Reuse',
                    url: 'http://example.com',
                    links: [{
                      name: 'Activity',
                      url: 'http://msn.com',
                      key: 'key1'
                    },
                    {
                      name: 'News',
                      url: 'http://msn.com',
                      key: 'key2'
                    }],
                    isExpanded: false
                  },
                  {
                    name: 'Upgrade',
                    url: 'http://example.com',
                    links: [{
                      name: 'Activity',
                      url: 'http://msn.com',
                      key: 'key1'
                    },
                    {
                      name: 'News',
                      url: 'http://msn.com',
                      key: 'key2'
                    }],
                    isExpanded: false
                  },
                  {
                    name: 'Request a feature',
                    url: 'http://example.com',
                    links: [{
                      name: 'Activity',
                      url: 'http://msn.com',
                      key: 'key1'
                    },
                    {
                      name: 'News',
                      url: 'http://msn.com',
                      key: 'key2'
                    }],
                    isExpanded: false
                  },
                  
                  { name: 'Documents', url: 'http://example.com', key: 'key3', isExpanded: true },
                  { name: 'Pages', url: 'http://msn.com', key: 'key4' },
                  { name: 'Notebook', url: 'http://msn.com', key: 'key5' },
                  { name: 'Long Name Test for ellipse', url: 'http://msn.com', key: 'key6' },
                  {
                    name: 'Edit',
                    url: 'http://cnn.com',
                    onClick: this._onClickHandler2,
                    icon: 'Edit',
                    key: 'key8'
                  }
                ]
              }
            ]
          }
          expandedStateText={ 'expanded' }
          collapsedStateText={ 'collapsed' }
          selectedKey={ 'key3' }
        />
      </div>
    );
  }

   _onClickHandler = (e) =>  {
    alert('test');
    return false;
  }

   _onClickHandler2 = (e) =>  {
    return false;
  }
}
