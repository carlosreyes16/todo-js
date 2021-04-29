import { Todo } from '../classes';
import {todoList} from '../index';

//Referencias en el html
const divTodoList = document.querySelector('.todo-list');
const txtInput    = document.querySelector('.new-todo');
const btnBorrar   = document.querySelector('.clear-completed');
const ulFiltors   = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) =>{

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completado' : '' }" data-id="${ todo.id }">
			<div class="view">
				<input class="toggle" type="checkbox"  ${ ( todo.completado) ? 'checked' : '' }">
				<label>${ todo.tarea }</label>
				<button class="destroy"></button>
			</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`;

    const div =  document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;
}

//Eventos
txtInput.addEventListener('keyup', ( event ) => {

    if( event.keyCode === 13 && txtInput.value.length > 0 ){

        console.log(txtInput.value);
        const nuevoTodo =  new Todo( txtInput.value);
        todoList.nuevoTodo( nuevoTodo );

        crearTodoHtml( nuevoTodo );
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {

   
    const nombreElemento = event.target.localName; //input, label, button para saber que precionamos
    const todoElemento   = event.target.parentElement.parentElement;
    const todoId         = todoElemento.getAttribute('data-id');
    
    if( nombreElemento.includes('input') ){//click en el check

        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    
    } else if( nombreElemento.includes('button') ){// vamos a borrar el todo

        todoList.eliminarTodo( todoId );// el dato dentro del arreglo
        divTodoList.removeChild( todoElemento );//sirve para eliminar el html
    } 

 
});

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();
    //realiza el recorrido de menos a mas para poder borrar el elemento
    for( let i = divTodoList.children.length-1; i >= 0; i-- ){

        const elemento = divTodoList.children[i];
        //evalua si el elemento html es igual a completed borra ese elemento
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltors.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if( !filtro ){ return; }

    anchorFiltros.forEach( elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');

    for( const elemento of divTodoList.children ){

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro){

            case 'Pendiente':
                if( completado ){
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if( !completado ){
                    elemento.classList.add('hidden');
                }
            break;
        }
    }
});