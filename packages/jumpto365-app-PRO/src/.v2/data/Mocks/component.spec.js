

import Mocks from '.'

test('Check that it renders', () => {

    let tasks = Mocks.tasks()

    expect(tasks.length).toBeGreaterThan(0)
 
}
)
test('Check that it looks ok', () => {

    let tasks = Mocks.tasks()

    expect(tasks[0].name).toBe("Work together on documents with colleagues")
 
}

)

test('Check that scenario looks ok', () => {

    let scenario = Mocks.scenario()

    expect(scenario).toHaveProperty("tools")
 
}

)


test('Check that scenario panel mock is ok', () => {

    let scenario = Mocks.scenariosPanel()

    expect(scenario).toHaveProperty("id")
 
}

)