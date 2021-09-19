export interface L1DTO {
  CODE01: string;
  TITLE: string;
  CODE07: string;
  CLIENT: string;
  PRJSTART: Date;
  PRJFINISH: Date;
  ORIGVALUE: number;
  BUDGMHRS: number;
  RECOVER: string;
  PROJMGR: string;
  TITLEA: string;
  PROJTYPE: string;
  STATUS: string;
  ThisPMDt: Date;
  LastPMDt: Date;
  lupdfcst: Date;
  INT_KEY: number;
  INT_CHANGE: number;
  BILLNOTES: string;
  AGRMNT_NO: string;
  Int_Edited: string;
}

export interface LocationDTO {
  CODE: string;
  TITLE: string;
  CalNum: number;
  caltitle: string;
  INT_KEY: number;
  INT_CHANGE: number;
  STM_CODE: string;
  ISDIEM: number;
  Int_Edited: string;
}

export interface BudgetDTO {
  fBudgeted: FBudgeted[];
  fCode03: FCode03[];
  fCode04: FCode04[];
  fCode06: FCode06[];
  fCode08: FCode08[];
}

export interface FBudgeted {
  Code01: string;
  Code03: string;
  Code03Title: string;
  Code04: string;
  Code04Title: string;
  Code06: string;
  Code06Title: string;
  Code08: string;
  Code08Title: string;
  Code07: string;
  Int_key: number;
  Int_Change: number;
}

export interface FCode03 {
  Code01: string;
  Code03: string;
  Title: string;
  Code07: string;
  Int_Key: number;
}

export interface FCode04 {
  Code01: string;
  Code03: string;
  Code04: string;
  Title: string;
  Code07: string;
  Int_Key: number;
}

export interface FCode06 {
  Code01: string;
  Code03: string;
  Code04: string;
  Code06: string;
  Title: string;
  Code07: string;
  Int_Key: number;
}

export interface FCode08 {
  Code01: string;
  Code03: string;
  Code04: string;
  Code06: string;
  Code08: string;
  Title: string;
  Code07: string;
  Int_Key: number;
}

export interface TimeSheetDTO {
  fTshSum: FTshSum[];
  fTsheets: any[];
  fTmpTs: FTmpT[];
  fTmpTsTot: FTmpTsTot[];
  fTmpTsMisc: FTmpTsMisc[];
}
export interface ApproveScreenEmployeeDTO {
  fTmpEmployeeForApproval: fTmpEmployeeForApproval[];
  fRjctReson: fRjctReson[];
}
export interface fTmpEmployeeForApproval {
  id: string;
  supvNo: string;
  projMgr: string;
  proxySup?: string;
  prxyPrjMgr?: string;
  proxyAct?: boolean;
  calc_OT?: number;
  pAF_No?: string;
  tsType?: string;
  employeeName?: string;
  status?: string;
  statusLvl?: number;
  prevStatusLvl?: number;
  submitted?: number;
  apprvLvl1?: number;
  apprvLvl2?: number;
  rejected?: number;
  prevAppLvl1?: number;
  prevAppLvl2?: number;
  prevReject?: number;
  isApprvLvl1?: number;
  isApprvLvl2?: number;
  isRejected?: number;
  reasonCode?: string;
  totalHrs?: number;
  empNotes?: string;
  supvNotes?: string;
  pMNotes?: string;
  proxyActSupv?: number;
  proxyActPrjMgr?: number;
  isCmntExts?: number;
  int_Tsh?: number;
  prevStatus?: string;
  lvl1ApprvName?: string;
  lvl2ApprvName?: string;
  selected: number;
  dispTotalHrs:string;
}
export interface fRjctReson {
  ReasonCode: string;
  Title: string;
  Int_key: number;
  Int_Change?: number;
  Int_Edited?: string;
}
export interface FTshSum {
  ID: string;
  STARTED: Date;
  ENDED: Date;
  CALTYPE?: any;
  STATUS?: any;
  TYPE?: any;
  EMPNOTES?: any;
  SUPNOTES?: any;
  PMNOTES?: any;
  BATCHNO?: any;
  LOCATION?: any;
  ARCHIVE?: any;
  ADJUSTED?: any;
  PayDate?: any;
  RjctReason?: any;
  RejectedBy?: any;
  Lvl1ApprBy?: any;
  Lvl2ApprBy?: any;
  INT_KEY?: any;
  INT_CHANGE?: any;
  Int_Edited?: any;
  StsTitle?: any;
  TsType?: any;
}

export interface FTmpT {
  Code01?: any;
  Code02?: any;
  Code03?: any;
  Code04?: any;
  Code05?: any;
  Code06?: any;
  Code07?: any;
  Code08?: any;
  Code09?: any;
  Code10?: any;
  Total?: any;
  EnteredBy?: any;
  DateEdited?: any;
  DateAdded?: any;
  Holiday?: any;
  Shift?: any;
  PCType?: any;
  OTF?: any;
  RowNo: number;
  ActDesc?: any;
  Location?: any;
  Classifctn?: any;
  Dept?: any;
  PostFreez?: any;
  L3_Title?: any;
  L4_Title?: any;
  Int_Change?: any;
  Hrs01?: any;
  Hrs02?: any;
  Hrs03?: any;
  Hrs04?: any;
  Hrs05?: any;
  Hrs06?: any;
  Hrs07?: any;
}

export interface FTmpTsTot {
  Code01: string;
  Code02?: any;
  Code03?: any;
  Code04?: any;
  Code05?: any;
  Code06?: any;
  Code07?: any;
  Code08?: any;
  Code09?: any;
  Code10?: any;
  Total?: any;
  EnteredBy?: any;
  DateEdited?: any;
  DateAdded?: any;
  Holiday?: any;
  Shift?: any;
  PCType?: any;
  OTF?: any;
  RowNo: number;
  ActDesc?: any;
  Location?: any;
  Classifctn?: any;
  Dept?: any;
  PostFreez?: any;
  L3_Title?: any;
  L4_Title?: any;
  Int_Change?: any;
  Hrs01?: any;
  Hrs02?: any;
  Hrs03?: any;
  Hrs04?: any;
  Hrs05?: any;
  Hrs06?: any;
  Hrs07?: any;
}

export interface FTmpTsMisc {
  Location: string;
  Holiday01: number;
  Holiday02: number;
  Holiday03: number;
  Holiday04: number;
  Holiday05: number;
  Holiday06: number;
  Holiday07: number;
  MthToDateHrs: string;
}

export interface JobCode01 {
  Code01: string;
  Code02: string;
  Title: string;
  Int_key: number;
  Int_Change: number;
}

export interface JobCode02 {
  Code01: string;
  Code02: string;
  Title: string;
  Code07: string;
  Int_Key: number;
}

export interface JobCodeDTO {
  fJobCodes: JobCode01[];
  fCode02: JobCode02[];
}

export interface DashboardStats {
  fTmpTSEntrySts: fTmpTSEntrySts[];
  fTmpTSApprovalSts: fTmpTSApprovalSts[];
}

export interface fTmpTSEntrySts {
  DshStatTyp: number;
  TsStatus: number;
  StsTitle: string;
  OrderNo: number;
  CountedRows: number;
}

export interface fTmpTSApprovalSts {
  DshStatTyp: number;
  TsStatus: number;
  StsTitle: string;
  OrderNo: number;
  CountedRows: number;
}

export interface UserLocalStorage {
  userId: string;
  sessionKey: string
}
