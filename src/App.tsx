import { useState, useEffect } from 'react'
import { Pencil, Trash2 } from 'lucide-react';
import './App.css' 

export default function App() {
  const [input, setInput] = useState("");
  
  const [tasks, setTasks] = useState<string[]>([]);

  const [editTask, setEditTask] = useState({
    enabled: false,
    task: ""
  });

  useEffect( () => {

    const tarefasSalvas = localStorage.getItem("@tarefasTask")

    if(tarefasSalvas) {
      setTasks(JSON.parse(tarefasSalvas)); // Pega as tarefas salvas no LocalStorage e converte em um array de string.
    }
    
  }, [])
  
  function handleRegister() {
    if(!input) {
      alert("Preencha o nome da sua tarefa!")
      return;
    }

    if(editTask.enabled) {
      handleSaveEdit();
      return;
    }

    setTasks([...tasks, input]);
    setInput("");

    localStorage.setItem("@tarefasTask", JSON.stringify([...tasks, input])); // Salva as tarefas no LocalStorage.
    
  }

  function handleSaveEdit() {
    const findIndexTask = tasks.findIndex(tasks => tasks === editTask.task)
    const alltask = [...tasks]

    alltask[findIndexTask] = input; // Atualiza a tarefa editada com o valor digitado no input
    setTasks(alltask);

    setEditTask({
      enabled: false,
      task: ""
    })
    
    setInput("");

    localStorage.setItem("@tarefasTask", JSON.stringify(alltask)); // Salva as tarefas no LocalStorage.
    
  }

  function handleDelete(item: string) {
    const removeTask = tasks.filter( task => task !== item )
    setTasks(removeTask)

    localStorage.setItem("@tarefasTask", JSON.stringify(removeTask)); // Salva as tarefas caso o usuário exclua alguma.

  }

  function handleEdit(item: string) {
    setInput(item); // Preenche o campo do input com a tarefa desejada.
    setEditTask({
      enabled: true,
      task: item
    })
  }
  
  return (
    <main className='container'>
      
      <h1> ToDoList </h1>

      <div className='input-container'>
        
        <input
          type="text"
          placeholder='Digite uma tarefa...'
          value={input}
          onChange={ (e) => setInput(e.target.value) }
        />
        
        <button onClick={handleRegister} className='buttonregister'>
          {editTask.enabled ? "Editar Tarefa" : "Adicionar Tarefa"}
        </button>

      </div>
      
      {tasks.map( (item, index) => (
        <section key={index}>

          <span className='task-text'> {item} </span>
          
          <div>
            <button onClick={ () => handleEdit(item) } className='button'>
              <Pencil size={16} color='white' />
            </button>
            
            <button onClick={ () => handleDelete(item) } className='button'>
              <Trash2 size={16} color='red' />
            </button>
          </div>

        </section>
      ) )}
      
    </main>
  )
}
