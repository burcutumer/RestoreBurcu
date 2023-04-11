import CheckoutPage from "./CheckoutPage";
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import { useAppDispatch } from "../../app/store/configureStore";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { setBasket } from "../basket/basketSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";

const stripePromise = loadStripe('pk_test_51MGzniAhCNyTzlSeMHRRuYrNoKh0q8YAOxrc2xv2hriSkP5oFAlvU5JHvPMITVZ1dL9y2Med8T16ieW1x2EmLbDh00rh0BSnZM')

export default function CheckoutWrapper() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Payments.createPaymentIntent()
            .then(basket => dispatch(setBasket(basket)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [dispatch]);

    if(loading) return <LoadingComponent message="Loading Checkout..."/>;

    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage/>
        </Elements>
    )
}