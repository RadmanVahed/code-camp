import type {
  accordionType,
  sectionType,
  socialType,
  hintType,
  courseType
} from "@/models/home/campTypes";
import {
  fetchAccordions,
  fetchHints,
  fetchSection,
  fetchSocial,
  deleteAccordion,
  deleteHint,
  fetchCourses,
} from "@/services/camp.service";
import type { SocketResponse } from "@/models/SocketResponse";
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:8080");
import { useNotificationStore } from "@/stores/notification";
export const useCampStore = defineStore("camp", () => {
  const notificationStore = useNotificationStore();
  var accordions = ref<accordionType[]>([]);
  var section = ref<sectionType>();
  var social = ref<socialType>();
  var hints = ref<hintType[]>([]);
  var courses = ref<courseType[]>([])
  const courseId = ref("")
  const isOpen = ref(false);
  const modalType = ref("");
  const accordionId = ref("");
  const hintId = ref("");
  const Accordions = async () => {
    var res = await fetchAccordions();
    accordions.value = res.data;
  };
  const Section = async () => {
    var res = await fetchSection();
    section.value = res.data;
    console.log(res);
  };
  const Hints = async () => {
    var res = await fetchHints();
    console.log(res);
    hints.value = res.data;
  };
  const Social = async () => {
    var res = await fetchSocial();
    social.value = res.data;
  };
  const Courses = async () => {
    var res = await fetchCourses()
    courses.value = res.data
  }
  async function removeAccordion(id: string) {
    try {
      var res = await deleteAccordion(id);
      notificationStore.PushNotification(res.message, res.statusCode);
    } catch (error) {
      notificationStore.CatchNotification();
    } finally {
      isOpen.value = false;
    }
  }
  async function removeHint(id: string) {
    try {
      var res = await deleteHint(id);
      notificationStore.PushNotification(res.message, res.statusCode);
    } catch (error) {
      notificationStore.CatchNotification();
    } finally {
      isOpen.value = false;
    }
  }
  socket.on("accordion", (response: SocketResponse<accordionType>) => {
    if (response.action == "create") {
      accordions.value.push(response.data);
    }
    if (response.action == "delete") {
      accordions.value = accordions.value.filter((element) => {
        return element._id !== response.data._id;
      });
    }
    if (response.action == "update") {
      accordions.value = accordions.value.map((element) => {
        if (element._id == response.data._id) {
          return response.data;
        }
        return element;
      });
    }
  });
  socket.on("hint", (response: SocketResponse<hintType>) => {
    if (response.action == "create") {
      hints.value.push(response.data);
    }
    if (response.action == "delete") {
      hints.value = hints.value.filter((element) => {
        return element._id !== response.data._id;
      });
    }
    if (response.action == "update") {
      hints.value = hints.value.map((element) => {
        if (element._id == response.data._id) {
          return response.data;
        }
        return element;
      });
    }
  });
  socket.on("section", (response: SocketResponse<sectionType>) => {
    if (response.action == "update") {
      section.value = response.data;
    }
    if (response.action == "create") {
      section.value = response.data
    }
  });
  socket.on("social", (response: SocketResponse<socialType>) => {
    if (response.action == "update") {
      social.value = response.data;
    }
  });
  const getCampData = () => {
    Section();
    Accordions();
    Hints();
    Social();
    Courses()
  };
  return {
    accordions,
    section,
    hints,
    social,
    courses,
    courseId,
    isOpen,
    modalType,
    accordionId,
    hintId,
    getCampData,
    removeAccordion,
    removeHint,
  };
});
