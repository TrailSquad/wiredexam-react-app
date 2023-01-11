import React, { Component } from "react";
import logo from "../wcl.png";

function ReportCover(props) {
    const {reportName, appName, deviceSys, fromPlace, publishDate} = props;
    return (
        <div class="p-4 h-screen flex flex-col items-center">
            {/* Logo */}
            <img class="w-20 h-20 mt-24 mb-11" src={logo} alt='wcl logo' />
            {/* name */}
            <text class="ml-10 mr-10 mb-11 text-center font-semibold text-3xl">{reportName}</text>
            {/* info */}
            <div class="flex flex-row items-center">
                <div class="ml-6 mr-4 flex flex-col items-end text-right font-medium text-lg">
                    <text class="mb-4">{"产品名:"}</text>
                    <text class="mb-4">{"产品型号:"}</text>
                    <text class="mb-4">{"报告出处:"}</text>
                    <text class="mb-4">{"报告日期:"}</text>
                </div>
                <div class="mr-6 flex flex-col items-start text-left font-medium text-lg">
                    <text class="mb-4">{appName}</text>
                    <text class="mb-4">{deviceSys}</text>
                    <text class="mb-4">{fromPlace}</text>
                    <text class="mb-4">{publishDate}</text>
                </div>
            </div>
        </div>
    );
  }
  
  export default ReportCover;