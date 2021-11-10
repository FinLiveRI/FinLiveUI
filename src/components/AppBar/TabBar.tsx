import { FC } from "react";
import { Tabs } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { useIntl } from "react-intl";
import { ReactComponent as CowIcon } from "../../assets/icons/cow.svg";
import { ReactComponent as GroupIcon } from "../../assets/icons/group.svg";
import NavTab from "./NavTab";

const routeMap: Array<string> = ["/animal", "/group", "/upload"];

const TabBar: FC = () => {
  const intl = useIntl();
  const location = useLocation();

  return (
    <Tabs
      value={
        routeMap.includes(location.pathname)
          ? routeMap.indexOf(location.pathname)
          : 0
      }
    >
      <NavTab
        label={intl.formatMessage({
          description: "Navigation Tab label for Animal page",
          defaultMessage: "Animal",
        })}
        url="/animal"
        svgIcon={<CowIcon />}
      />
      <NavTab
        label={intl.formatMessage({
          description: "Navigation Tab label for Animal Group page",
          defaultMessage: "Group",
        })}
        url="/group"
        svgIcon={<GroupIcon />}
      />
      <NavTab
        label={intl.formatMessage({
          description: "Navigation Tab label for Data Upload page",
          defaultMessage: "Data Upload",
        })}
        url="/upload"
        svgIcon={<CloudUpload />}
      />
    </Tabs>
  );
};

export default TabBar;
