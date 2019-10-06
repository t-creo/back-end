export interface ErrorObjectInterface {
    status: number;
    title: string;
    message: string;
    userMessage: string;
    errors?: ErrorDetailInterface[];
}

export interface ErrorDetailInterface {
    field: string;
    errorMessage: string;
    userErrorMessage: string;
    validationCode: string;
}