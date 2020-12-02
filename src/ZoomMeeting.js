import React, { useEffect } from 'react'
import { ZoomMtg } from "@zoomus/websdk";
import { get, omit } from 'lodash';
import { parse } from "query-string";

import './ZoomMeeting.css'

const ZoomMeeting = (props) => {

    const meetingConfig = {
        apiKey: process.env.REACT_APP_ZOOM_API_KEY,
        apiSecret: process.env.REACT_APP_ZOOM_API_SECRET,
        userName: 'client',
        role: 0,//for attendee
        userEmail: "",
    };

    const joinMeeting = (meetingConfigJoin) => {
        console.log(meetingConfigJoin);
        ZoomMtg.init({
            leaveUrl: "https://zoom.us/",
            isSupportAV: true,
            success: () => {
                console.log('intials');
                ZoomMtg.join({
                    ...meetingConfigJoin,
                    success: (res) => {
                        console.log("join meeting success");
                        console.log("get attendeelist");
                        ZoomMtg.getAttendeeslist({});
                        ZoomMtg.getCurrentUser({
                            success: (res) => {
                                console.log("success getCurrentUser", res.result.currentUser);
                            },
                        });
                    },
                    error: (err) => {
                        console.log('errorJoin', err);
                    },
                });
            },
            error: (err) => {
                console.log('errorInit', err);
            },
        });
    }

    useEffect(() => {
        const zoomRoot = document.getElementById("zmmtg-root");
        zoomRoot.classList.add("show-zoom");

        const searchQeury = get(props, ["location", "search"], false);
        if (searchQeury) {
            const { meetingNumber, passWord } = parse(searchQeury)
            meetingConfig.meetingNumber = meetingNumber
            meetingConfig.passWord = passWord
        }

        ZoomMtg.setZoomJSLib("https://source.zoom.us/1.8.1/lib", "/av");
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareJssdk();
        console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));
        ZoomMtg.generateSignature({
            ...meetingConfig,
            success: (res) => {
                meetingConfig.signature = res.result;
                setTimeout(() => {
                    joinMeeting(omit(meetingConfig, ['apiSecret', 'userEmail', 'role']));
                }, 1000);
            },
        });

        return () => {
            zoomRoot.classList.remove("show-zoom");
        }
    })

    return (
        <>
        </>
    )
}

export default ZoomMeeting

