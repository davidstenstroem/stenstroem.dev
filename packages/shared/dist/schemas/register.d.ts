import * as yup from 'yup';
export declare const registerSchema: yup.ObjectSchema<yup.Shape<{}, {
    name: string;
    email: string;
    password: string;
}>>;