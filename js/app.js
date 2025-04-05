document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks =  [];
    let isEditing = false;
    let editingId = null;

    taskForm.addEventListener('click', (e) => {
        const vti = taskInput.value.trim();
        if (vti !='') {
            if (isEditing) {
                //console.log("Se guarda la edición");
                tasks = tasks.map(task => 
                    task.id === editingId ?{
                        ...task, text: vti
                } : task);
                isEditing = false;
                editingId = null;
            taskForm.innerText = "Agregar"
            }
            else {
            const task = {
                id: Date.now(),
                text: vti,
                complete: false
                };
            tasks.push(task);
            console.log(tasks);
            }
            renderTasks();
            taskInput.value = '';
        } 
        
    });

    
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            
            // Aplicar la clase según el estado de la tarea
            li.className = task.completed 
                ? 'flex justify-between items-center px-4 py-2 rounded bg-green-200' 
                : 'flex justify-between items-center bg-gray-100 px-4 py-2 rounded';
    
            // Crear el checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
    
            // Manejo del evento de cambio
            checkbox.addEventListener('change', () => {
                task.completed = checkbox.checked; // Actualiza el estado de la tarea
                renderTasks(); // Vuelve a renderizar para aplicar los cambios visuales
            });
    
            // Crear el texto de la tarea
            const span = document.createElement('span');
            span.textContent = task.text;
    
            // Crear los botones (ocultos si está completada)
            const buttons = document.createElement('div');
            buttons.className = task.completed 
                ? 'hidden' 
                : 'space-x-2 task-buttons';
    
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.className = 'text-blue-600 hover:underline';
            editButton.addEventListener('click', () => editTask(task.id));
    
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.className = 'text-red-600 hover:underline';
            deleteButton.addEventListener('click', () => deleteTask(task.id));
    
            buttons.appendChild(editButton);
            buttons.appendChild(deleteButton);
    
            // Ensamblar elementos
            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(buttons);
            taskList.appendChild(li);
        });
    }
    

    window.deleteTask = function (id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    }

    window.editTask = function (id) {
        const et = tasks.find(t => t.id === id);
        if (et) {
            taskInput.value = et.text;
            taskForm.innerText = "Guardar";
            isEditing = true;
            editingId = et.id;
        }
    }


});

