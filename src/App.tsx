import { useState, useEffect } from 'react'
import { Pencil, Trash2 } from 'lucide-react';
import './App.css' 

export default function App() {
  const [input, setInput] = useState("");
  
  const [tasks, setTasks] = useState<string[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [editTask, setEditTask] = useState({
    enabled: false,
    task: ""
  });

  // Salva sempre que a lista de tarefas mudar
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  
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
  }

  function handleDelete(item: string) {
    const removeTask = tasks.filter( task => task !== item )
    setTasks(removeTask)
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
      
      <h1> Lista de Tarefas </h1>

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
