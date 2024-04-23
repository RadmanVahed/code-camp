import type { userType } from "@/models/account/userType";
import {
  fetchUsers,
  deleteUser,
  SupervisorCourses,
  deleteCourse,
  fetchUserCourses,
  fetchUserCourse,
  fetchSupervisorUsers,
  deleteUserCourse,
} from "@/services/account.service";
import type { SocketResponse } from "@/models/SocketResponse";
import openSocket from "socket.io-client";
import type { courseType, userCourseType } from "~/models/home/campTypes";
export const useAccountStore = defineStore("account", () => {
  const socket = openSocket("http://localhost:8080");
  const notificationStore = useNotificationStore();
  const campStore = useCampStore();
  const users = ref<userType[]>([]);
  const userId = ref("");
  const loading = ref(false);
  const courses = ref<userCourseType[]>([]);
  const course = ref<userCourseType>();
  const courseId = ref();

  const AdminUsers = async () => {
    try {
      loading.value = true;
      var res = await fetchUsers();
      users.value = res.data;
    } catch (error) {
      notificationStore.CatchNotification();
    } finally {
      loading.value = false;
    }
  };
  const SupervisorUsers = async () => {
    try {
      const res = await fetchSupervisorUsers()
      console.log(res);
      users.value = res.data
    } catch (error) {}
  };
  const fetchSupervisorCourses = async () => {
    try {
      var res = await SupervisorCourses();
      courses.value = res.data;
    } catch (error) {}
  };
  const UserCourses = async () => {
    try {
      var res = await fetchUserCourses();
      courses.value = res.data;
    } catch (error) {}
  };
  const UserCourse = async (slug: string) => {
    try {
      if (courses.value.length == 0) {
        var res = await fetchUserCourse(slug);
        courses.value.push(res.data);
      }
      const courseIndex = courses.value.findIndex(
        (element) => element.course.slug == slug
      );
      if (courseIndex !== -1) {
        course.value = courses.value[courseIndex];
        socket.on("course", (response: SocketResponse<courseType>) => {
          if (
            response.action === "update" &&
            response.data.course.slug === slug
          ) {
            course.value = response.data;
          }
          if (
            response.action === "edit" &&
            response.data.slug === slug
          ) {
            course.value.course = response.data;
          }
        });
      }
    } catch (error) {}
  };
  async function removeUser(userId: string) {
    try {
      loading.value = true;
      var res = await deleteUser(userId);
      notificationStore.PushNotification(res.message, res.statusCode);
    } catch (error) {
      notificationStore.CatchNotification();
    } finally {
      campStore.isOpen = false;
      loading.value = false;
    }
  }
  async function removeCourse() {
    try {
      var res = await deleteCourse(courseId.value);
      notificationStore.PushNotification(res.message, res.statusCode);
    } catch (error) {
      notificationStore.CatchNotification();
    } finally {
      campStore.isOpen = false;
      loading.value = false;
    }
  }

  async function removeUserCourse(userId:string,courseId:string) {
    var res = await deleteUserCourse(userId,courseId)
    console.log(res);
  }

  socket.on("user", (response: SocketResponse<userType>) => {
    if (response.action == "create") {
      users.value.push(response.data);
    }
    if (response.action == "delete") {
      users.value = users.value.filter((element) => {
        return element._id !== response.data._id;
      });
    }
    if (response.action == "update") {
      users.value = users.value.map((element) => {
        if (element._id == response.data._id) {
          return response.data;
        }
        return element;
      });
    }
  });
  socket.on("course", (response: SocketResponse<courseType>) => {
    if (response.action == "create") {
      courses.value.push(response.data);
    }
    if (response.action == "delete") {
      courses.value = courses.value.filter((element) => {
        if (element.course == undefined) {
          return element._id !== response.data._id;
        }
        else {
          return element.course._id !== response.data._id;
        }
      });
    }
    if (response.action == "remove") {
      console.log(response);
      if (courses.course == undefined) {
        users.value = users.value.filter((element) =>{
          return element._id !== response.data._id
        })
      }
    }
    if (response.action == "update") {
      courses.value = courses.value.map((element) => {
        if (element.course._id == response.data.course._id) {
          return response.data;
        }
        return element;
      });
    }
    if (response.action == "edit") {
      courses.value = courses.value.map((element) => {
        if (element.course == undefined) {
          if (element._id == response.data._id) {
            element = response.data;
          }
        }
        if (element.course != undefined) {
          if (element.course._id == response.data._id) {
            element.course = response.data;
          }
        }
        return element;
      });
    }
  });

  return {
    users,
    userId,
    loading,
    courses,
    course,
    courseId,
    AdminUsers,
    removeUser,
    removeCourse,
    fetchSupervisorCourses,
    UserCourses,
    UserCourse,
    SupervisorUsers,
    removeUserCourse,
  };
});
