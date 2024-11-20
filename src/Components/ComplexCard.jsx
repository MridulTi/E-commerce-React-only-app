import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Paper } from '@mui/material';
import { FaStar } from 'react-icons/fa';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));


export default function ComplexCard(props) {
  const [quantity, setQuantity] = React.useState(0);

  // Initialize quantity if the item is already in the cart
  React.useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = existingData.find((item) => item.id === props.id);
    if (existingItem) {
      setQuantity(existingItem.quantity || 1);
    }
  }, [props.id]);

  function addToCart() {
    const existingData = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = existingData.findIndex((item) => item.id === props.id);

    if (itemIndex === -1) {
      // Add new item with quantity = 1
      existingData.push({ ...props, quantity: 1 });
    } else {
      // Increase quantity of the existing item
      existingData[itemIndex].quantity += 1;
    }

    setQuantity((prev) => prev + 1);
    localStorage.setItem('cart', JSON.stringify(existingData));
  }

  function removeFromCart() {
    const existingData = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = existingData.findIndex((item) => item.id === props.id);

    if (itemIndex !== -1) {
      if (existingData[itemIndex].quantity > 1) {
        // Decrease quantity
        existingData[itemIndex].quantity -= 1;
        setQuantity((prev) => prev - 1);
      } else {
        // Remove item if quantity is 1
        existingData.splice(itemIndex, 1);
        setQuantity(0);
      }
    }

    localStorage.setItem('cart', JSON.stringify(existingData));
  }
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <Paper sx={{ maxWidth: 345 }} elevation={1} className="shadow-xl">
      <CardContent>
        <img src={props.thumbnail} className="w-full aspect-square" alt={props.title} />
        <div>
          <Typography variant="h6" sx={{ fontWeight: "bolder" }} className="capitalize font-bold text-xl">
            {props.title}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "light" }} className="capitalize text-gray-600 font-bold text-xl">
          {truncateText(props.description, 60)}
          </Typography>
          <p className="flex text-sm my-1 gap-2 font-bold text-white bg-green-700 w-fit px-2 items-center">
            {props.rating} <FaStar />
          </p>

          <Typography variant="body2" className="text-grey-3 w-fit px-2 py-1 bg-red-600 text-white">
            {props.shippingInformation}
          </Typography>
          <p
            className={`flex text-sm my-1 gap-2 font-bold ${
              props.stock !== 0 ? "text-green-700" : "text-red-600"
            } w-fit px-2 items-center`}
          >
            {props.stock !== 0 ? "In Stock" : "Out of Stock"}
          </p>
        </div>
        <div className="px-5 min-w-52 text-right flex justify-between items-center">
          <Typography variant="h4">₹{Math.round(props.price - (props.price * props.discountPercentage) / 100)}</Typography>
          <div>
            <Typography variant="body1" sx={{ fontWeight: "medium" }} className="text-grey-6">
              <span className="line-through text-grey-1 font-extralight">₹{props.price}</span> {props.discountPercentage}% Off
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "bold" }} className="text-green-600">
              {props.returnPolicy}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "bold" }} className="text-yellow-600">
              {props.warrantyInformation}
            </Typography>
          </div>
        </div>
      </CardContent>
      <CardActions disableSpacing>
        {quantity === 0 ? (
          <button
            onClick={addToCart}
            disabled={props.stock !== 0 ? false : true}
            className={`rounded-full px-4 py-2 ${
              props.stock !== 0 ? "opacity-100" : "opacity-50 cursor-not-allowed"
            } bg-yellow-400 text-black hover:bg-yellow-300 w-full`}
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center gap-4 w-full justify-center">
            <button
              onClick={removeFromCart}
               className="px-2 py-1 bg-gray-200 text-gray-700 font-bold rounded-md hover:bg-gray-300"
            >
              -
            </button>
            <Typography variant="h6">{quantity}</Typography>
            <button
              onClick={addToCart}
               className="px-2 py-1 bg-gray-200 text-gray-700 font-bold rounded-md hover:bg-gray-300"
            >
              +
            </button>
          </div>
        )}
      </CardActions>
    </Paper>
  );
}
