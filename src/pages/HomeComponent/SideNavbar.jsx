import {
  Button,
  Card,
  LinearProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useCallback, useEffect, useState, useTransition } from "react";
import { MdPayments } from "react-icons/md";
import { TbLayoutGridAdd, TbReport } from "react-icons/tb";
import { RxActivityLog } from "react-icons/rx";
import { BiSolidDashboard } from "react-icons/bi";
import { SideNavbarStyles } from "../../styles/SideNavbarStyles";
import { useTheme } from "@emotion/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { RiUserAddFill } from "react-icons/ri";
import HasAuthority from "../../hooks/HasAuthority";
import { VscPersonAdd } from "react-icons/vsc";
import { useLocation } from "react-router-dom";




const SideNavbar = ({ drawerClose, isRouteLoading }) => {
  const { isAdmin, isClient, isManager, isUser } = HasAuthority()
  const [searchParams, setSearchParams] = useSearchParams({ "activePath": 0 });

  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPending, startTransition] = useTransition();
  useEffect(() => { isRouteLoading && isRouteLoading(isPending) }, [isPending])
  const handleSelectedIndex = (e, index) => {
    startTransition(() => { setSelectedIndex(index); })
    if (index === 0) { navigate(`/Layout/Dashboard?activePath=${index}`); }
    else if (index === 1) { navigate(`/Layout/reports?activePath=${index}`); }
    else if (index === 2) { navigate(`/Layout/fuel-reports?activePath=${index}`); }
    else if (index === 3) { navigate(`/Layout/add-user?activePath=${index}`); }
    else if (index === 4) { navigate(`/Layout/clients?activePath=${index}`); }
    drawerClose && drawerClose()
  };

  useEffect(() => { setSelectedIndex(+searchParams.get("activePath")); }, [])


  return (
    <Card sx={{ height: "100%", borderRadius: 0, width: "100%" }}>
      <List sx={{ width: "100%" }} aria-labelledby="fino-multiple-list-item">

        <ListItemButton
          sx={{
            "&.Mui-selected":
              SideNavbarStyles.listItemButtonSelectedStyle(theme),
          }}
          selected={selectedIndex === 0}
          onClick={(e) => handleSelectedIndex(e, 0)}
        >
          <ListItemIcon>
            <BiSolidDashboard
              style={
                selectedIndex === 0
                  ? SideNavbarStyles.ListIconStyleIfSelected(theme)
                  : SideNavbarStyles.listItemIconStyle(theme)
              }
              color={theme}
            />
          </ListItemIcon>
          <ListItemText
            sx={
              selectedIndex !== 0 && SideNavbarStyles.listItemTextstyle(theme)
            }
            primary="Dashboard"
          />
        </ListItemButton >
        {
          (isUser || isAdmin || isManager) && <ListItemButton
            sx={{
              "&.Mui-selected":
                SideNavbarStyles.listItemButtonSelectedStyle(theme),
            }}
            selected={selectedIndex === 1}
            onClick={(e) => handleSelectedIndex(e, 1)}
          >
            <ListItemIcon>
              <TbReport
                style={
                  selectedIndex === 1
                    ? SideNavbarStyles.ListIconStyleIfSelected(theme)
                    : SideNavbarStyles.listItemIconStyle(theme)
                }
              />
            </ListItemIcon>
            <ListItemText
              sx={
                selectedIndex !== 1 && SideNavbarStyles.listItemTextstyle(theme)
              }
              primary="Txn Reports"
            />
          </ListItemButton>
        }





        {
          (isManager || isAdmin) && <ListItemButton
            sx={{
              "&.Mui-selected":
                SideNavbarStyles.listItemButtonSelectedStyle(theme),
            }}
            selected={selectedIndex === 2}
            onClick={(e) => handleSelectedIndex(e, 2)}
          >
            <ListItemIcon>
              <BsFillFuelPumpDieselFill
                style={
                  selectedIndex === 2
                    ? SideNavbarStyles.ListIconStyleIfSelected(theme)
                    : SideNavbarStyles.listItemIconStyle(theme)
                }
              />
            </ListItemIcon>
            <ListItemText
              sx={
                selectedIndex !== 2 && SideNavbarStyles.listItemTextstyle(theme)
              }
              primary="Fuel Reports"
            />
          </ListItemButton>
        }






        {
          isAdmin && <ListItemButton
            sx={{
              "&.Mui-selected":
                SideNavbarStyles.listItemButtonSelectedStyle(theme),
            }}
            selected={selectedIndex === 3}
            onClick={(e) => handleSelectedIndex(e, 3)}
          >
            <ListItemIcon>
              <RiUserAddFill
                style={
                  selectedIndex === 3
                    ? SideNavbarStyles.ListIconStyleIfSelected(theme)
                    : SideNavbarStyles.listItemIconStyle(theme)
                }
              />
            </ListItemIcon>
            <ListItemText
              sx={
                selectedIndex !== 3 && SideNavbarStyles.listItemTextstyle(theme)
              }
              primary="Add User"
            />
          </ListItemButton>
        }


        {
          isAdmin && <ListItemButton
            sx={{
              "&.Mui-selected":
                SideNavbarStyles.listItemButtonSelectedStyle(theme),
            }}
            selected={selectedIndex === 4}
            onClick={(e) => handleSelectedIndex(e, 4)}
          >
            <ListItemIcon>
              <VscPersonAdd
                style={
                  selectedIndex === 4
                    ? SideNavbarStyles.ListIconStyleIfSelected(theme)
                    : SideNavbarStyles.listItemIconStyle(theme)
                }
              />
            </ListItemIcon>
            <ListItemText
              sx={
                selectedIndex !== 4 && SideNavbarStyles.listItemTextstyle(theme)
              }
              primary="Add Client's"
            />
          </ListItemButton>
        }




      </List>
    </Card>
  );
};

export default SideNavbar;
