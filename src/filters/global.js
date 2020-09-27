const cpf = (_value) => {
    if (!_value) {
        return;
    }


    let value = `${_value}`;
    return value.replace(/([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})/, "$1.$2.$3-$4");
}

const agencia = (_value) => {
    if (!_value) {
        return;
    }

    let value = `${_value}`;
    value = value.replace(/([0-9]{4})([0-9]{1})?/, "$1-$2");
    console.log(value.length);
    return (value.length>5) ? value : value.replace("-", "");
}

export {
    cpf,
    agencia
};