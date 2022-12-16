import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '../../app/store/configureStore';
import BasketSummary from '../basket/BasketSummary';
import BasketTable from '../basket/BasketTable';

export default function Review() {
  const {basket} = useAppSelector(state => state.basket);
  const subtotal = basket?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;
	const deliveryFee = subtotal > 1000 ? 0 : 500;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
     {basket &&
      <BasketTable items={basket.items} isBasket={false}/>}
			<Grid container>
				<Grid item xs={6} />
				<Grid item xs={6}>
					<BasketSummary subtotal={subtotal} total={subtotal + deliveryFee}/>
				</Grid>
			</Grid>
    </>
  );
}
