import List from "../components/pet/List";
import Add from "../components/pet/Add";
import Show from "../components/pet/Show";

export default {
  mode: "history",
  routes: [
    {
      name: "List",
      path: "/",
      component: List,
    },
    {
      name: "Add",
      path: "/pet/add",
      component: Add,
    },
    {
      name: "Show",
      path: "/pet/:id",
      component: Show,
    },
  ],
};
