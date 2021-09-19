import {
  DataGrid,
  GridColDef,
  GridEditCellPropsParams,
  GridValueGetterParams,
} from "@material-ui/data-grid";

export interface JobCode {
  l1: string;
  jobCode: string;
  l2: string;
  l3: string;
  l4: string;
  l5: string;
  classification: string;
  location: string;
  l3Title: string;
  l4Title: string;
}

export interface TimeEntryCode {
  id: number;
  codeEntry: JobCode;
  int_change?: number;
}

export interface TimeEntryHour {
  day1: number | string;
  day2: number | string;
  day3: number | string;
  day4: number | string;
  day5: number | string;
  day6: number | string;
  day7: number | string;
}

export interface TimeEntry {
  id: number;
  projectDetails: TimeEntryCode;
  hours: TimeEntryHour;
}
export interface DropdownStructure {
  key: number;
  value: string;
}
export interface TimeEntryDataTable {
  id: number;
  jobCode: string;
  // project: string,
  l1: string;
  l2: string;
  l3: string;
  l4: string;
  l5: string;
  classification: string;
  location: string;
  l3Title: string;
  l4Title: string;
  total: number|string;
  day1: number | string;
  day2: number | string;
  day3: number | string;
  day4: number | string;
  day5: number | string;
  day6: number | string;
  day7: number | string;
  int_change: number;
}

export enum Day {
  DAY1 = "day1",
  DAY2 = "day2",
  DAY3 = "day3",
  DAY4 = "day4",
  DAY5 = "day5",
  DAY6 = "day6",
  DAY7 = "day7",
}

export const getEmptyHours = (): TimeEntryHour => {
  return {
    day1: "0.0",
    day2: "0.0",
    day3: "0.0",
    day4: "0.0",
    day5: "0.0",
    day6: "0.0",
    day7: "0.0",
  };
};

export const getNewCode = (): TimeEntryCode => {
  return {
    id: 0,
    codeEntry: {
      l1: "",
      jobCode: "",
      l2: "",
      l3: "",
      l4: "",
      l5: "",
      classification: "",
      location: "",
      l3Title: "",
      l4Title: "",
    },
    int_change: 0,
  };
};

const timeEntryCodeColumns: GridColDef[] = [
  {
    field: "project",
    headerName: "Project(L-1)",
    width: 138,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "jobcode",
    headerName: "Job Code",
    width: 94,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "l_2",
    headerName: "L-2",
    width: 55,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "l_3",
    headerName: "L-3",
    width: 55,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "l_4",
    headerName: "L-4",
    width: 55,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "depth_4",
    headerName: "Dept(L-5)",
    width: 120,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "classific",
    headerName: "Classific",
    width: 100,
    editable: true,
    sortable: false,
    disableColumnMenu: true,
    type: "editable",
  },
  {
    field: "location",
    headerName: "Location",
    width: 100,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "l_3title",
    headerName: "L-3-Title",
    width: 100,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "l_4title",
    headerName: "L-4-Title",
    width: 120,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "total",
    headerName: "Total",
    width: 75,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
];

const timeEntryHourColumns: GridColDef[] = [
  {
    field: "day01",
    headerName: "1",
    width: 75,
    type: "number",
    editable: true,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "day02",
    headerName: "2",
    width: 75,
    editable: true,
    type: "number",
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "day03",
    headerName: "3",
    width: 75,
    type: "number",
    editable: true,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "day04",
    headerName: "4",
    type: "number",
    width: 75,
    editable: true,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "day05",
    headerName: "5",
    width: 75,
    type: "number",
    editable: true,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "day06",
    headerName: "6",
    width: 75,
    type: "number",
    editable: true,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "day07",
    headerName: "7",
    width: 75,
    editable: true,
    type: "number",
    sortable: false,
    disableColumnMenu: true,
  },
];

// let timeSheetColumns: GridColDef[] = [
//   {
//     field: "project",
//     headerName: "Project(L-1)",
//     width: 138,
//     editable: false,
//     sortable: false,
//     disableColumnMenu: true,
//   },
//   {
//     field: "jobcode",
//     headerName: "Job Code",
//     width: 94,
//     editable: false,
//     sortable: false,
//     disableColumnMenu: true,
//   },
//   {
//     field: "l_2",
//     headerName: "L-2",
//     width: 55,
//     editable: false,
//     sortable: false,
//     disableColumnMenu: true,
//   },
//   {
//     field: "l_3",
//     headerName: "L-3",
//     width: 55,
//     editable: false,
//     sortable: false,
//     disableColumnMenu: true,
//   },
//   {
//     field: "l_4",
//     headerName: "L-4",
//     width: 55,
//     editable: false,
//     sortable: false,
//     disableColumnMenu: true,
//   },
//   {
//     field: "depth_4",
//     headerName: "Dept(L-5)",
//     width: 120,
//     editable: false,
//     sortable: false,
//     disableColumnMenu: true,
//   },
//   {
//     field: "classific",
//     headerName: "Classific",
//     width: 100,
//     editable: true,
//     sortable: false,
//     disableColumnMenu: true,
//     type: "editable",
//   },
//   {
//     field: "location",
//     headerName: "Location",
//     width: 100,
//     editable: false,
//     sortable: false,
//     disableColumnMenu: true,
//   },
//   {
//     field: "l_3title",
//     headerName: "L-3-Title",
//     width: 100,
//     editable: false,
//     sortable: false,
//     disableColumnMenu: true,
//   },
//   {
//     field: "l_4title",
//     headerName: "L-4-Title",
//     width: 120,
//     editable: false,
//     sortable: false,
//     disableColumnMenu: true,
//   },
//   {
//     field: "total",
//     headerName: "Total",
//     width: 75,
//     editable: false,
//     sortable: false,
//     disableColumnMenu: true,
//   },
//   {
//     field: "day01",
//     headerName: "21 Jun",
//     width: 75,
//     type: "number",
//     editable: true,
//     sortable: false,
//     disableColumnMenu: true,
//   },
//   {
//     field: "day02",
//     headerName: "22 Jun",
//     width: 75,
//     editable: true,
//     type: "number",
//     sortable: false,
//     disableColumnMenu: true,
//   },
//   {
//     field: "day03",
//     headerName: "23 Jun",
//     width: 75,
//     type: "number",
//     editable: true,
//     sortable: false,
//     disableColumnMenu: true,
//   },
//   {
//     field: "day04",
//     headerName: "24 Jun",
//     type: "number",
//     width: 75,
//     editable: true,
//     sortable: false,
//     disableColumnMenu: true,
//   },
//   {
//     field: "day05",
//     headerName: "25 Jun",
//     width: 75,
//     type: "number",
//     editable: true,
//     sortable: false,
//     disableColumnMenu: true,
//   },
//   {
//     field: "day06",
//     headerName: "26 Jun",
//     width: 75,
//     type: "number",
//     editable: true,
//     sortable: false,
//     disableColumnMenu: true,
//   },
//   {
//     field: "day07",
//     headerName: "27 Jun",
//     width: 75,
//     editable: true,
//     type: "number",
//     sortable: false,
//     disableColumnMenu: true,
//   },
// ];

// const timeSheetData = [
//   {
//     id: 1,
//     jobcode: null,
//     project: "BGR",
//     age: 35,
//     l_2: "01A",
//     l_3: "01",
//     l_4: "01",
//     depth_4: "-",
//     classific: "0910",
//     location: "CGH",
//     l_3title: "Assets Register/Equip",
//     l_4title: "Identify scope of work for tags",
//     total: "24.0",
//     day01: "",
//     day02: "",
//     day03: "",
//     day04: "",
//     day05: "",
//     day06: "",
//     day07: "",
//   },
//   {
//     id: 2,
//     jobcode: null,
//     project: "BGR",
//     age: 35,
//     l_2: "01A",
//     l_3: "01",
//     l_4: "01",
//     depth_4: "-",
//     classific: "0910",
//     location: "CGH",
//     l_3title: "Assets Register/Equip",
//     l_4title: "Identify scope of work for tags",
//     total: "26.0",
//     day01: "",
//     day02: "",
//     day03: "",
//     day04: "",
//     day05: "",
//     day06: "",
//     day07: "",
//   },
// ];

let totalColumns: GridColDef[] = [
  {
    field: "title",
    headerName: " ",
    width: 188,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "tot_jobcode",
    headerName: " ",
    width: 94,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "tot_l_2",
    headerName: " ",
    width: 55,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "tot_l_3",
    headerName: " ",
    width: 55,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "tot_l_4",
    headerName: " ",
    width: 55,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "tot_depth_4",
    headerName: " ",
    width: 120,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "tot_classific",
    headerName: " ",
    width: 100,
    editable: true,
    sortable: false,
    disableColumnMenu: true,
    type: "editable",
  },
  {
    field: "tot_location",
    headerName: " ",
    width: 100,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "tot_l_3title",
    headerName: " ",
    width: 100,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "tot_l_4title",
    headerName: " ",
    width: 120,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "total",
    headerName: "Total",
    width: 75,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "day01",
    headerName: "Mon",
    width: 75,
    type: "number",
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "day02",
    headerName: "Tue",
    width: 75,
    editable: false,
    type: "number",
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "day03",
    headerName: "Wed",
    width: 75,
    type: "number",
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "day04",
    headerName: "Thu",
    type: "number",
    width: 75,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "day05",
    headerName: "Fri",
    width: 75,
    type: "number",
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "day06",
    headerName: "Sat",
    width: 75,
    type: "number",
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "day07",
    headerName: "Sun",
    width: 75,
    editable: false,
    type: "number",
    sortable: false,
    disableColumnMenu: true,
  },
];
const totalRows = [
  {
    id: 1,
    title: "Total",
    total: "50.0",
    day01: "16.0",
    day02: "14.0",
    day03: "10.0",
    day04: "10.0",
    day05: "",
    day06: "",
    day07: "",
  },
  {
    id: 2,
    title: "Start Time(HH:MM)",
    total: " ",
    day01: "",
    day02: "",
    day03: "",
    day04: "",
    day05: "",
    day06: "",
    day07: "",
  },
  {
    id: 3,
    title: "End Time(HH:MM)",
    total: " ",
    day01: "",
    day02: "",
    day03: "",
    day04: "",
    day05: "",
    day06: "",
    day07: "",
  },
  {
    id: 4,
    title: "Meal Hrs(HH:MM)",
    total: " ",
    day01: "",
    day02: "",
    day03: "",
    day04: "",
    day05: "",
    day06: "",
    day07: "",
  },
  {
    id: 5,
    title: "Total Time",
    total: " ",
    day01: "",
    day02: "",
    day03: "",
    day04: "",
    day05: "",
    day06: "",
    day07: "",
  },
  {
    id: 6,
    title: "Overtime Ref. No",
    total: " ",
    day01: "",
    day02: "",
    day03: "",
    day04: "",
    day05: "",
    day06: "",
    day07: "",
  },
];
