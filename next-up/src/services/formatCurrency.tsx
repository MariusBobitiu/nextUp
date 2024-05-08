const formatCurrency = (value: number) => {
    const formatter = new Intl.NumberFormat('de-DE');

    return formatter.format(value);
}

export default formatCurrency;