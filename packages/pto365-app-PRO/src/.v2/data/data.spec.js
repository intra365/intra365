

import Data from '.'

test('Check that it renders', () => {

    let data = new Data()
    
    expect(data.ping()).toBeTruthy()
 
}
)


test('Check that it renders', () => {

    let data = new Data()
    
    expect(data.getUseCase("Increase employee engagement of firstline workers").Details).toContain("firstline")
 
}
)
