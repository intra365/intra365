import Utility from '.'
import TestData from "../data/TestData"

test('Copy an array', () => {
    var tasks = TestData.tasks
    expect(Utility.GroupTasksBySubject(tasks).length).toEqual(223)
  }

)

