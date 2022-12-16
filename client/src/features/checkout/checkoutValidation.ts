import * as yup from 'yup';

export const validationSchema = [
    yup.object({
    fullName: yup.string().required('Full name is required'),
    address1: yup.string().required('address1 is required'),
    address2: yup.string().required(),
    city: yup.string().required(),
    zip: yup.string().required(),
    country: yup.string().required()
    }),
    yup.object(),    //  eventhough we dont validate anything  for the ReviewComponent
    yup.object({    //  because we use activeStep
        nameOnCard : yup.string().required()
    })
]
