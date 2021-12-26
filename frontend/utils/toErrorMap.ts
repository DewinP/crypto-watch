interface IServerFieldError {
    message:string;
    path: [string];
}

export const toErrorMap = (errors: IServerFieldError[]) => {
    const errorMap: Record<string,string> = {};
    errors.forEach(({message, path}) => {
        errorMap[path[path.length-1]] = message;
    });
    return errorMap;
}