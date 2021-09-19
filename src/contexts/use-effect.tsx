import React, { useState, useEffect, useContext, createContext } from "react";
import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError
} from "axios";
import { getDataList, getString, sendData } from "../utils/api/api";
import { useAuth } from "./use-auth";

const api_url = "http://localhost/QTIMEWEB2/api";


const useFetch = () => {
  const { token, signout } = useAuth();

  const getAxios = (): AxiosInstance => {
    const instance = axios.create({
      baseURL: api_url,
      timeout: 31000
    });

    instance.interceptors.request.use((config: AxiosRequestConfig) => {
      if (token) {
        return config;
      } else {
        signout(() => {});
        return Promise.reject("Invalid Token");
      }
    });
    return instance;
  };

  const getEmployeeList = async (properties: string) => {
    return await getDataList(
      getAxios(),
      `/employees/${token}/${properties}/list`
    );
  };

  const getEndingWeek = async () => {
    return await getDataList(getAxios(), `/Calendars/${token}`);
  };

  const getProjectCode = async (employeeId: string) => {
    return await getDataList(
      getAxios(),
      `/Codes/${token}/${employeeId}/Project`
    );
    // return new Promise((resolve, reject) => {resolve(l1Data)});
  };

  const getJobCode = async (employeeId: string, projectCode: string) => {
    return await getDataList(
      getAxios(),
      `/Codes/${token}/${projectCode}/${employeeId}`
    );
    // return new Promise((resolve, reject) => { resolve(jobCodes)});
  };

  const getProjectData = async (
    employeeId: string,
    projectCode: string,
    jobCode: string
  ) => {
    return await getDataList(
      getAxios(),
      `/Codes/${token}/${projectCode}/${jobCode}/${employeeId}`
    );
    // return new Promise((resolve, reject) => { resolve(budgetData)});
  };

  const getLocation = async (employeeId: string) => {
    return await getDataList(
      getAxios(),
      `/Codes/${token}/${employeeId}/location`
    );
    // return new Promise((resolve, reject) => {resolve(locationData)});
  };

  const getTimeSheetData = async (employeeId: string, period: string) => {
    return await getDataList(
      getAxios(),
      `/Timesheets/${token}/${employeeId}/${period}`
    );
  };

  const copyTimeSheet = async (
    employeId: string,
    targetPayDate: string,
    sourcePayDate: string
  ) => {
    return await getDataList(
      getAxios(),
      `/Timesheets/${token}/${employeId}/${targetPayDate}/${sourcePayDate} `
    );
  };

  const qTimeSaveFn = async (nTsType: string, params: any) => {
    return await sendData(getAxios(), `/Timesheets/${token}`, params);
  };

  const qApproveSaveFn = async (
    payDate: string,
    nTsType: string,
    params: any
  ) => {
    return await sendData(
      getAxios(),
      `/Timesheets/${token}/${payDate}/${nTsType}`,
      params
    );
  };

  const getApprovalEmployeeList = async (
    payDate: string,
    Tstype: string,
    filter: number
  ) => {
    return await getDataList(
      getAxios(),
      `/Timesheets/${token}/${payDate}/${Tstype}/${filter}/Approval`
    );
  };

  const getDashboardStats = async () => {
    return await getDataList(getAxios(), `/Timesheets/${token}/Statistics`);
  };

  const getLoggedInUserDetails = async (userid: string) => {
    return await getDataList(getAxios(), `/Employees/${token}/${userid}`);
  };

  const changePassword = async (
    newPassword: string,
    confirmationPassword: string,
    oldPassword: string,
    loggedinUserKey: string
  ) => {
    return await getString(
      getAxios(),
      `/Employees/${token}/${loggedinUserKey}/${newPassword}/${confirmationPassword}/${oldPassword}`
    );
  };

  const logOut = async () => {
    return await getString(
      getAxios(),
      `/Sessions/${token}`
    );
  };

  return {
    getEmployeeList,
    getEndingWeek,
    getProjectCode,
    getJobCode,
    getProjectData,
    getLocation,
    getTimeSheetData,
    copyTimeSheet,
    qTimeSaveFn,
    qApproveSaveFn,
    getApprovalEmployeeList,
    getDashboardStats,
    getLoggedInUserDetails,
    changePassword,
    logOut
  };
};

export default useFetch;
