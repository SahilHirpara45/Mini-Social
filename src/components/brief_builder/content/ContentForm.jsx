"use client";
import QuillMinimal from "@/components/common/editer/Editor";
import FileUploaderMultiple from "@/components/common/fileuploader/FileUploaderMultiple";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useRef } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { CgArrowLongLeft, CgArrowLongRight } from "react-icons/cg";
import { HiPlus } from "react-icons/hi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import CustomTextField from "../../common/text-field";
import { useContentForm } from "../hook";

const ContentForm = ({ handleTab }) => {
  const { initialValues, loading, schema, submit } = useContentForm({
    handleTab,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const hasAppended = useRef(false);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "externalLinks",
  });

  const handleAddExternalLink = () => {
    append({});
  };

  const handleRemoveExternalLink = (ExternalLinkIndex) => {
    remove(ExternalLinkIndex);
  };
  useEffect(() => {
    if (!hasAppended.current && fields.length === 0) {
      append({});
      hasAppended.current = true;
    }
  }, [fields, append]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.8rem",
        }}
      >
        <Controller
          name="campaignName"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <CustomTextField
              fullWidth
              value={value}
              sx={{ width: "30rem" }}
              label="Campaign Name"
              onChange={onChange}
              placeholder="Campaign Name"
              error={Boolean(errors.campaignName)}
              {...(errors.campaignName && {
                helperText: errors.campaignName.message,
              })}
            />
          )}
        />
        <Box
          as="div"
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Controller
            name="images"
            control={control}
            render={({ field: { value, onChange } }) => (
              <FileUploaderMultiple
                name={"images"}
                value={value}
                onChange={onChange}
                errors={errors}
                maxFileNum={5}
              />
            )}
          />
        </Box>

        {fields.map((item, index) => (
          <Box
            key={item.id}
            as="div"
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "end",
              gap: "1.2rem",
            }}
          >
            <Controller
              name={`externalLinks[${index}]`}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  fullWidth
                  value={typeof field.value === "string" ? field.value : ""}
                  sx={{ width: "30rem" }}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="External Links"
                  label={index === 0 ? "External Link" : undefined}
                />
              )}
            />
            {index === fields.length - 1 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "2.5rem",
                  width: "2.5rem",
                  background: "#FFCC33",
                  borderRadius: "10px",
                  gap: "0.5rem",
                  cursor: "pointer",
                }}
                onClick={handleAddExternalLink}
              >
                <HiPlus />
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "2.5rem",
                  width: "2.5rem",
                  background: "#F00E0E",
                  borderRadius: "10px",
                  gap: "0.5rem",
                  cursor: "pointer",
                  color: "white",
                }}
                onClick={() => handleRemoveExternalLink(index)}
              >
                <RiDeleteBin6Fill />
              </Box>
            )}
            <span>
              {errors.externalLinks &&
                typeof errors.externalLinks[index]?.message === "string" && (
                  <Typography
                    variant="body2"
                    sx={{ color: "error.main", marginLeft: "8px" }}
                  >
                    Not Valid
                  </Typography>
                )}
            </span>
          </Box>
        ))}

        <Box
          sx={{
            // width: "auto",
            display: "flex",
            gap: "1.8rem",
            flexWrap: ["wrap", "nowrap"],
          }}
        >
          <Box
            as="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              gap: "0.5rem",
              height: "100%",
              width: "100%",
            }}
          >
            <Typography
              variant="label"
              sx={{
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              Messaging
            </Typography>
            <Controller
              name="messaging"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <QuillMinimal
                  value={value}
                  onChange={onChange}
                  label="Messaging"
                />
              )}
            />
            {errors.messaging && (
              <Typography variant="caption" color="error">
                {errors.messaging.message}
              </Typography>
            )}
          </Box>
          <Box
            as="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              gap: "0.5rem",
              height: "100%",
              width: "100%",
            }}
          >
            <Typography
              variant="label"
              sx={{
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              Hooks
            </Typography>
            <Controller
              name="hooks"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <>
                  <QuillMinimal
                    value={value}
                    onChange={onChange}
                    label="Hooks"
                  />
                </>
              )}
            />
            {errors.hooks && (
              <Typography variant="caption" color="error">
                {errors.hooks.message}
              </Typography>
            )}
          </Box>
          <Box
            as="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              gap: "0.5rem",
              height: "100%",
              width: "100%",
            }}
          >
            <Typography
              variant="label"
              sx={{
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              Do
            </Typography>
            <Controller
              name="doDes"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <>
                  <QuillMinimal value={value} onChange={onChange} label="Do" />
                </>
              )}
            />
            {errors.doDes && (
              <Typography variant="caption" color="error">
                {errors.doDes.message}
              </Typography>
            )}
          </Box>
        </Box>
        <Box sx={{ width: "100%", display: "flex", gap: "1.8rem", mt: "2rem" }}>
          <Box
            as="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              gap: "0.5rem",
              height: "100%",
              width: "100%",
            }}
          >
            <Typography
              variant="label"
              sx={{
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              Do Not
            </Typography>
            <Controller
              name="doNotDes"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <>
                  <QuillMinimal
                    value={value}
                    onChange={onChange}
                    label="doNotDes"
                  />
                </>
              )}
            />
            {errors.doNotDes && (
              <Typography variant="caption" color="error">
                {errors.doNotDes.message}
              </Typography>
            )}
          </Box>
          <Box
            as="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              gap: "0.5rem",
              height: "100%",
              width: "100%",
            }}
          >
            <Typography
              variant="label"
              sx={{
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              Concept
            </Typography>
            <Controller
              name="campaignConcept"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <QuillMinimal
                  value={value}
                  onChange={onChange}
                  label="campaignConcept"
                />
              )}
            />
            {errors.campaignConcept && (
              <Typography variant="caption" color="error">
                {errors.campaignConcept.message}
              </Typography>
            )}
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "end", gap: "0.5rem" }}>
          <Button
            variant="outlined"
            startIcon={<CgArrowLongLeft />}
            sx={{
              height: "50px",
              width: "147px",
              color: "#212121",
              borderRadius: "50px",
              fontWeight: 600,
              textTransform: "none",
              borderColor: "black",
            }}
            onClick={() => {
              handleTab(3);
            }}
          >
            Previous
          </Button>
          <Button
            type="submit"
            sx={{
              background: "#FFCC33",
              color: "#212121",
              height: "50px",
              width: "117px",
              borderRadius: "50px",
              fontWeight: 600,
              textTransform: "none",

              "&:hover": {
                background: "#FFCC33",
              },
            }}
            variant="contained"
            endIcon={<CgArrowLongRight />}
            disabled={loading}
          >
            {loading ? "Loading..." : "Next"}
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default ContentForm;
