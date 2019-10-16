import React from "react";
import Avatar from "src/components/Avatar";
import Chip from "../";
import Typography from "src/components/Typography";
import { TChipProps } from "../";
import { View } from "react-native";

interface IAvatarChipProps extends TChipProps {
  name: string;
  avatarUrl: string | null | undefined;
}

export default function AvatarChip(props: IAvatarChipProps) {
  const { name, avatarUrl, ...rest } = props;

  return (
    <Chip
      style={{
        paddingTop: "4px",
        paddingBottom: "4px",
        marginRight: "4px",
        marginBottom: "1rem"
      }}
      dark
      {...rest}
    >
      <View style={{ display: "flex", alignItems: "center" }}>
        <Avatar size={20} src={avatarUrl} className="mr-05" />
        <Typography.Small>{name}</Typography.Small>
      </View>
    </Chip>
  );
}
