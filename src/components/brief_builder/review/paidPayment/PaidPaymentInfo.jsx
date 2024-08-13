import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

const PaidPaymentInfo = ({ filteredPaidData }) => {
  if (!filteredPaidData) {
    return null; // Return null if campaignDetails, campaignMessage, or hooks are not provided
  }

  const amountInfo = filteredPaidData?.[0]?.offerPrice;

  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 5px 30px 0px rgba(0, 0, 0, 0.1)",
          padding: "1.8rem",
          borderRadius: "1.8rem",
          gap: "1.8rem",
          width: "100%",
        }}
      >
        <Box
          as="div"
          sx={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
        >
          <Typography variant="h2">Payment</Typography>
          <Box>
            <Typography variant="body">
              Participating creators will receive a{" "}
              <Typography variant="body" component="span" fontWeight="bold">
                ${amountInfo} Payment
              </Typography>
              &nbsp; after completing the collab
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PaidPaymentInfo;
