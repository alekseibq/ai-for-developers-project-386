import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/admin",
    component: () => import("@/pages/admin/AdminLayout.vue"),
    children: [
      {
        path: "",
        redirect: { name: "meeting-types" },
      },
      {
        path: "meeting_types",
        name: "meeting-types",
        component: () => import("@/pages/admin/MeetingTypesPage.vue"),
      },
      {
        path: "meeting_types/new",
        name: "create-meeting-type",
        component: () => import("@/pages/admin/CreateMeetingTypePage.vue"),
      },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
