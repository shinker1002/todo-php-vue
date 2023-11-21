<!-- TodoList.vue -->

<template>
  <div>
    <h1>Todo List</h1>
    <button @click="showAddTodoForm" class="add-todo-button">Add Todo</button>

    <!-- 추가 폼 -->
    <div v-if="isAddTodoFormVisible" class="add-todo-form">
      <h2>Add Todo</h2>
      <form @submit.prevent="addTodo">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="newTodo.title" required>

        <label for="description">Description:</label>
        <textarea id="description" v-model="newTodo.description"></textarea>
				
				<div>
					<label for="completed">Completed:</label>
					<input type="checkbox" id="completed" v-model="newTodo.completed">
				</div>

        <button type="submit">Add</button>
      </form>
    </div>

    <!-- 수정 폼 -->
    <div v-if="isEditFormVisible" class="edit-todo-form">
      <h2>Edit Todo</h2>
      <form @submit.prevent="updateTodo">
        <label for="editTitle">Title:</label>
        <input type="text" id="editTitle" v-model="editTodo.title" required>

        <label for="editDescription">Description:</label>
        <textarea id="editDescription" v-model="editTodo.description"></textarea>
				<div>
					<label for="editCompleted">Completed:</label>
					<input type="checkbox" id="editCompleted" v-model="editTodo.completed">
				</div>

        <button type="submit">Update</button>
        <button @click="cancelEdit">Cancel</button>
      </form>
    </div>

    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id" class="todo-item">
        <strong>{{ todo.title }}</strong>
        <p>Description: {{ todo.description }}</p>
        <p>Completed: {{ todo.completed ? 'Yes' : 'No' }}</p>
        <button @click="showEditForm(todo)" class="edit-button">Edit</button>
        <!-- 삭제하기 버튼 -->
        <button @click="deleteTodo(todo.id)" class="delete-button">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
	import { ref, onMounted } from 'vue';
	import axios from 'axios';
	import TodoApi from './api/TodoApi';

	export default {
		setup() {
			const todos = ref([]);
			const isAddTodoFormVisible = ref(false);
			const isEditFormVisible = ref(false);
			const newTodo = ref({
				title: '',
				description: '',
				completed: false,
			});
			const editTodo = ref({
				id: null,
				title: '',
				description: '',
				completed: false,
			});

			const fetchTodos = async () => {
				try {
					const response = await TodoApi.getTodos();
					todos.value = response.data.reverse();
				} catch (error) {
					console.error('API 호출 오류:', error);
				}
			};

			const showAddTodoForm = () => {
				isAddTodoFormVisible.value = !isAddTodoFormVisible.value;
				// 추가 폼이 열릴 때 수정 폼 닫기
				isEditFormVisible.value = false;
			};

			const showEditForm = (todo) => {
				// 수정 폼 열기
				isEditFormVisible.value = true;

				isAddTodoFormVisible.value = false;
				// 수정할 Todo 정보 설정
				editTodo.value = { ...todo };
			};

			const cancelEdit = () => {
				// 수정 폼 닫기
				isEditFormVisible.value = false;
				// 수정 Todo 초기화
				editTodo.value = {
					id: null,
					title: '',
					description: '',
					completed: false,
				};
			};

			const addTodo = async () => {
				try {
					// 서버에 새로운 Todo 추가
					await TodoApi.addTodo(newTodo.value)
					// Todo 목록 다시 불러오기
					await fetchTodos();
					// 추가 폼 닫기
					isAddTodoFormVisible.value = false;
					// 새로운 Todo 초기화
					newTodo.value = {
						title: '',
						description: '',
						completed: false,
					};
				} catch (error) {
					console.error('Todo 추가 오류:', error);
				}
			};

			// 업데이트
			const updateTodo = async () => {
				try {
					// 서버에 Todo 업데이트 요청
					await TodoApi.updateTodo(editTodo.value.id, editTodo.value)
					// Todo 목록 다시 불러오기
					await fetchTodos();
					// 수정 폼 닫기
					isEditFormVisible.value = false;
					// 수정 Todo 초기화
					editTodo.value = {
						id: null,
						title: '',
						description: '',
						completed: false,
					};
				} catch (error) {
					console.error('Todo 업데이트 오류:', error);
				}
			};

			// 삭제하기
			const deleteTodo = async (todoId) => {
				try {
					// 서버에서 Todo 삭제
					if(confirm('삭제?')) {
						await TodoApi.deleteTodo(todoId);
						// Todo 목록 다시 불러오기
						await fetchTodos();
					}
				} catch (error) {
					console.error('Todo 삭제 오류:', error);
				}
			};

			onMounted(fetchTodos);

			return {
				todos,
				isAddTodoFormVisible,
				isEditFormVisible,
				newTodo,
				editTodo,
				showAddTodoForm,
				showEditForm,
				cancelEdit,
				addTodo,
				updateTodo,
				deleteTodo,
			};
		},
	};
</script>

  
  <style scoped>
  /* Todo 아이템 스타일 */
  .todo-item {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  
  /* Todo 제목 스타일 */
  .todo-item strong {
    color: #333;
  }
  
  /* Todo 설명 스타일 */
  .todo-item p {
    color: #666;
  }
  
  /* Todo 완료 여부 스타일 */
  .todo-item p:last-child {
    color: #999;
  }
  
  /* Todo 리스트 스타일 제거 */
  .todo-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    margin-top: 20px;
  }
  
  /* Add Todo 버튼 스타일 */
  .add-todo-button {
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  /* 추가 폼 스타일 */
  .add-todo-form {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 5px;
  }
	.add-todo-form div {
		display: flex;
	}
	.add-todo-form div #completed {
		width: 30px;
		margin: 5px 5px 5px 5px;
	}
  .add-todo-form h2 {
    margin-bottom: 10px;
  }
  
  .add-todo-form label {
    display: block;
    margin-bottom: 5px;
  }
  
  .add-todo-form input,
  .add-todo-form textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    box-sizing: border-box;
  }
  
  .add-todo-form button {
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .edit-button {
		background-color: #ffc107;
		color: white;
		padding: 5px 10px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		font-size: 14px;
		margin-right: 5px;
	}
		/* 수정 폼 스타일 */
	/* 수정 폼 스타일 */
	.edit-todo-form {
		margin-top: 20px;
		margin-bottom: 20px;
		border: 1px solid #ccc;
		padding: 20px;
		border-radius: 5px;
	}
	.edit-todo-form div {
		display: flex;
	}
	.edit-todo-form div #editCompleted {
		width: 30px;
		margin: 5px 5px 5px 5px;
	}
	.edit-todo-form h2 {
		margin-bottom: 10px;
	}

	.edit-todo-form label {
		display: block;
		margin-bottom: 5px;
	}

	.edit-todo-form input,
	.edit-todo-form textarea {
		width: 100%;
		padding: 8px;
		margin-bottom: 10px;
		box-sizing: border-box;
	}

	.edit-todo-form button {
		background-color: #007bff;
		color: white;
		padding: 10px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		margin-top: 10px; /* 수정된 부분: 버튼 위 간격 조절 */
	}

	.edit-todo-form button:last-child {
		background-color: #dc3545;
		margin-left: 5px;
	}
	/* 삭제하기 버튼 스타일 */
	.delete-button {
		background-color: #dc3545;
		color: white;
		padding: 5px 10px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		font-size: 14px;
	}
  </style>