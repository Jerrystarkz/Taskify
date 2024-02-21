import { useState } from 'react'
import './App.css'

import InputField from './component/InputField'
import TodoList from './component/TodoList'
import { Todo } from './component/model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [CompletedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }])
      setTodo("");
    }
  };


  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
   console.log(result)

   if (!destination) return;

   if 
   (destination.droppableId === source.droppableId
     && destination.index === source.index
     )
      return;

      let add,
      active = todos, 
      complete = CompletedTodos;

      if(source.droppableId === "TodosList"){
        add = active[source.index];
        active.splice(source.index, 1)
      } else {
        add = complete[source.index];
        complete.splice(source.index, 1);
      }

      if(destination.droppableId === "TodosList"){
        active.splice(destination.index, 0, add)
      } else {
        complete.splice(destination.index, 0, add); // Corrected to destination.index
      }
      

      setCompletedTodos(complete)
      setTodos(active)


  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          CompletedTodos={CompletedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  )
}

export default App
