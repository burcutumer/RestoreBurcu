import { Box, Button, Grid, Typography } from "@mui/material";
import { BasketItem } from "../../app/models/basket";
import { Order } from "../../app/models/order";
import BasketSummary from "../basket/BasketSummary";
import BasketTable from "../basket/BasketTable";


interface Props {
    order: Order;
    setSelectedOrder: (id:number) => void;
}

export default function OrderDetailed({order, setSelectedOrder}: Props) {
    //const subtotal = order.orderItems.reduce((sum,item) => sum + (item.quantity * item.price), 0) ?? 0;

    return (
        <>
            <Box display='flex' justifyContent='space-betwen'>
                <Typography sx={{p:2}} gutterBottom variant='h4'>Order# {order.id} - {order.orderStatus} </Typography>
                <Button onClick={() => setSelectedOrder(0)} sx={{m:2}} size='large' variant='contained' style={{ marginLeft: "auto" }}>Back To Orders</Button>
            </Box>
            <BasketTable items={order.orderItems as BasketItem[]} isBasket={false}/>
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6} >
                    <BasketSummary subtotal={order.subtotal} total={order.total}/>
                </Grid>
            </Grid>
        </>
    )
}