import Utility from '.'
import TestData from "../data/TestData"
import Data from "../data"
test('Copy an array', () => {
    var data = new Data()
    
    var groupedTasks = Utility.GroupTasksBySubject(TestData.tasks)
    
    expect(Utility.ResolveTools(groupedTasks[0].tools,data.getApp)[0]).toHaveProperty("data.name")
  }

)

