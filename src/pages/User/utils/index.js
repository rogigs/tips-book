import { COLORS } from "../../../assets/styles/colors";

export const STATUS_PROFILE = {
  VISITOR_FOLLOWER: "VISITOR_FOLLOWER",
  VISITOR_NOT_FOLLOWER: "VISITOR_NOT_FOLLOWER",
  OWNER: "OWNER",
};

export const buttonProperties = ({ visitor, follower, onPress }) => {
  const properties = {
    [STATUS_PROFILE.OWNER]: {
      name: "Editar",
      screenToGo: "Edit",
      icon: "tools",
      color: COLORS.SECONDARY,
      textColor: COLORS.LIGHT,
      onPress: () => {},
    },
    [STATUS_PROFILE.VISITOR_FOLLOWER]: {
      name: "Deixar de seguir",
      screenToGo: "",
      icon: "account-minus",
      color: COLORS.LIGHT,
      textColor: COLORS.SECONDARY,
      onPress,
    },
    [STATUS_PROFILE.VISITOR_NOT_FOLLOWER]: {
      name: "Seguir",
      screenToGo: "",
      icon: "account-plus",
      color: COLORS.SECONDARY,
      textColor: COLORS.LIGHT,
      onPress,
    },
  };

  if (!visitor) {
    return properties[STATUS_PROFILE.OWNER];
  }

  return follower
    ? properties[STATUS_PROFILE.VISITOR_FOLLOWER]
    : properties[STATUS_PROFILE.VISITOR_NOT_FOLLOWER];
};
