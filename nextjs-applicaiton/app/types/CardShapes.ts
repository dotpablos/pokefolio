import { LucideIcon } from "lucide-react";

export const PARENT_FOLDERS = {
  ABOUT_ME: "About Me",
  WORK_EXPERIENCE: "Work Experience",
  PROJECTS: "Projects",
} as const;

export type ParentFolder = (typeof PARENT_FOLDERS)[keyof typeof PARENT_FOLDERS];

export type detail = {
  type: string;
  detail: string;
};
export type ContentCardProps = {
  title: string;
  parentFolder?: ParentFolder;
  subtitle?: string;
  workDetails?: {
    detail1?: detail;
    detail2?: detail;
    detail3?: detail;
    detail4?: detail;
  };
  description: string;
  description2?: string;
  imagePathDir?: string;
  links?: {
    name: string;
    icon: LucideIcon;
    url: string;
  }[];
};

export type IdContentMap = Record<string, ContentCardProps>;
