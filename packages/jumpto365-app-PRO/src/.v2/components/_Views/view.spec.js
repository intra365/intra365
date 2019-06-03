

import Views from './';

test('Get 1 column scenario view', () => {
    
    var view = new Views()

    expect(view.scenario('toolsinonecolumn').length).toBeGreaterThan(0); 
 
}
)
