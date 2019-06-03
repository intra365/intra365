

import Data from './';

test('Can find Word', () => {
    
    var data = new Data()

    expect(data.getApp('Word').name).toBe("word"); 
 
}
)
test('Should not be able to find Killroy', () => {
    
    var data = new Data()

    expect(data.getApp('Killroy')).toBeUndefined(); 
 
}
) 
