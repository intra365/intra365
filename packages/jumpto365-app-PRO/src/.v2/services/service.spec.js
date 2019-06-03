
import Jumpto365Service from '.'

test('Check that it instansiate', async () => {

    var jumpto365Service = new Jumpto365Service()
    
    var good = await jumpto365Service.ping()
    expect(good).toBeTruthy()
    
}

)


test('Check that it can produce a tool document', async () => {

    var jumpto365Service = new Jumpto365Service()
    
    var good = await jumpto365Service.getToolDocument("word")
    expect(good).toBeTruthy()
    
}

)

test('Check that it can produce a tenant document', async () => {

    var jumpto365Service = new Jumpto365Service()
    
    var good = await jumpto365Service.getTenant("jumpto365")
    expect(good).toBeTruthy()
    
}

)

test('Check that it can produce a usecase document', async () => {

    var jumpto365Service = new Jumpto365Service()
    
    var good = await jumpto365Service.getUseCaseDocument("be productive on the road")
    expect(good).toBeTruthy()
    
}

)