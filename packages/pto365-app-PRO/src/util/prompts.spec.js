
import Prompts from './Prompts'

test('Check that it instansiate', async () => {
     
    var prompt = await Prompts.getPromptFromGithub("login/authorized")
    expect(prompt).toBeDefined()
    

}

)


test('Check that it parse', async () => {
     
    var prompt = await Prompts.get("login/authorized")
    expect(prompt).toBeDefined()
    

}

)
