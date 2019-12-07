import React, { useContext } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { MovieListContext } from "./Movie_List";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import "./FilterBar.css";

const genreStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider);

const FilterBar = () => {
  const genreClasses = genreStyles();
  const { state, actions } = useContext(MovieListContext);

  return (
    <div>
      <FormControl className={genreClasses.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          장르선택
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={state.genre}
          onChange={actions.handleChange}
          displayEmpty
          className={genreClasses.selectEmpty}
        >
          <MenuItem value="">
            <em>장르</em>
          </MenuItem>
          <MenuItem value={"Action"}>Action</MenuItem>
          <MenuItem value={"Adventure"}>Adventure</MenuItem>
          <MenuItem value={"Drama"}>Drama</MenuItem>
          <MenuItem value={"Music"}>Music</MenuItem>
          <MenuItem value={"Thriller"}>Thriller</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={genreClasses.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          평점|좋아요
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={state.someAlign}
          onChange={actions.setSomeAlignFilter}
          displayEmpty
          className={genreClasses.selectEmpty}
        >
          <MenuItem value="">
            <em>정렬</em>
          </MenuItem>
          <MenuItem value={"rating"}>평점순</MenuItem>
          <MenuItem value={"like_count"}>좋아요순</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={genreClasses.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          오름|내림
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={state.align}
          onChange={actions.setAlignFilter}
          displayEmpty
          className={genreClasses.selectEmpty}
        >
          <MenuItem value="">
            <em>정렬</em>
          </MenuItem>
          <MenuItem value={"asc"}>오름차순</MenuItem>
          <MenuItem value={"desc"}>내림차순</MenuItem>
        </Select>
      </FormControl>

      <div className="ratingFilter">
        <Typography id="discrete-slider" gutterBottom>
          별점
        </Typography>
        <PrettoSlider
          valueLabelDisplay="auto"
          aria-label="pretto slider"
          defaultValue={5}
          max={9}
          min={0}
          onChange={actions.setRatingFilter}
        />
      </div>
    </div>
  );
};

// 3. 정렬 기능 :  평점순 오름차순, 내림차순 정렬  / (좋아요 숫자 오름차순 내림차순 정렬)
// Action, Adventure, Drama, Music, Thriller 5개 장르 필터

export default FilterBar;
