import React, { Component } from "react";
import logo from "../wcl.png";

const reportHeaderState = {
    title: "APP 性能监控",
    wclName: "Wiredcraft",
    sdkName: "WiredAPM"
}

export default class ReportHeader extends Component {
    constructor() {
      super();
      this.state = reportHeaderState;
    }
    render() {
        console.log(logo);
      const { title, wclName, sdkName } = this.state;
      return (
      <div class="p-4 h-14 flex flex-row items-center">
        <div class=" flex flex-col items-center">   
            <img class="w-5 h-5 items-center" src={logo} />
            <text class='text-black'>{sdkName}</text>
        </div>
        <text class="grow text-center">{title}</text>
        <img class="w-8 h-8" src={logo} />
        <text class='p-2' >{wclName}</text>
      </div>
      );
    }
}