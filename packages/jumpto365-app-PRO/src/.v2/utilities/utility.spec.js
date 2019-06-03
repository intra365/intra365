import Utility from '.'
import TestData from "../data/TestData"

test('Copy an array', () => {
    expect(Utility.CopyArray(['bear', 'pizza'])).toContain('pizza')
  }

)

test('Filter without any terms', () => {
    expect.assertions(1);

    var groupedTasks = Utility.GroupTasksBySubject(TestData.tasks)
    return Utility.FilterItems(groupedTasks, [], null).then(data => expect(data.length).toEqual(223));


  }

)

test('Filter on search', () => {
  expect.assertions(1);

  var groupedTasks = Utility.GroupTasksBySubject(TestData.tasks)
  return Utility.FilterItems(groupedTasks, [], 'news').then(data => expect(data.length).toEqual(1));


}

)


test('Filter on tool', () => {
  expect.assertions(1);

  var groupedTasks = Utility.GroupTasksBySubject(TestData.tasks)
  return Utility.FilterItems(groupedTasks, ['tools:sway'], '').then(data => expect(data.length).toEqual(15));


}

)

test('Filter on area', () => {
  expect.assertions(1);

  var groupedTasks = Utility.GroupTasksBySubject(TestData.tasks)
  return Utility.FilterItems(groupedTasks, ['area:manufacturing'], '').then(data => expect(data.length).toEqual(6));


}

)


test('Copy name from subject', () => {
  expect(Utility.EnsureNameAndApplyKeyValue(TestData.tasks,"subject")[0].name).toEqual("Work together on documents with colleagues")
 
}

)