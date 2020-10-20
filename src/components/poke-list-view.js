import React from "react";
import { navigateToUrl } from "single-spa";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import PokeCrumbs from "./poke-crumbs";
import usePokemons from "../use-pokemons";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    overflow: "auto",
    marginBottom: theme.spacing(2)
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
  }
}));

const defaultCrumb = { to: "/", name: "Pokemons" };

const PokeListView = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { pokemons } = usePokemons();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const colNum = matches ? 4 : 2;
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

export default PokeListView;
