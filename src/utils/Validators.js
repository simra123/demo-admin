import * as Yup from 'yup';

const Validations = {
    Required: Yup.string().required('This field is required'),
    Email: Yup.string().email('Invalid email address').required('This field is required'),
    Password: Yup.string().uppercase('Uppercase').lowercase('Lowercase').min(8, 'Min 8').required('This field is required'),
    Contact_number: Yup.number().required('This field is required')
}

export default Validations