import React from "react";
import { useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useQuery } from "react-query";
import { makeStyles } from "@material-ui/core/styles";

import { getPokeman } from "../api";
import PokeCrumbs from "./poke-crumbs";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    overflow: "auto",
    marginBottom: theme.spacing(2)
  },
  img: {
    objectFit: "none"
  },
  detailImg: {
    width: "100%",
    backgroundColor: "#fff",
    backgroundSize: "contain"
  },
  card: {
    margin: theme.spacing(2),
    display: "grid",
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "1fr 2fr"
    },
    [theme.breakpoints.down("xs")]: {
      gridTemplateRows: "1fr 2fr"
    }
  },
  cardTitle: {
    textTransform: "capitalize"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  chip: {
    margin: theme.spacing(1)
  },
  chips: {
    display: "flex",
    flexFlow: "row wrap",
    margin: theme.spacing(1)
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
    margin: theme.spacing(1),
    height: "50vh"
  }
}));
const defaultCrumb = { to: "/", name: "Pokemons" };

const PokeDetailView = () => {
  const classes = useStyles();
  const { id, name } = useParams();
  const { data, isLoading, isError } = useQuery(`${name}`, async () =>
    getPokeman(id)
  );
  const crumbs = [defaultCrumb, { name: name }];

  const getDetails = ({
    abilities,
    height,
    weight,
    moves,
    base_experience
  }) => {
    return [
      { attribute: "Experience", value: base_experience },
      { attribute: "Height", value: height },
      { attribute: "Weight", value: weight },
      {
        attribute: "Abilities",
        value: abilities.map(({ ability }, index) => {
          if (index < abilities.length - 1) {
            return `${ability.name},`;
          }
          return ability.name;
        })
      },
      { attribute: "No. of Moves", value: moves.length }
    ];
  };
  return (
    <div className={classes.root}>
      <PokeCrumbs crumbs={crumbs} />
      <Paper elevation={3}>
        {isLoading && (
          <div className={classes.loading}>
            <CircularProgress color="secondary" />
          </div>
        )}
        {!isLoading && isError && (
          <div className={classes.loading}>
            <Typography variant="h2" color="secondary">
              Error: Pokemon data available at this time !!
            </Typography>
          </div>
        )}
        {!isLoading && data && (
          <Card className={classes.card}>
            <CardMedia
              className={classes.detailImg}
              image={data.img}
              title="Live from space album cover"
            />
            <div className={classes.content}>
              <Typography variant="h5" className={classes.cardTitle}>
                {name}
              </Typography>
              <div className={classes.chips}>
                {data.types.map(({ type }) => (
                  <Chip
                    className={classes.chip}
                    label={type.name}
                    key={type.name}
                    color="secondary"
                  />
                ))}
              </div>
              <Table
                className={classes.table}
                aria-label="simple table"
                size="small"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Attribute</TableCell>
                    <TableCell align="right">Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getDetails(data).map(({ attribute, value }) => (
                    <TableRow key={attribute}>
                      <TableCell component="th" scope="row">
                        {attribute}
                      </TableCell>
                      <TableCell align="right">{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        )}
      </Paper>
    </div>
  );
};

export default PokeDetailView;
