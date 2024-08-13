"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import Image from "next/image";
import ApproveCreators from "./Tabs/ApproveCreators";
import Ship from "./Tabs/Ship";
import Issue from "./Tabs/Issue";
import AwaitingContent from "./Tabs/AwaitingContent";
import ContentSubmitted from "./Tabs/ContentSubmitted";
import Complete from "./Tabs/Complete";
import GetHelp from "./Tabs/GetHelp";
import { useDispatch, useSelector } from "react-redux";
import {
  getCampaignbyId,
  getCampaignbyStatistics,
  resetCampaignData,
} from "../../../../store/brief_builder/campaign/campaign.slice";
import { useParams, usePathname } from "next/navigation";
import dayjs from "dayjs";

const Campaign = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [campaignStatistics, setCampaignStatistics] = useState(null);

  const campaignData = useSelector(
    (state) => state.Campaign.getCampaignbyId.campaignData
  );

  const statistics = useSelector(
    (state) => state.Campaign.getCampaignbyStatistics.menuData
  );

  useEffect(() => {
    const res = dispatch(getCampaignbyId({ campaignId: params.campaignId }));

    return () => {
      dispatch(resetCampaignData());
    };
  }, [params.campaignId]);

  const [activeTab, setActiveTab] = useState(6);

  const handleTab = (index) => {
    setActiveTab(index);
  };

  const fetchCampaignStatistics = async () => {
    try {
      const res = await dispatch(
        getCampaignbyStatistics({ campaignId: params.campaignId })
      );
      console.log("i am fetch response :-", res.payload?.success);
      if (res.payload?.success) {
        // Use a callback function to ensure we are getting the latest state
        dispatch((_, getState) => {
          const updatedStatistics =
            getState().Campaign.getCampaignbyStatistics.menuData;
          setCampaignStatistics(updatedStatistics?.data);
        });
        setActiveTab(6);
      }
    } catch (error) {
      console.error("Error fetching campaign statistics:", error);
    }
  };

  const tabComponents = [
    {
      Component: ApproveCreators,
      fetchCampaignStatistics: fetchCampaignStatistics,
    },
    { Component: Ship, fetchCampaignStatistics: fetchCampaignStatistics },
    { Component: Issue, fetchCampaignStatistics: fetchCampaignStatistics },
    {
      Component: AwaitingContent,
      fetchCampaignStatistics: fetchCampaignStatistics,
    },
    {
      Component: ContentSubmitted,
      fetchCampaignStatistics: fetchCampaignStatistics,
    },
    { Component: Complete, fetchCampaignStatistics: fetchCampaignStatistics },
    { Component: GetHelp, fetchCampaignStatistics: fetchCampaignStatistics },
  ];

  const SelectedComponent = tabComponents[activeTab].Component;

  //new implemet hide tab

  useEffect(() => {
    fetchCampaignStatistics();
  }, [dispatch, params.campaignId]);

  //console.log("campaignStatistics before :-", campaignStatistics);
  //

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "background.paper",
          boxShadow: "0px 0px 30px 0px #0000000D",
          borderRadius: "30px",
          height: "100%",
          p: "30px",
        }}
      >
        <Box>
          <Typography variant="h3">
            {campaignData?.campaignDetails?.campaignName}
          </Typography>
          <Typography variant="h6">
            Lives dates:{" "}
            {dayjs(
              campaignData?.campaignDetails?.contentPostingDate?.minDate
            ).format("MMMM DD[th] YYYY")}{" "}
            -{" "}
            {dayjs(
              campaignData?.campaignDetails?.contentPostingDate?.maxDate
            ).format("MMMM DD[th] YYYY")}
          </Typography>
          {/* <Typography variant="subtitle1" mt="20px" color="#777777" >
            {campaignData?.campaignDetails?.campaignMessage}
          </Typography> */}
          <div
            style={{ marginTop: "10px", color: "#777777" }}
            dangerouslySetInnerHTML={{
              __html: campaignData?.campaignDetails?.campaignMessage,
            }}
          ></div>
        </Box>

        <Box
          sx={{
            bgcolor: "primary.light",
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: "20px",
            borderRadius: "10px",
            mt: "30px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
            }}
          >
            {campaignStatistics &&
              campaignStatistics.find(
                (stat) => stat._id === "Request_Approved"
              ) && (
                <Box
                  as="div"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: activeTab === 0 ? "#FFCC33" : "",
                    borderRadius: "50px",
                    padding: "12px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleTab(0)}
                >
                  <Typography
                    variant="label"
                    sx={{
                      fontSize: " 0.875rem",
                      color: "#212121",
                      fontWeight: "600",
                    }}
                  >
                    Approve Creators
                  </Typography>
                </Box>
              )}

            {campaignStatistics &&
              campaignStatistics.find(
                (stat) => stat._id === "Awaiting_Shipment"
              ) && (
                <Box
                  as="div"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: activeTab === 1 ? "#FFCC33" : "",
                    borderRadius: "50px",
                    padding: "12px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleTab(1)}
                >
                  <Typography
                    variant="label"
                    sx={{
                      fontSize: " 0.875rem",
                      color: "#212121",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    Ship
                  </Typography>
                </Box>
              )}

            {campaignStatistics &&
              campaignStatistics.find((stat) => stat._id === "Issue") && (
                <Box
                  as="div"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: activeTab === 2 ? "#FFCC33" : "",
                    borderRadius: "50px",
                    padding: "12px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleTab(2)}
                >
                  <Typography
                    variant="label"
                    sx={{
                      fontSize: " 0.875rem",
                      color: "#212121",
                      fontWeight: "600",
                    }}
                  >
                    Issue
                  </Typography>
                </Box>
              )}

            {campaignStatistics &&
              campaignStatistics.find(
                (stat) => stat._id === "Awaiting_Content"
              ) && (
                <Box
                  as="div"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: activeTab === 3 ? "#FFCC33" : "",
                    borderRadius: "50px",
                    padding: "12px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleTab(3)}
                >
                  <Typography
                    variant="label"
                    sx={{
                      fontSize: " 0.875rem",
                      color: "#212121",
                      fontWeight: "600",
                    }}
                  >
                    Awaiting Content
                  </Typography>
                </Box>
              )}

            {campaignStatistics &&
              campaignStatistics.find(
                (stat) =>
                  stat._id === "Awaiting_Content_Approval" ||
                  stat._id === "Content_Approved" ||
                  stat._id === "Content_Rejected"
              ) && (
                <Box
                  as="div"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: activeTab === 4 ? "#FFCC33" : "",
                    borderRadius: "50px",
                    padding: "12px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleTab(4)}
                >
                  <Typography
                    variant="label"
                    sx={{
                      fontSize: " 0.875rem",
                      color: "#212121",
                      fontWeight: "600",
                    }}
                  >
                    Content Submitted
                  </Typography>
                </Box>
              )}

            {campaignStatistics &&
              campaignStatistics.find((stat) => stat._id === "Completed") && (
                <Box
                  as="div"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: activeTab === 5 ? "#FFCC33" : "",
                    borderRadius: "50px",
                    padding: "12px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleTab(5)}
                >
                  <Typography
                    variant="label"
                    sx={{
                      fontSize: " 0.875rem",
                      color: "#212121",
                      fontWeight: "600",
                    }}
                  >
                    Complete
                  </Typography>
                </Box>
              )}
          </Box>

          <Box
            as="div"
            sx={{
              width: "99px",
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: activeTab === 6 ? "#FFCC33" : "",
              borderRadius: "50px",
              cursor: "pointer",
            }}
            onClick={() => handleTab(6)}
          >
            <Typography
              variant="label"
              sx={{
                fontSize: " 0.875rem",
                color: "#212121",
                fontWeight: "600",
              }}
            >
              GetHelp
            </Typography>
          </Box>
        </Box>

        <Stack direction={"row"} gap={"20px"} sx={{ mt: "20px" }}>
          <Box
            sx={{
              height: "150px",
              maxWidth: "611px",
              background:
                "url(/images/brief_recap_bg.png) no-repeat center center / cover",
              p: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              borderRadius: "10px",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <Typography variant="h3">Brief Recap</Typography>
            <Typography
              variant="subtitle1"
              textAlign="center"
              mt={"10px"}
              color={"common.black"}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt
            </Typography>
            <Box sx={{ position: "absolute", right: 15, top: 15 }}>
              <Image
                src="/images/launch.png"
                alt="arrow right"
                width={24}
                height={24}
              />
            </Box>
          </Box>
          <Box
            sx={{
              height: "150px",
              maxWidth: "611px",
              background:
                "url(/images/todos_bg.png) no-repeat center center / cover",
              p: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              borderRadius: "10px",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <Typography variant="h3">To Dos</Typography>
            <Typography
              variant="subtitle1"
              textAlign="center"
              mt={"10px"}
              color={"common.black"}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt
            </Typography>
            <Box sx={{ position: "absolute", right: 15, top: 15 }}>
              <Image
                src="/images/launch.png"
                alt="arrow right"
                width={24}
                height={24}
              />
            </Box>
          </Box>
        </Stack>

        <Box
          as="div"
          sx={{
            marginTop: "2rem",
          }}
        >
          {SelectedComponent && (
            <SelectedComponent
              fetchCampaignStatistics={fetchCampaignStatistics}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Campaign;
