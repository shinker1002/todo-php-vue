<template>
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
</template>

<script>
    export default {
        name: 'EditTodoForm',
        props: {
            isEditFormVisible: {
                type: Boolean,
                required: true,
                default: "Default Message"
            },
            updateTodo: {
                type: Function,
                required: true,
                default: "Default Message"
            },
            editTodo: {
                type: Object,
                required: true,
                default: "Default Message"
            },
            cancelEdit: {
                type: Function,
                required: true,
                default: "Default Message"
            },

        }
    }
</script>


<style scoped>
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
</style>