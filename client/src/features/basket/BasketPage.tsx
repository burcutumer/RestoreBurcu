import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/store/configureStore";
import BasketSummary from "./BasketSummary";
import BasketTable from "./BasketTable";

export default function BasketPage() {
	// const { basket, setBasket, removeItem } = useStoreContext();
	const { basket } = useAppSelector(state => state.basket);
	const subtotal = basket?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;
	const deliveryFee = subtotal > 1000 ? 0 : 500;

	// function handleAddItem(productId: number, name: string) {         USE REDUXTool KIT instead
	// 	setStatus({ loading: true, name });
	// 	agent.Basket.addItem(productId)
	// 		.then(responseBasket => dispatch(setBasket(responseBasket)))
	// 		.catch(error => console.log(error))
	// 		.finally(() => setStatus({ loading: false, name: '' }))
	// }
	// function handleRemoveItem(productId: number, quantity = 1, name: string) {
	// 	setStatus({ loading: true, name });
	// 	agent.Basket.removeItem(productId, quantity)
	// 		.then(() => dispatch(removeItem({ productId, quantity })))
	// 		.catch(error => console.log(error))
	// 		.finally(() => setStatus({ loading: false, name: '' })) }

	if (!basket) return <Typography variant='h3'>Your basket is empty</Typography>

	                  // BasketTable BasketPage icinde kullanildigindan BasketTable'a parametre aktarabilirsin.interface Props{}
					 // Ancak baska sayfaya aktaracaksan Redux State kullan!!
					//  const {b} = useAppSelector(STATE => STATE.b);
	return (
		<>
			<BasketTable items={basket.items} />
			<Grid container>
				<Grid item xs={6} />
				<Grid item xs={6}>
					<BasketSummary subtotal={subtotal} total={deliveryFee + subtotal} />
					<Button
						component={Link}
						to={'/checkout'}
						variant='contained'
						size='large'
						fullWidth
					>
						Checkout
					</Button>
				</Grid>
			</Grid>
		</>

	)
}