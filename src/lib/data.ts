import type { EducationEntry, ProjectEntry, WorkEntry } from "./types";

export const education: EducationEntry[] = [
  {
    institution:
      "Netaji Subhas Institute of Technology (NSIT), Delhi University",
    location: "New Delhi, India",
    degree: "Bachelor of Engineering in Information Technology",
    period: "Aug 2018 – May 2022",
  },
];

export const workHistory: WorkEntry[] = [
  {
    company: "Ultimate Kronos Group (UKG)",
    role: "Software Engineer II",
    period: "July 2022 – Present",
  },
];

export const projects: ProjectEntry[] = [
  {
    name: "ESP32 Smart Air Purifier",
    description: "IoT air purifier with real-time particulate monitoring",
    url: "https://github.com/siddharthsaini/esp32-smart-air-purifier",
    linkLabel: "Code",
  },
  {
    name: "SplitPrint",
    description: "Utility that splits PDFs for manual duplex printing",
    codeUrl: "https://github.com/siddharthsaini/splitprint",
    url: "https://siddharthsaini.com/splitprint",
    linkLabel: "Link",
  },
  // {
  //   name: 'Shravik',
  //   description: 'Geolocation matchmaking platform for blue-collar migrant workers',
  //   url: 'https://github.com/siddharthsaini/Shravik-ShramikVikas',
  //   linkLabel: 'Code',
  // },
];
