import { FC } from "react";
import { Box, LinearProgress, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

export type ProgressBarProps = {
  value: number;
  variant?: "determinate" | "indeterminate";
  color?: "primary" | "secondary";
};

export const ProgressBar: FC<ProgressBarProps> = ({
  value,
  color,
  variant,
}: ProgressBarProps) => {
  const BorderLinearProgress = withStyles({
    root: {
      height: 20,
      width: "100%",
      borderRadius: "10px",
    },
    bar: {
      borderRadius: 20,
    },
  })(LinearProgress);

  const WhiteTextTypography = withStyles({
    root: {
      color: "#FFFFFF",
    },
  })(Typography);

  return (
    <Box position="relative" display="inline-flex" style={{ width: "100%" }}>
      <BorderLinearProgress
        color={color || "primary"}
        variant={variant || "determinate"}
        value={value}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {variant === "determinate" && (
          <WhiteTextTypography variant="body2">{`${value}%`}</WhiteTextTypography>
        )}
      </Box>
    </Box>
  );
};
