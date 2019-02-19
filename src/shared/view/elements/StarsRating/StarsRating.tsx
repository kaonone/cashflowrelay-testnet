import * as React from 'react';

import { StylesProps, provideStyles } from './StarsRating.style';
import { BigNumber } from '0x.js';
import { Star, StarOutlined, StarHalf } from '../Icons';

const defaultStars = 5;

interface IProps {
  starsCount?: number; // default 5
  rating: number; // percent
}

function StarsRating(props: IProps & StylesProps) {
  const { classes, rating, starsCount = defaultStars } = props;

  const ratingInStars = roundToHalf(new BigNumber(rating).div(100).times(starsCount));

  return (
    <div className={classes.root}>
      {Array.from({ length: starsCount }).map((_, i) => {
        const isHalf = new BigNumber(ratingInStars).minus(i).eq('0.5');

        if (isHalf) {
          return <StarHalf className={classes.activeStar} key={i} />;
        }

        return i + 1 <= ratingInStars.toNumber()
          ? <Star className={classes.activeStar} key={i} />
          : <StarOutlined className={rating > 0 ? classes.activeStar : undefined} key={i} />;
      })}
    </div>
  );
}

function roundToHalf(value: BigNumber) {
  return value.times(2).round().div(2);
}

export default provideStyles(StarsRating);
