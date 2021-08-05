const [filter, setFilter] = useState({
   alfabeticamente:"",
   poblacion:"",
   continent:""
}); 

const [countryFiltrado, setcountryFiltrado] = useState(props.Country)


function filtradoSUPREMO(countries) {
    if (filter1.alfabeticamente === "des" && filter1.poblacion === "des") {
      countries.sort((a, b) => {
        if (b.name.localeCompare(a.name) && a.population > b.population)
          return -1;
        return 0;
      });
    } else if (
      filter1.alfabeticamente === "asc" &&
      filter1.poblacion === "asc"
    ) {
      countries.sort((a, b) => {
        if (a.name.localeCompare(b.name) && a.population < b.population)
          return -1;
        return 0;
      });
    } else if (
      filter1.alfabeticamente === "des" &&
      filter1.poblacion === "asc"
    ) {
      countries.sort((a, b) => {
        if (b.name.localeCompare(a.name) && a.population < b.population)
          return -1;
        return 0;
      });
    } else if (
      filter1.alfabeticamente === "asc" &&
      filter1.poblacion === "des"
    ) {
      countries.sort((a, b) => {
        if (a.name.localeCompare(b.name) && a.population > b.population)
          return -1;
        return 0;
      });
    } else if (
      filter1.alfabeticamente === "asc" &&
      filter1.poblacion === "default"
    ) {
      countries.sort((a, b) => {
        if (a.name.localeCompare(b.name))
          return -1;
        return 0;
      });
    } else if (
      filter1.alfabeticamente === "des" &&
      filter1.poblacion === "default"
    ) {
      countries.sort((a, b) => {
        if (b.name.localeCompare(a.name))
          return -1;
        return 0;
      });
    } else if (
      filter1.alfabeticamente === "default" &&
      filter1.poblacion === "asc"
    ) {
      countries.sort((a, b) => {
        if (a.population < b.population)
          return -1;
        return 0;
      });
    }

    return countries;
}

useEffect(() => {
	var filtrado = countryFiltrado;

	if(filter.alfabeticamente !== ""){
		// ANALfabeto
		if(filter.alfabeticamente !== "des"){
			filtrado = filtrado.sort(des)
		}
		else if(filter.alfabeticamente !== "asc"){
			filtrado = filtrado.sort(asc)
		}
		// poblacion
		if(filter.poblacion !== "des"){
			filtrado = props.Country.sort(des)
		}
		else if(filter.poblacion !== "asc"){
			filtrado = filtrado.sort(asc)
		}

		if(continent !== ""){
			filtrado = filtrado.filter(pais => )
		}
	}
	


},[filter],props.Country)


function quickSort(array) {
  // Implementar el método conocido como quickSort para ordenar de menor a mayor
  // el array recibido como parámetro
  // Devolver el array ordenado resultante
  // Tu código:

  if(array.length < 1){ // caso base: si el array no tiene valores, retorna un array vacio
    return []
  }

  var left = [] // array para valores minimos 
  var right = [] // para valores maximos
  var pivot = array[0] // punto de referencia para comprar valores

  for(var x = 1; x < array.length; x++){ // recorre el array ignorando el pivot
    if(array[x].poblacion < pivot.poblacion){ // si es menor al pivot, lo guarda en left
      left.push(array[x])
    }
    else{ // si es mayor en right
      right.push(array[x])
    }
  }

  return quickSort(left).concat(pivot, quickSort(right)) // retorna llamando a la funcion recursivamente para cada array y los concatena para poder
                                                          // retornar el array ordenado

}