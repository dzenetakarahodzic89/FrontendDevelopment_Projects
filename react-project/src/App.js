import logo from './logo.svg';
import './App.css';
import React from 'react'

const tabCategory = ['Todo', 'Done', 'All']
const baseURL = 'http://localhost:4000'

function App() {
  const [currentTabIndex, setCurrentTabIndex] = React.useState(0)
  const [taskList, setTaskList] = React.useState([]);
  const [selectedTaskList, setSelectedTaskList] = React.useState([]);
  const [taskName, setTaskName] = React.useState('')
  const getData = () => {
    fetch(`${baseURL}/api/todos`).then(response => response.json()).then((data) => {
      setTaskList(data)
      setSelectedTaskList(getSelectedTaskList(data, currentTabIndex))
    }).catch((err) => {
      window.alert("error loading data")
    })

  }
  const getSelectedTaskList = (tasks, index) => {
    let newSelectedTaskList = []

    switch (index) {
      case 0:
        newSelectedTaskList = tasks.filter((x) => !x.done)
        break;
      case 1:

        newSelectedTaskList = tasks.filter((x) => x.done)
        break;
      case 2:
      default:

        newSelectedTaskList = [...taskList]
    }
    setSelectedTaskList(newSelectedTaskList)
  }
  const addTask = () => {
    fetch(`${baseURL}/api/todos`, {
      method: "POST",
      body: JSON.stringify({ text: taskName }),
      headers: new Headers({ "content-type": "application/json" }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTaskList(data)
        getSelectedTaskList(data, currentTabIndex)

      })
      .catch(() => {
        alert("Error");
      });
  }

  const doneTask = (id) => {
    fetch(`${baseURL}/api/todos/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        setTaskList(data)
        getSelectedTaskList(data, currentTabIndex)
      })
      .catch((err) => {
        alert("Error");
      });
  }
  const deleteTask = (id) => {
    fetch(`${baseURL}/api/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setTaskList(data)
        getSelectedTaskList(data, currentTabIndex)
      })
      .catch((err) => {
        alert("Error");
      });
  }

  React.useEffect(() => {
    //Get Data and process it
    getData()
  }, [])

  React.useEffect(() => {
    getSelectedTaskList(taskList, currentTabIndex)
  }, [taskList, currentTabIndex])

  const onChangeInput = (e) => {
    setTaskName(e.target.value)
  }


  return (
    <div className="App">
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ flex: '2', height: '600px', overflow: "scroll", border: '1px solid #0f0f0f' }}>
          <div style={{ display: "flex", flexDirection: "row", width: '100%' }}>
            {tabCategory.map((category, index) => (
              <div style={
                index == currentTabIndex ? {
                  color: 'red',
                  backgroundColor: 'white',
                  flex: '1',
                  border: '2px solid gray',
                  padding: '10px'
                } : {
                  backgroundColor: 'red',
                  color: 'white',
                  flex: '1',
                  border: '2px solid gray',
                  padding: '10px'
                }
              } onClick={() => {
                setCurrentTabIndex(index)
              }}>
                {category}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "row", height: '30px', alignItems: 'stretch', width: '100%', borderBottom: '2px', borderTop: '2px', borderColor: 'gray', borderStyle: 'solid' }}>
            <div style={{ flex: 2, textAlign: 'center' }}>
              Task name


            </div>
            <div style={{ flex: 1, textAlign: 'center', }}>
              Is it Done
            </div>
            <div style={{ flex: 1, textAlign: 'center' }} >
              Change State

            </div>
            <div style={{ flex: 1, textAlign: 'center' }} >
              Delete

            </div>
          </div>
          {selectedTaskList && selectedTaskList.map((item, index) => {
            return (<div style={{ display: "flex", flexDirection: "row", height: '30px', alignItems: 'stretch', width: '100%', borderBottom: '2px', borderTop: '2px', borderColor: 'gray', borderStyle: 'solid' }}>
              <div style={{ flex: 2, textAlign: 'center' }}>
                {item.text}
              </div>
              <div style={{ flex: 1, textAlign: 'center', }}>
                {!!item.done ? "Done" : "Not Done"}
              </div>

              {!item.done ? <button style={{ flex: 1, textAlign: 'center' }} onClick={(e) => {
                doneTask(item._id)

              }}>
                Change State
              </button> : <div style={{ flex: 1, textAlign: 'center' }}>Done</div>}
              <button style={{ flex: 1, textAlign: 'center' }} onClick={(e) => {
                deleteTask(item._id)
              }}>
                Delete
              </button>
            </div>)

          })}

        </div>
        <div style={{ flex: '1' }}>
          <div>Enter Task name </div>
          <input style={{ border: '1px solid #0f0f0f', borderRadius: '100px', width: '80%', height: '30px' }} onChange={onChangeInput} />
          <button style={{
            backgroundColor: 'red',
            color: 'white',
            width: '80%',
            marginTop: '10px'
          }} onClick={(e) => {
            addTask()

          }}>Add task</button>
        </div>


      </div>
    </div>
  );
}

export default App;
