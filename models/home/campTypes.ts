import type { userType } from "../account/userType";

export interface accordionType {
  _id: string;
  color: string;
  content: string;
  label: string;
}
export interface sectionType {
  image: File | string | Blob;
  content: string;
  label: string;
}
export interface socialType {
  githubUrl: string;
  telegramUrl: string;
  instagramUrl: string;
}

export interface hintType {
  _id: string;
  label: string;
  content: string;
  icon: string;
}

export interface seasonType {
  color: string;
  label: string;
  content: string;
  type: string;
  enable: boolean;
  task: [
    {
      label: string;
      content: string;
    }
  ];
}
export interface detailsType {
  completed:Boolean,
  completedSeason:[
    {
      _id:string
    }
  ]
}
export interface courseType {
  _id: string;
  slug:string;
  image:string;
  current:number;
  supervisor: string | userType;
  title: string;
  description: string;
  duration: string;
  link: string;
  level: string;
  season: [seasonType];
  finished: boolean;
}

export interface userCourseType {
  course:courseType
  detail:detailsType
}
