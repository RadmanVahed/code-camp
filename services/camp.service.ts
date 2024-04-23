import { FetchApi } from "@/utilities/ApiConfig";
import type {
  accordionType,
  sectionType,
  socialType,
  hintType,
  courseType,
} from "@/models/home/campTypes";

//#######   Accordion   #######//
export const fetchAccordions = async () => {
  return await FetchApi<[accordionType]>("camp/accordions");
};
export const fetchAccordion = async (id: string | undefined) => {
  return await FetchApi<accordionType>("camp/accordion/" + id, {
    method: "get",
  });
};
export const createAccordion = async (data: accordionType) => {
  return await FetchApi("camp/accordion", {
    method: "post",
    body: data,
  });
};
export const updateAccordion = async (data: accordionType) => {
  return await FetchApi("camp/accordion/" + data._id, {
    method: "put",
    body: data,
  });
};
export const deleteAccordion = async (id: string) => {
  return await FetchApi("camp/accordion/" + id, {
    method: "delete",
  });
};
//#######   Section   #######//
export const fetchSection = async () => {
  return await FetchApi<sectionType>("camp/section");
};
export const createSection = async (data: FormData) => {
  return await FetchApi<sectionType>("camp/section", {
    method: "post",
    body: data,
  });
};
export const updateSection = async (data: FormData) => {
  return await FetchApi<sectionType>("camp/section", {
    method: "put",
    body: data,
  });
};
//#######   Social   #######//
export const fetchSocial = async () => {
  return await FetchApi<socialType>("camp/social");
};
export const createSocial = async (data:socialType) => {
  return await FetchApi<socialType>("camp/social", {
    method: "post",
    body: data,
  });
};
export const updateSocial = async (data:socialType) => {
  return await FetchApi<socialType>("camp/social", {
    method: "put",
    body: data,
  });
};
//#######   Hint   #######//
export const fetchHints = async () => {
  return await FetchApi<[hintType]>("camp/hints");
};
export const fetchHint = async (id: string | undefined) => {
  return await FetchApi<hintType>("camp/hint/" + id, {
    method: "get",
  });
};
export const createHint = async (data: hintType) => {
  return await FetchApi<hintType>("camp/hint", {
    method: "post",
    body: data,
  });
};
export const updateHint = async (data: hintType) => {
  return await FetchApi<hintType>("camp/hint/" + data._id, {
    method: "put",
    body: data,
  });
};
export const deleteHint = async (id: string | undefined) => {
  return await FetchApi<hintType>("camp/hint/" + id, {
    method: "delete",
  });
};
//#######   Course   #######//
export async function fetchCourses() {
  return await FetchApi<[courseType]>("camp/courses")
}
