import React from "react";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  BrowserRouter,
  Link as RouterLink,
  Route,
  StaticRouter,
  Switch,
  useParams
} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useQuery } from "react-query";
import { navigateToUrl } from "single-spa";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { getPokeman } from "../api";
const isBrowser = () => typeof window !== "undefined";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    overflow: "auto"
  },
  gridList: {
    width: "100%",
    height: "auto",
    padding: "2px"
  },
  title: {
    textTransform: "capitalize"
  },
  icon: {
    fontSize: "smaller"
  },
  pokemon: {
    backgroundColor: "#fff",
    borderRadius: "5px",
    border: ".5px solid rgba(0,0,0,.50)",
    marginTop: "1px"
  },
  img: {
    objectFit: "none"
  },
  crumbs: {
    fontSize: "large",
    fontWeight: 600,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  crumbLink: {
    textTransform: "capitalize"
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
    height: "97vh"
  }
}));
const defaultCrumb = { to: "/", name: "Pokemons" };

export default function PokeList({ pokemons }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const colNum = matches ? 4 : 2;

  const PokeCrumbs = ({ crumbs }) => {
    return (
      <Breadcrumbs aria-label="breadcrumb" className={classes.crumbs}>
        {crumbs &&
          crumbs.map(({ to, name }) => {
            return (
              <Link
                color="inherit"
                component={RouterLink}
                to={to}
                key={name}
                className={classes.crumbLink}
              >
                {name}
              </Link>
            );
          })}
      </Breadcrumbs>
    );
  };

  const PokeView = () => {
    return (
      <>
        <Switch>
          <Route exact path="/">
            <PokeListView />
          </Route>
          <Route path="/:id/:name">
            <PokeDetailedView />
          </Route>
        </Switch>
      </>
    );
  };

  const PokeDetailedView = () => {
    const { id, name } = useParams();
    const { data, isLoading, isError } = useQuery(`${name}`, async () =>
      getPokeman(id)
    );
    const crumbs = [defaultCrumb, { to: `/${name}`, name: name }];

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
  const PokeListView = props => {
    const crumbs = [defaultCrumb];
    return (
      <div className={classes.root}>
        <PokeCrumbs crumbs={crumbs} />
        <GridList cellHeight={180} cols={colNum} className={classes.gridList}>
          {pokemons.map((tile, index) => (
            <GridListTile key={tile.name} className={classes.pokemon}>
              <img src={tile.img} alt={tile.name} className={classes.img} />
              <GridListTileBar
                title={tile.name}
                color="primary"
                className={classes.title}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${tile.name}`}
                    className={classes.icon}
                    onClick={() => {
                      navigateToUrl(`/pokemons/${index + 1}/${tile.name}`);
                    }}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  };

  if (isBrowser()) {
    return (
      <BrowserRouter basename="/pokemons">
        <PokeView />
      </BrowserRouter>
    );
  }
  return (
    <StaticRouter basename="/pokemons">
      <PokeView />
    </StaticRouter>
  );
}
