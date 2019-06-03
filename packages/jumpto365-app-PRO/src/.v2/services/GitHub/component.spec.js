
import GitHubService from '.'

test('Check that it instansiate', async () => {

    var instance = new GitHubService()
    
    var good = await instance.ping()
    expect(good).toBeTruthy()
    
}

)
