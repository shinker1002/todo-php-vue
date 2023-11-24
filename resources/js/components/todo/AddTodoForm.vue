<template>
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
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  isAddTodoFormVisible: {
    type: Boolean,
    required: true,
    default: false, // Default value should be a boolean
  },
  addTodo: {
    type: Function,
    required: true,
    default: () => {}, // Default value should be a function
  },
  newTodo: {
    type: Object,
    required: true,
    default: () => ({}), // Default value should be an object
  },
});
</script>

<style scoped>
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
</style>