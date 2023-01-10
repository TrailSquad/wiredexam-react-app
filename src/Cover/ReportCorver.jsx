import React, { Component } from "react";
import logo from "../wcl.png";

export default class ReportCover extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div class="p-4 h-full flex flex-col items-center">
                <div class=" flex flex-col items-center">
                    <img class="w-5 h-5 items-center" src={logo} alt='wcl logo' />
                    <text class='text-black'>{"sdkName"}</text>
                </div>
                <text class="grow text-center">{"title"}</text>
                <img class="w-8 h-8" src={logo} alt='wcl logo' />
                <text class='p-2' >{"wclName"}</text>
            </div>
        );
    }
}