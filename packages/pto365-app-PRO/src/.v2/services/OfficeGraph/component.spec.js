
import OfficeGraphService from '.'

test('Check that it instansiate', async () => {

    var instance = new OfficeGraphService()
    
    var good = await instance.ping()
    expect(good).toBeTruthy()
    
}

)
