import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CampaignCard from "../Cards/CampaignCard";
import ViewCampaignBriefModal from "../modal/ViewCampaignBriefModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import {
  getUploadedContent,
  likeDislikeContent,
} from "../../../../../store/campaign_request/campaignRequest.slice";

const Complete = ({ fetchCampaignStatistics }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const dispatch = useDispatch();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const completeData = useSelector(
    (state) => state.CampaignRequest.campaignRequest.campaignRequestData
  );
  console.log(completeData, "completeData");

  useEffect(() => {
    dispatch(
      getUploadedContent({
        campaignId: params.campaignId,
        requestStatus: ["POSTED"],
        page: page + 1,
        pageSize: rowsPerPage,
      })
    );
  }, [page, rowsPerPage]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onRowClickHandler = (item) => {
    setModalData(item);
    handleOpen();
  };

  const likeDislikeChangeHandler = (itemId, e) => {
    e.stopPropagation();
    dispatch(
      likeDislikeContent({
        contentId: itemId,
      })
    ).then(() => {
      dispatch(
        getUploadedContent({
          campaignId: params.campaignId,
          requestStatus: ["POSTED"],
          page: page + 1,
          pageSize: rowsPerPage,
        })
      );
      fetchCampaignStatistics();
    });
  };

  return (
    <Box>
      {/* {completeData?.data?.length > 0 && ( */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: "20px" }}>
        <Stack direction={"row"} spacing={"30px"} sx={{ alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="subtitle1">View</Typography>
            <FormControl
              sx={{
                m: 1,
                minWidth: 160,
                "& .MuiInputBase-input": {
                  p: "12px 10px",
                },
              }}
            >
              <Select
                //   value={age}
                //   onChange={handleChange}
                defaultValue={"card"}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{
                  "& .MuiSelect-icon": { color: "#212121", opacity: 0.6 },
                }}
                disabled={completeData?.data?.length === 0}
              >
                <MenuItem value={"card"}>Card</MenuItem>
                <MenuItem value={"table"}>Table</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="subtitle1">Sort by</Typography>
            <FormControl
              sx={{
                m: 1,
                minWidth: 160,
                "& .MuiInputBase-input": {
                  p: "12px 10px",
                },
              }}
            >
              <Select
                //   value={age}
                //   onChange={handleChange}
                defaultValue={"new"}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{
                  "& .MuiSelect-icon": { color: "#212121", opacity: 0.6 },
                }}
                disabled={completeData?.data?.length === 0}
              >
                <MenuItem value={"new"}>New</MenuItem>
                <MenuItem value={"old"}>Old</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button
            variant="outlined"
            type="button"
            size="large"
            disabled={completeData?.data?.length === 0}
            sx={{
              border: "1px solid #212121",
              color: "#212121",
              // height: "50px",
              // width: "168px",
              borderRadius: "50px",
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Download All
          </Button>
          <Button
            variant="contained"
            type="button"
            size="large"
            disabled={completeData?.data?.length === 0}
            sx={{
              "&:hover": { background: "#FFCC33" },
              background: "#FFCC33",
              color: "#212121",
              // height: "50px",
              // width: "162px",
              borderRadius: "50px",
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "none",
            }}
          >
            View All
          </Button>
        </Stack>
      </Box>
      {/* )} */}

      {completeData?.data?.length > 0 ? (
        <Grid container spacing={"30px"}>
          {completeData.data.map((item) => (
            <Grid item xs={3}>
              <CampaignCard
                item={item}
                status={"Completed"}
                onCardClickHandler={onRowClickHandler}
                likeDislikeChangeHandler={likeDislikeChangeHandler}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h4" sx={{ textAlign: "center", mt: "30px" }}>
          No data found
        </Typography>
      )}

      {completeData?.data?.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            type="button"
            onClick={() => setRowsPerPage(rowsPerPage + 4)}
            // disabled={completeData?.data?.length < rowsPerPage + 4}
            sx={{
              background: "#FFCC33",
              color: "#212121",
              height: "50px",
              width: "123px",
              borderRadius: "50px",
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "none",
              mt: "30px",
            }}
          >
            Load More
          </Button>
        </Box>
      )}

      <ViewCampaignBriefModal
        open={open}
        handleClose={handleClose}
        completeModel={modalData}
        page={page}
        rowsPerPage={rowsPerPage}
        campaignId={params.campaignId}
      />
    </Box>
  );
};

export default Complete;
