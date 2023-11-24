<!-- TodoList.vue -->

<template>
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
</template>

<!-- <script>
    export default {
        name: 'TodoItem',
        props: {
            todos: {
                type: Array,
                required: true,
                default: () => []
            },
            showEditForm: {
                type: Function,
                required: true,
                default: () => {}
            },
            deleteTodo: {
                type: Function,
                required: true,
                default: () => {}
            },
        }
    }
</script> -->
<script setup>
import { defineProps } from 'vue';


const props = defineProps({
    todos: {
        type: Array,
        required: true,
        default: () => []
    },
    showEditForm: {
        type: Function,
        required: true,
        default: () => {}
    },
    deleteTodo: {
        type: Function,
        required: true,
        default: () => {}
    },
});
</script>

<style scoped>
    .todo-list {
        list-style-type: none;
        padding: 0;
        margin: 0;
        margin-top: 20px;
    }
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