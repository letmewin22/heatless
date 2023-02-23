import * as React from 'react'
import Ratings from 'react-ratings-declarative'

interface IProps {
  rating: number
}

export const Rating: React.FC<IProps> = ({ rating }) => {
  return (
    <div className="rating">
      <Ratings
        rating={rating}
        widgetDimensions="18px"
        widgetSpacings="4px"
        widgetRatedColors="#FFBE3D"
        widgetEmptyColors="#33353F"
        svgIconViewBoxes="0 0 18 17"
        svgIconPaths="M8.48326 14.5819C8.80106 14.3901 9.19894 14.3901 9.51674 14.5819L13.151 16.7754C13.9083 17.2325 14.8425 16.5535 14.6416 15.692L13.6771 11.5578C13.5928 11.1963 13.7156 10.8178 13.9962 10.5748L17.2086 7.79189C17.8772 7.21268 17.5198 6.11442 16.6384 6.03964L12.4109 5.68098C12.0413 5.64962 11.7194 5.41629 11.5747 5.07479L9.92072 1.17237C9.57613 0.359343 8.42387 0.359341 8.07928 1.17237L6.42532 5.07479C6.28058 5.41629 5.95871 5.64962 5.58914 5.68098L1.36163 6.03964C0.480202 6.11442 0.122796 7.21268 0.791394 7.79189L4.00379 10.5748C4.28436 10.8178 4.40721 11.1963 4.32287 11.5578L3.35841 15.692C3.15745 16.5535 4.09168 17.2325 4.849 16.7754L8.48326 14.5819Z"
      >
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
      </Ratings>
      <span className="rating__num">{rating.toFixed(1)}</span>
    </div>
  )
}
