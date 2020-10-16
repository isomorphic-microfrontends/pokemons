import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden"
  },
  gridList: {
    width: "100%",
    height: "auto"
  },
  icon: {
    fontSize: "smaller"
  },
  pokemon: {
    backgroundColor: "#fff",
    borderRadius: "5px",
    border: "1px solid rgba(0,0,0,.75)",
    marginTop: "4px"
  },
  img: {
    objectFit: "none"
  }
}));

export default function PokeList({ pokemons }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">
            <Typography variant="h6" gutterBottom>
              Pokemons
            </Typography>
          </ListSubheader>
        </GridListTile>
        {pokemons.map(tile => (
          <GridListTile key={tile.name} className={classes.pokemon}>
            <img src={tile.img} alt={tile.name} className={classes.img} />
            <GridListTileBar
              title={tile.name}
              color="primary"
              actionIcon={
                <IconButton
                  aria-label={`info about ${tile.name}`}
                  className={classes.icon}
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
}
