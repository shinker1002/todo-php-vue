<!-- TodoList.vue -->

<template>
  <router-view />
</template>

<script>
	import { ref, onMounted } from 'vue';
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

</style>