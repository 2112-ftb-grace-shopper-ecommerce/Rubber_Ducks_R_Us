import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'


//Submit Handler
export default function PaymentForm(props) {
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()


    const handleSubmit = async (e) => {
        console.log("submitted")
        e.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


        if (!error) {
            try {
                console.log(paymentMethod)
                const { id } = paymentMethod
                const response = await axios.post("http://localhost:4000/api/payment", {
                    amount: props.totalAmount,
                    id
                })

                if (response.data.success) {
                    console.log("Successful payment")
                    setSuccess(true)
                }

            } catch (error) {
                console.log("Error", error)
            }
        } else {
            console.log(error.message)
        }
    }

    return (
        <>
            {!success ?
                <form onSubmit={handleSubmit}>
                    <fieldset className="FormGroup">
                        <div className="FormRow">
                            <CardElement  />
                        </div>
                    </fieldset>
                    <button>Pay</button>
                </form>
                :
                <div>
                    className="PurchaseMessage"
                    <h2>You just bought a sweet Rubber Ducky product. Congrats this is the best decision of your life!</h2>
                </div>
            }

        </>
    )
}
