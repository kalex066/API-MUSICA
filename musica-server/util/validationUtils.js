function extraerErroresDeValidacion(err) {
    const errores = {};
    for (const propiedad in err.errors) {
        errores[propiedad] = err.errors[propiedad].message;
    }
    return errores;
}

export { extraerErroresDeValidacion };


