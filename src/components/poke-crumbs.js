import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  crumbs: {
    fontSize: "large",
    fontWeight: 600,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  crumbLink: {
    textTransform: "capitalize"
  }
}));

const PokeCrumbs = ({ crumbs }) => {
  const classes = useStyles();

  return (
    <Breadcrumbs aria-label="breadcrumb" className={classes.crumbs}>
      {crumbs &&
        crumbs.map(({ to, name }) => {
          return (
            <div key={name}>
              {to && (
                <Link
                  color="inherit"
                  component={RouterLink}
                  to={to}
                  key={name}
                  className={classes.crumbLink}
                >
                  {name}
                </Link>
              )}
              {!to && <div className={classes.crumbLink}>{name}</div>}
            </div>
          );
        })}
    </Breadcrumbs>
  );
};

export default PokeCrumbs;
