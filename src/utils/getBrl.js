const getBrl = (value) => {
  console.log(value)
  return 'R$' + value.toString().replace('.', ',')
}

export default getBrl
