import { FetchApi } from "@/utilities/ApiConfig";
import type { userType } from "@/models/account/userType";
import type { courseType, userCourseType } from "~/models/home/campTypes";

export async function fetchUsers() {
  return await FetchApi<[userType]>("account/admin/users");
}
export async function fetchUser(id: string | undefined) {
  return await FetchApi<userType>("account/admin/user/" + id, {
    method: "get",
  });
}
export async function updateUser(data: userType) {
  return await FetchApi<userType>("account/admin/user/" + data._id, {
    method: "put",
    body: data,
  });
}
export async function deleteUser(id: string | undefined) {
  return await FetchApi("account/admin/user/" + id, {
    method: "delete",
  });
}

export async function SupervisorCourses() {
  return await FetchApi<[courseType]>("account/supervisor/courses");
}

export async function completeSeason(
  courseId: string | undefined,
  seasonId: string | undefined
) {
  return await FetchApi(
    "account/user/complete-season/" + courseId + "/" + seasonId , {
      method:'post'
    }
  );
}

export async function updateCourseImage(
  id: string | undefined,
  data: FormData
) {
  return await FetchApi("account/supervisor/course-image/" + id, {
    method: "put",
    body: data,
  });
}
export async function fetchCourseImage(id: string | undefined) {
  return await FetchApi("account/supervisor/course-image/" + id, {
    method: "get",
  });
}
export async function createCourse(data: courseType) {
  return await FetchApi("account/supervisor/course", {
    method: "post",
    body: data,
  });
}
export async function updateCourse(data: courseType) {
  return await FetchApi("account/supervisor/course/" + data._id, {
    method: "put",
    body: data,
  });
}
export async function fetchCourse(id: string | undefined) {
  return await FetchApi<courseType>("account/supervisor/course/" + id, {
    method: "get",
  });
}
export async function deleteCourse(id: string | undefined) {
  return await FetchApi("account/supervisor/course/" + id, {
    method: "delete",
  });
}
export async function registerCourse(id: string | undefined) {
  return await FetchApi("account/register-course/" + id, {
    method: "post",
  });
}
export async function fetchUserCourses() {
  return await FetchApi<[userCourseType]>("account/user/courses");
}
export async function fetchUserCourse(slug: string | undefined) {
  return await FetchApi<userCourseType>("account/user/course/" + slug, {
    method: "get",
  });
}
export async function fetchSupervisorUsers() {
  return await FetchApi<[userType]>("account/supervisor/users", {
    method: "get",
  });
}
export async function deleteUserCourse(userId:string | undefined,courseId:string | undefined) {
  return await FetchApi("account/supervisor/user-course/" + courseId + "/" + userId, {
    method: "delete",
  });
}
export async function fetchProfile() {
  return await FetchApi("account/user" , {
    method:'get'
  })
}