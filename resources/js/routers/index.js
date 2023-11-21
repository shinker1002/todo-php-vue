import { createWebHistory, createRouter } from "vue-router";
import TodoListContainer from "../container/TodoListContainer.vue";

const routes = [
    {
        path: "/",  // TestComponent.vue로 이동할 Path
        name: "TodoListContainer",  // router name
        component: TodoListContainer,  // Path로 이동될 Component
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;