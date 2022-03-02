const getBrl = (value) => {
  return 'R$' + value.toString().replace('.', ',')
}

export default getBrl
