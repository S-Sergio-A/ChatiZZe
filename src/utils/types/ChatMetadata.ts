import { UserRightsEnum } from "./UserRightsType";

export type ChatMetadata = {
  name: string;
  membersCount: number;
  activeMembersCount: number;
  sentFilesCount: number;
  userRights: (
    | UserRightsEnum.SEND_MESSAGES
    | UserRightsEnum.SEND_FILES
    | UserRightsEnum.ADD_NEW_MEMBERS
    | UserRightsEnum.DELETE_MEMBERS
    | UserRightsEnum.CHANGE_RIGHTS_OF_OTHERS
  )[];
  logo: string;
  notificationsOn: boolean;
};
