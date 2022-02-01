import {
    signUp, signIn
} from './validators/rules';

type MetadataObj = {[key: string]: unknown}

const getValidator = (validationName:string) => {
    const rules: MetadataObj = {
        signUp,
        signIn
    };
    return rules[validationName]
}

export default getValidator;